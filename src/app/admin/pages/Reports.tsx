import { useEffect, useState, useMemo } from "react";
import { Phone, MapPin, Download, Printer } from "lucide-react";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

type OrderType = {
  id: string;
  name?: string;
  phone?: string;
  location?: string;
  total: number;
  status: string;
  createdAt?: any;
  items?: { item: { name: string }; quantity: number }[];
};

export default function Reports() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filterRange, setFilterRange] = useState<"daily" | "weekly" | "monthly">("daily");

  // ✅ FORMAT DATE + TIME
  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return { date: "", time: "" };

    const date = timestamp.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    return {
      date: date.toLocaleDateString("en-IN"),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // 🔥 FETCH
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as OrderType[];

      setOrders(newOrders);
    });

    return () => unsubscribe();
  }, []);

  // 📅 FILTER (ONLY DELIVERED)
  const filteredOrders = useMemo(() => {
    const now = new Date();

    return orders.filter((o) => {
      if (!o.createdAt || o.status !== "delivered") return false;

      const date = o.createdAt.toDate
        ? o.createdAt.toDate()
        : new Date(o.createdAt);

      if (filterRange === "daily") {
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }

      if (filterRange === "weekly") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return date >= weekAgo && date <= now;
      }

      if (filterRange === "monthly") {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }

      return false;
    });
  }, [orders, filterRange]);

  // 📊 SUMMARY
  const summary = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((acc, o) => acc + o.total, 0);
    return { totalOrders, totalRevenue };
  }, [filteredOrders]);

  // 🔥 TOP SELLING ITEMS
  const topItems = useMemo(() => {
    const map: Record<string, number> = {};

    filteredOrders.forEach((order) => {
      order.items?.forEach((i) => {
        const name = i.item.name;
        map[name] = (map[name] || 0) + i.quantity;
      });
    });

    return Object.entries(map)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [filteredOrders]);

  const maxQty = topItems[0]?.qty || 1;

  // 📤 EXPORT CSV
  const exportCSV = () => {
    const headers = ["Name", "Phone", "Location", "Total", "Items"];

    const rows = filteredOrders.map((o) => [
      o.name || "Customer",
      o.phone || "-",
      o.location || "-",
      o.total,
      o.items?.map((i) => `${i.item.name} x${i.quantity}`).join(", ") || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `orders_${filterRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🖨 PRINT
  const printOrders = () => {
    const printContent = filteredOrders
      .map(
        (o) => {
          const dt = formatDateTime(o.createdAt);
          return `
        <div style="margin-bottom:10px;border-bottom:1px solid #ccc;padding-bottom:6px;">
          <p><b>${o.name || "Customer"}</b> | ${o.phone || "-"} | ${o.location || "-"}</p>
          <p>${dt.date} ${dt.time}</p>
          <p>Total: ₹${o.total}</p>
          <p>${o.items?.map((i) => `${i.item.name} x${i.quantity}`).join(", ") || ""}</p>
        </div>
      `;
        }
      )
      .join("");

    const win = window.open("", "_blank");

    if (win) {
      win.document.write(`
        <html>
          <head><title>Report</title></head>
          <body>
            <h2>Order Report (${filterRange.toUpperCase()})</h2>
            ${printContent}
          </body>
        </html>
      `);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="space-y-6 p-4">

      {/* FILTER + ACTIONS */}
      <div className="flex flex-wrap gap-3 items-center">
        {["daily", "weekly", "monthly"].map((r) => (
          <button
            key={r}
            onClick={() => setFilterRange(r as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                filterRange === r
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {r.toUpperCase()}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm"
          >
            <Download size={16} />
            Export
          </button>

          <button
            onClick={printOrders}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/80 p-4 rounded-2xl text-center border border-white/10">
          <p className="text-2xl font-bold text-white">{summary.totalOrders}</p>
          <p className="text-sm text-gray-400">Orders</p>
        </div>

        <div className="bg-gray-800/80 p-4 rounded-2xl text-center border border-white/10">
          <p className="text-2xl font-bold text-white">₹{summary.totalRevenue}</p>
          <p className="text-sm text-gray-400">Revenue</p>
        </div>
      </div>

      {/* 🔥 TOP SELLING ITEMS */}
      <div className="bg-gray-800/80 p-5 rounded-2xl border border-white/10 shadow-lg">
        <h3 className="text-white font-semibold text-lg mb-4">
          Top Selling Items
        </h3>

        {topItems.length === 0 ? (
          <p className="text-gray-400 text-sm">No data available</p>
        ) : (
          <div className="space-y-3">
            {topItems.map((item, index) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">
                    #{index + 1} {item.name}
                  </span>
                  <span className="text-gray-300">{item.qty}</span>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div
                    className="bg-teal-400 h-2 rounded-full"
                    style={{
                      width: `${(item.qty / maxQty) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ORDERS */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-400 mt-4">
          No delivered orders for this period.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const dt = formatDateTime(order.createdAt);

            return (
              <div
                key={order.id}
                className="bg-gray-800/80 p-5 rounded-2xl border border-white/10 shadow-lg"
              >
                <div className="flex justify-between items-start gap-4">

                  <div className="flex flex-col gap-2">
                    <p className="text-white font-semibold text-lg">
                      {order.name || "Customer"}
                    </p>

                    {/* ✅ DATE + TIME */}
                    {order.createdAt && (
                      <p className="text-xs text-gray-400">
                        {dt.date} • {dt.time}
                      </p>
                    )}

                    {order.phone && (
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Phone size={14} className="text-teal-400" />
                        <span>{order.phone}</span>
                      </div>
                    )}

                    {order.location && (
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPin size={14} className="text-teal-400" />
                        <span>{order.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-white font-bold text-lg">
                      ₹{order.total}
                    </p>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                      delivered
                    </span>
                  </div>
                </div>

                {order.items && (
                  <div className="mt-4 space-y-1 border-t border-white/10 pt-3">
                    {order.items.map((i, idx) => (
                      <p key={idx} className="text-gray-300 text-sm">
                        • {i.item.name} x{i.quantity}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}