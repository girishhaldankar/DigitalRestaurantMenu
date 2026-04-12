import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function TrackOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const unsub = onSnapshot(doc(db, "orders", id), (snap) => {
      if (snap.exists()) {
        setOrder(snap.data());
      }
    });

    return () => unsub();
  }, [id]);

  if (!order) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading order...</p>
      </div>
    );
  }

  // ⏱ TIME
  const getRemainingTime = () => {
    if (!order.readyAt) return null;

    const ready =
      order.readyAt.toDate?.() || new Date(order.readyAt);

    const diff = Math.floor((ready.getTime() - Date.now()) / 60000);

    return diff > 0 ? diff : 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-center mb-4">
          Order Tracking
        </h2>

        <p className="text-center text-gray-500 mb-4">
          {order.name}
        </p>

        {/* STATUS */}
        <div className="text-center mb-4">
          <span className="px-4 py-2 rounded-full bg-teal-100 text-teal-600 font-semibold capitalize">
            {order.status}
          </span>
        </div>

        {/* TIMER */}
        {getRemainingTime() !== null && (
          <p className="text-center text-teal-600 font-semibold mb-4">
            ⏱ Ready in {getRemainingTime()} min
          </p>
        )}

        {/* ITEMS */}
        <div className="border-t pt-4 space-y-2">
          {order.items?.map((i: any, idx: number) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{i.item.name}</span>
              <span>x{i.quantity}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}