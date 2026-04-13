import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  History,
  RotateCcw,
  MapPinned,
  Clock,
} from "lucide-react";
import { db } from "../../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  /* =========================
     REALTIME FETCH
  ========================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("customerId", "==", String(user.mobile))
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.sort(
        (a: any, b: any) =>
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );

      setOrders(data);
    });

    return () => unsub();
  }, []);

  /* =========================
     NORMALIZE STATUS
  ========================= */
  const normalizeStatus = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "paid") return "new";
    if (s === "failed") return "cancelled";
    return s;
  };

  /* =========================
     PROGRESS CALCULATION ⭐
  ========================= */
  const getProgress = (status: string) => {
    const s = normalizeStatus(status);

    switch (s) {
      case "new":
        return 20;
      case "preparing":
        return 50;
      case "ready":
        return 80;
      case "delivered":
        return 100;
      case "cancelled":
        return 0;
      default:
        return 10;
    }
  };

  const getProgressColor = (status: string) => {
    const s = normalizeStatus(status);

    if (s === "delivered") return "bg-green-500";
    if (s === "cancelled") return "bg-red-500";
    if (s === "ready") return "bg-teal-500";
    if (s === "preparing") return "bg-orange-500";
    return "bg-blue-500";
  };

  /* =========================
     HELPERS
  ========================= */
  const handleReorder = (items: any[]) => {
    localStorage.setItem("reorderCart", JSON.stringify(items));
    navigate("/");
  };

  const isActiveOrder = (status: string) => {
    const s = normalizeStatus(status);
    return s !== "delivered" && s !== "cancelled";
  };

  /* =========================
     ACTIVE ORDER
  ========================= */
  const activeOrder = orders.find((o) => isActiveOrder(o.status));

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/food-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-5xl mx-auto px-3 py-4 relative z-10">

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] shadow-2xl p-4">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-teal-300" />
              <h1 className="text-xl font-bold text-white">
                Order History
              </h1>
            </div>
          </div>

          {/* ACTIVE ORDER */}
          {activeOrder && (
            <div className="mb-5 p-4 rounded-2xl bg-white/10 border border-white/20">

              {/* HEADER */}
              <div className="flex justify-between">
                <span className="text-sm text-teal-300 font-semibold">
                  Live Order
                </span>

                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white">
                  {normalizeStatus(activeOrder.status)}
                </span>
              </div>

              {/* PROGRESS BAR ⭐ */}
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 ${getProgressColor(activeOrder.status)} transition-all duration-500`}
                    style={{
                      width: `${getProgress(activeOrder.status)}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-gray-300 mt-1">
                  Progress: {getProgress(activeOrder.status)}%
                </p>
              </div>

              {/* ITEMS */}
              <div className="mt-3 space-y-1 border-t border-white/10 pt-2">
                {activeOrder.items?.map((i: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between text-xs text-gray-200"
                  >
                    <span>
                      {i.item?.name} {i.size ? `(${i.size})` : ""}
                    </span>
                    <span>x{i.quantity}</span>
                  </div>
                ))}
              </div>

              {/* TRACK */}
              <button
                onClick={() => navigate(`/track/${activeOrder.id}`)}
                className="mt-3 w-full bg-teal-600 hover:bg-teal-500 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <MapPinned className="w-4 h-4" />
                Track Order
              </button>
            </div>
          )}

          {/* ORDER LIST */}
          <div className="space-y-4">
            {orders.map((order) => {
              const active = isActiveOrder(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-300">
                      {order.createdAt?.toDate?.().toLocaleString()}
                    </p>

                    <p className="font-bold text-teal-300">
                      ₹{order.total}
                    </p>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 ${getProgressColor(order.status)} transition-all`}
                        style={{
                          width: `${getProgress(order.status)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="mt-2 space-y-1">
                    {order.items?.map((i: any, idx: number) => (
                      <div
                        key={idx}
                        className="text-xs text-gray-200"
                      >
                        {i.item?.name} × {i.quantity}
                      </div>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center mt-4">

                    <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white">
                      {normalizeStatus(order.status)}
                    </span>

                    <div className="flex gap-2">

                      {active && (
                        <button
                          onClick={() => navigate(`/track/${order.id}`)}
                          className="px-3 py-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg text-xs"
                        >
                          Track
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleReorder(
                            order.items.map((i: any) => ({
                              id: i.item?.id,
                              size: i.size,
                              quantity: i.quantity,
                            }))
                          )
                        }
                        className="px-3 py-2 bg-teal-600/80 hover:bg-teal-600 rounded-lg text-xs"
                      >
                        Reorder
                      </button>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}