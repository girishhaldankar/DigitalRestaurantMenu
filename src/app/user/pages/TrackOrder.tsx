import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ArrowLeft, Clock, Route } from "lucide-react";

export default function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  /* =========================
     FETCH ORDER
     ========================= */
  useEffect(() => {
    if (!id) return;

    const unsub = onSnapshot(doc(db, "orders", id), (snap) => {
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() });
      }
    });

    return () => unsub();
  }, [id]);

  /* =========================
     LOADING
     ========================= */
  if (!order) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading order...
      </div>
    );
  }

  /* =========================
     TIMER
     ========================= */
  const getRemainingTime = () => {
    if (!order.readyAt) return null;

    const ready =
      order.readyAt.toDate?.() || new Date(order.readyAt);

    const diff = Math.floor((ready.getTime() - Date.now()) / 60000);

    return diff > 0 ? diff : 0;
  };

  /* =========================
     CANCEL LOGIC (UPDATED)
     ========================= */
  const handleCancel = async () => {
    if (!order?.id) return;

    try {
      setLoadingCancel(true);

      await updateDoc(doc(db, "orders", order.id), {
        status: "cancelled",
      });

      setShowCancelModal(false);
    } catch (err) {
      console.error(err);
      alert("Error cancelling order");
    } finally {
      setLoadingCancel(false);
    }
  };

  /* =========================
     STATUS
     ========================= */
  const status = (order.status || "").toLowerCase();

  const canCancel =
    status === "new" ||
    status === "paid" ||
    status === "preparing";

  /* =========================
     UI
     ========================= */
  return (
    <div className="min-h-screen relative text-white p-4">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/food-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-md mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/orders")}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-teal-300" />
            <h2 className="font-bold">Track Order</h2>
          </div>

          <div className="w-8" />
        </div>

        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">

          <p className="text-center text-gray-300 mb-3">
            {order.name}
          </p>

          {/* STATUS */}
          <div className="text-center mb-4">
            <span className="px-4 py-2 rounded-full bg-teal-600/20 text-teal-300 font-semibold capitalize">
              {status}
            </span>
          </div>

          {/* TIMER */}
          {getRemainingTime() !== null && status !== "cancelled" && (
            <p className="text-center text-teal-300 font-semibold mb-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Ready in {getRemainingTime()} min
            </p>
          )}

          {/* ITEMS */}
          <div className="border-t border-white/10 pt-4 space-y-2">
            {order.items?.map((i: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between text-sm text-gray-200"
              >
                <span>{i.item?.name}</span>
                <span>x{i.quantity}</span>
              </div>
            ))}
          </div>

          {/* CANCEL BUTTON */}
          {canCancel && status !== "cancelled" && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="mt-4 w-full bg-red-500/80 hover:bg-red-500 text-white py-2 rounded-xl text-sm font-semibold transition"
            >
              Cancel Order
            </button>
          )}

          {/* CANCELLED MESSAGE */}
          {status === "cancelled" && (
            <p className="text-center text-red-400 mt-4 text-sm">
              ❌ This order has been cancelled
            </p>
          )}
        </div>
      </div>

      {/* =========================
          🔥 BEAUTIFUL CANCEL MODAL
         ========================= */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-2xl">

            <h2 className="text-lg font-bold mb-2 text-white">
              Cancel Order?
            </h2>

            <p className="text-sm text-gray-300 mb-4">
              {status === "preparing"
                ? "⚠️ Order is being prepared. Cancellation charges may apply."
                : "Are you sure you want to cancel this order?"}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                No
              </button>

              <button
                onClick={handleCancel}
                disabled={loadingCancel}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-semibold"
              >
                {loadingCancel ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}