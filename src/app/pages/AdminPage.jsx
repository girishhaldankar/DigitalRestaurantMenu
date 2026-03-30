import { useEffect, useState, useRef } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [hasPending, setHasPending] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);

  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  const navigate = useNavigate();

  /* ================= AUDIO ================= */

  useEffect(() => {
    const audio = new Audio("/notification.mp3");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 1;
    audioRef.current = audio;
  }, []);

  const unlockAudio = () => {
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setSoundUnlocked(true);
      })
      .catch(() => {});

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  /* ================= FIRESTORE ================= */

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(newOrders);

      const pending = newOrders.some((o) => o.status === "pending");
      setHasPending(pending);

      /* 🔊 SOUND */
      if (
        pending &&
        soundUnlocked &&
        audioRef.current &&
        !isPlayingRef.current
      ) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        isPlayingRef.current = true;
      } else if (!pending && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        isPlayingRef.current = false;
      }

      /* 📳 VIBRATION */
      if (pending && navigator.vibrate && soundUnlocked) {
        navigator.vibrate([200, 100, 200]);
      }

      /* 🔔 NOTIFICATION */
      if (
        pending &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification("🍴 New Order!", {
          body: "You have a pending order",
        });
      }
    });

    return () => unsubscribe();
  }, [soundUnlocked]);

  /* ================= ACTIONS ================= */

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "orders", id), { status });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteDoc(doc(db, "orders", id));
    } catch (err) {
      console.error(err);
    }
  };

  /* 🔐 LOGOUT */
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          🍴 Live Orders Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* SOUND BUTTON */}
      {!soundUnlocked && (
        <button
          onClick={unlockAudio}
          className="mb-4 bg-gradient-to-r from-teal-400 to-teal-600 hover:scale-105 transition-transform text-white px-5 py-2 rounded-full shadow-lg"
        >
          🔊 Enable Sound Alerts
        </button>
      )}

      {/* EMPTY */}
      {orders.length === 0 ? (
        <p className="text-gray-300 text-lg">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bg-gray-800/70 backdrop-blur-md p-5 rounded-2xl shadow-xl border ${
                order.status === "pending"
                  ? "border-yellow-400 animate-pulse"
                  : "border-transparent"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white text-lg">
                    {order.name}
                  </p>
                  <p className="text-sm text-teal-300">
                    📞 {order.phone}
                  </p>
                  <p className="text-sm text-teal-300">
                    📍 {order.location}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg text-white">
                    ₹{order.total}
                  </p>

                  <p
                    className={`text-sm font-semibold capitalize ${
                      order.status === "pending"
                        ? "text-yellow-400"
                        : order.status === "served"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              <div className="mt-3 border-t border-gray-600 pt-2">
                {order.items?.map((i, idx) => (
                  <p key={idx} className="text-sm text-gray-300">
                    • {i.item.name} x{i.quantity}
                  </p>
                ))}
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => updateStatus(order.id, "served")}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                >
                  Served
                </button>

                <button
                  onClick={() => updateStatus(order.id, "cancelled")}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteOrder(order.id)}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}