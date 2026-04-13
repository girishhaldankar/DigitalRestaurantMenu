import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, History, RotateCcw, MapPinned } from "lucide-react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function OrderHistoryPage() {
  console.log("OrderHistoryPage Loaded");

  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!user) return;

      const q = query(
        collection(db, "orders"),
        where("customerId", "==", String(user.mobile))
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // simple sort
      data.sort(
        (a: any, b: any) =>
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );

      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleReorder = (items: any[]) => {
    localStorage.setItem("reorderCart", JSON.stringify(items));
    navigate("/");
  };

  /* ✅ ACTIVE ORDER LOGIC */
  const isActiveOrder = (status: string) => {
    const s = (status || "").toLowerCase();
    return s !== "delivered" && s !== "cancelled";
  };

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
              className="p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-teal-300" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Order History
              </h1>
            </div>
          </div>

          {/* EMPTY */}
          {orders.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              🍽️ No orders yet. Try something delicious!
            </p>
          )}

          {/* ORDERS */}
          <div className="space-y-4">
            {orders.map((order) => {
              const active = isActiveOrder(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-lg"
                >
                  {/* DATE + TOTAL */}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-300">
                      {order.createdAt?.toDate?.().toLocaleString()}
                    </p>

                    <p className="font-bold text-teal-300">
                      ₹{order.total}
                    </p>
                  </div>

                  {/* ITEMS */}
                  <div className="mt-3 space-y-1">
                    {order.items?.map((i: any, index: number) => (
                      <div key={index} className="text-xs text-gray-200">
                        {i.item?.name} ({i.size}) × {i.quantity}
                      </div>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center mt-4">

                    {/* STATUS */}
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full ${
                        active
                          ? "bg-teal-500/20 text-teal-300"
                          : "bg-gray-500/20 text-gray-300"
                      }`}
                    >
                      {order.status || "pending"}
                    </span>

                    {/* BUTTONS */}
                    <div className="flex gap-2">

                      {/* ✅ TRACK BUTTON (ONLY ACTIVE) */}
                      {active && (
                        <button
                          onClick={() => navigate(`/track/${order.id}`)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600/60 hover:bg-blue-600 rounded-lg text-xs font-semibold transition active:scale-95"
                        >
                          <MapPinned className="w-4 h-4" />
                          Track
                        </button>
                      )}

                      {/* REORDER */}
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
                        className="flex items-center gap-2 px-3 py-2 bg-teal-600/60 hover:bg-teal-600 rounded-lg text-xs font-semibold transition active:scale-95"
                      >
                        <RotateCcw className="w-4 h-4" />
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