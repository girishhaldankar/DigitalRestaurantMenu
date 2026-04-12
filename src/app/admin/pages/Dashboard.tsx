import { useEffect, useState, useMemo } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { ShoppingCart, TrendingUp, CheckCircle, IndianRupee } from "lucide-react";

type OrderType = {
  id: string;
  name: string;
  total: number;
  status: string;
  items?: { item: { name: string }; quantity: number }[];
};

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderType[]>([]);

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

  // 📊 STATS
  const stats = useMemo(() => {
    return {
      total: orders.length,
      active: orders.filter((o) =>
        ["new", "pending", "preparing", "ready"].includes(o.status)
      ).length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      revenue: orders
        .filter((o) => o.status === "delivered")
        .reduce((acc, o) => acc + o.total, 0),
    };
  }, [orders]);

  // 🔥 TOP SELLING ITEMS
  const topItems = useMemo(() => {
    const map: Record<string, number> = {};

    orders.forEach((o) => {
      if (o.status !== "delivered") return;

      o.items?.forEach((i) => {
        const name = i.item.name;
        map[name] = (map[name] || 0) + i.quantity;
      });
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [orders]);

  // 🕒 RECENT ORDERS
  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  return (
    <div className="space-y-6">

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

        <div className="bg-gray-800 p-4 rounded-2xl flex items-center gap-3">
          <ShoppingCart className="text-blue-400" />
          <div>
            <p className="text-xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-gray-400">Total Orders</p>
          </div>
        </div>

        <div className="bg-yellow-500/20 p-4 rounded-2xl flex items-center gap-3">
          <TrendingUp className="text-yellow-400" />
          <div>
            <p className="text-xl font-bold text-yellow-400">{stats.active}</p>
            <p className="text-xs text-gray-400">Active Orders</p>
          </div>
        </div>

        <div className="bg-green-500/20 p-4 rounded-2xl flex items-center gap-3">
          <CheckCircle className="text-green-400" />
          <div>
            <p className="text-xl font-bold text-green-400">{stats.delivered}</p>
            <p className="text-xs text-gray-400">Delivered</p>
          </div>
        </div>

        <div className="bg-teal-500/20 p-4 rounded-2xl flex items-center gap-3">
          <IndianRupee className="text-teal-400" />
          <div>
            <p className="text-xl font-bold text-teal-400">₹{stats.revenue}</p>
            <p className="text-xs text-gray-400">Revenue</p>
          </div>
        </div>

      </div>

      {/* 🔥 TOP SELLING */}
      <div className="bg-gray-800/80 p-5 rounded-2xl border border-white/10">
        <h3 className="text-white font-semibold text-lg mb-4">
          🔥 Top Selling Items
        </h3>

        {topItems.length === 0 ? (
          <p className="text-gray-400 text-sm">No data yet</p>
        ) : (
          <div className="space-y-2">
            {topItems.map(([name, qty], idx) => (
              <div
                key={idx}
                className="flex justify-between bg-gray-700/50 px-4 py-2 rounded-lg"
              >
                <p className="text-white text-sm">{name}</p>
                <span className="text-teal-400 text-sm">{qty} sold</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📦 RECENT ORDERS */}
      <div className="bg-gray-800/80 p-5 rounded-2xl border border-white/10">
        <h3 className="text-white font-semibold text-lg mb-4">
          Recent Orders
        </h3>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-sm">No orders yet</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center bg-gray-700/50 px-4 py-2 rounded-lg"
              >
                <div>
                  <p className="text-white text-sm">{order.name}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {order.status}
                  </p>
                </div>

                <span className="text-teal-400 text-sm font-semibold">
                  ₹{order.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}