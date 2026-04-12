import { useEffect, useState, useRef, useMemo } from "react";
import {
  Sparkles,
  CheckCircle,
  ChefHat,
  PackageCheck,
  Ban,
} from "lucide-react";

import { db } from "../../../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

/* ---------------- TYPES ---------------- */
type OrderType = {
  id: string;
  name: string;
  phone: string;
  location: string;
  total: number;
  status: string;
  createdAt?: any;
  prepTime?: number;
  readyAt?: any;
  items?: { item: { name: string }; quantity: number }[];
};

const STATUS_FLOW = ["new", "preparing", "ready", "delivered", "cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [timeInput, setTimeInput] = useState<{ [key: string]: number }>({});

  const sliderRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- SOUND ---------------- */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevOrderIds = useRef<string[]>([]);

  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
    audioRef.current.loop = true;
  }, []);

  const playSound = () => audioRef.current?.play().catch(() => {});
  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  /* ---------------- FIRESTORE ---------------- */
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as OrderType[];

      const mappedOrders = newOrders
        .map((o) => {
          if (o.status === "failed" || o.status === "cancelled") {
            return { ...o, status: "cancelled" };
          }
          if (o.status === "created" || o.status === "pending") return null;
          if (o.status === "paid") return { ...o, status: "new" };
          return o;
        })
        .filter(Boolean) as OrderType[];

      const currentIds = mappedOrders.map((o) => o.id);
      const isNewOrder = currentIds.length > prevOrderIds.current.length;

      if (isNewOrder) playSound();

      prevOrderIds.current = currentIds;
      setOrders(mappedOrders);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const hasNew = orders.some((o) => o.status === "new");
    if (!hasNew) stopSound();
  }, [orders]);

  /* ---------------- TIMER ---------------- */
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const openBill = (orderId: string) => {
    window.open(`/bill/${orderId}`, "_blank");
  };

  const isBlinking = (order: OrderType) => order.status === "new";

const scrollToTab = (index: number) => {
  if (!sliderRef.current) return;

  const container = sliderRef.current;
  const child = container.children[index] as HTMLElement;

  if (!child) return;

  const containerRect = container.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  const offset =
    childRect.left -
    containerRect.left -
    container.clientWidth / 2 +
    child.clientWidth / 2;

  container.scrollBy({
    left: offset,
    behavior: "smooth",
  });
};

  const updateStatus = async (order: OrderType, status: string) => {
    const data: any = { status };

    if (status === "preparing") {
      const prep = order.prepTime || 20;
      data.prepTime = prep;
      data.readyAt = new Date(Date.now() + prep * 60000);
    }

    await updateDoc(doc(db, "orders", order.id), data);
    stopSound();
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteDoc(doc(db, "orders", id));
  };

  const setPrepTime = async (id: string, minutes: number) => {
    await updateDoc(doc(db, "orders", id), {
      prepTime: minutes,
      readyAt: new Date(Date.now() + minutes * 60000),
    });
  };

  const getRemainingTime = (order: OrderType) => {
    if (!order.readyAt) return null;

    const readyTime = order.readyAt.toDate
      ? order.readyAt.toDate()
      : new Date(order.readyAt);

    const diff = Math.floor((readyTime.getTime() - Date.now()) / 60000);
    return diff > 0 ? diff : 0;
  };

  const getNextStatus = (status: string) => {
    if (status === "delivered" || status === "cancelled") return null;
    return STATUS_FLOW[STATUS_FLOW.indexOf(status) + 1];
  };

  const statusLabels: Record<string, string> = {
    new: "Accept",
    preparing: "Ready",
    ready: "Deliver",
  };

  const stats = useMemo(() => {
    const map: Record<string, number> = {};
    STATUS_FLOW.forEach((s) => (map[s] = 0));
    orders.forEach((o) => map[o.status]++);
    return map;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!filterStatus) return orders;
    return orders.filter((o) => o.status === filterStatus);
  }, [orders, filterStatus]);

  const STATUS_UI: any = {
    new: { icon: Sparkles, color: "text-blue-400", bg: "bg-blue-500/10" },
    preparing: { icon: ChefHat, color: "text-orange-400", bg: "bg-orange-500/10" },
    ready: { icon: PackageCheck, color: "text-teal-400", bg: "bg-teal-500/10" },
    delivered: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
    cancelled: { icon: Ban, color: "text-red-400", bg: "bg-red-500/10" },
  };

  return (
    <div className="space-y-6 p-4">

      {/* ✅ STATUS TABS (FINAL CLEAN VERSION) */}
     <div
  ref={sliderRef}
  className="
    flex gap-3 p-2
    overflow-x-auto flex-nowrap
    scrollbar-hide
    scroll-smooth
  "
>
        {/* ALL */}
        <div
          onClick={() => {
            setFilterStatus(null);
            scrollToTab(0);
          }}
          className={`min-w-[120px] md:min-w-[150px] flex-shrink-0 p-3 md:p-4 rounded-2xl bg-white/5 cursor-pointer ${
            filterStatus === null ? "ring-2 ring-teal-400" : ""
          }`}
        >
          All ({orders.length})
        </div>

        {STATUS_FLOW.map((s, i) => {
          const Icon = STATUS_UI[s].icon;

          return (
            <div
              key={s}
              onClick={() => {
                setFilterStatus(s);
                scrollToTab(i + 1);
              }}
              className={`min-w-[120px] md:min-w-[150px] flex-shrink-0 p-3 md:p-4 rounded-2xl flex items-center gap-2 cursor-pointer
              ${STATUS_UI[s].bg}
              ${filterStatus === s ? "ring-2 ring-white" : ""}
              ${s === "new" && stats[s] > 0 ? "animate-pulse ring-2 ring-red-500" : ""}`}
            >
              <Icon className={`w-4 h-4 ${STATUS_UI[s].color}`} />
              <span className="capitalize">{s}</span>
              <span className="text-xs opacity-70">({stats[s]})</span>
            </div>
          );
        })}
      </div>

      {/* ORDERS */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const remaining = getRemainingTime(order);
          const isLocked =
            order.status === "delivered" || order.status === "cancelled";

          return (
            <div
              key={order.id}
              className={`bg-gray-800 p-4 md:p-5 rounded-2xl ${
                isBlinking(order) ? "animate-pulse ring-2 ring-red-500" : ""
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-white text-lg">{order.name}</p>
                  <p className="text-xs text-gray-400">
                    {formatDateTime(order.createdAt)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-white font-bold">₹{order.total}</p>
                  <p className="text-xs capitalize">{order.status}</p>
                </div>
              </div>

              {remaining !== null && (
                <p className="text-teal-400 text-sm mt-2">
                  ⏱ Ready in: {remaining} min
                </p>
              )}

              {/* PREP TIME */}
              <div className="flex gap-2 mt-3">
               <input
  type="number"
  disabled={isLocked}
  value={timeInput[order.id] ?? order.prepTime ?? 20}
  className={`w-20 px-2 py-1 rounded text-sm ${
    isLocked
      ? "bg-gray-600 opacity-50"
      : "bg-gray-700 text-white"
  }`}
  onChange={(e) =>
    setTimeInput({
      ...timeInput,
      [order.id]: Number(e.target.value),
    })
  }
/>

                <button
                  disabled={isLocked}
                  onClick={() =>
                    setPrepTime(order.id, timeInput[order.id] || 20)
                  }
                  className={`px-3 py-1 rounded text-sm ${
                    isLocked ? "bg-gray-600" : "bg-teal-500"
                  }`}
                >
                  Set Time
                </button>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {getNextStatus(order.status) && (
                  <button
                    onClick={() =>
                      updateStatus(order, getNextStatus(order.status)!)
                    }
                    className="bg-green-500 px-3 py-1 rounded text-sm"
                  >
                    {statusLabels[order.status] || "Next"}
                  </button>
                )}

                {!isLocked && (
                  <button
                    onClick={() => updateStatus(order, "cancelled")}
                    className="bg-red-500 px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                )}

                {order.status === "delivered" && (
                  <button
                    onClick={() => openBill(order.id)}
                    className="bg-blue-500 px-3 py-1 rounded text-sm"
                  >
                    Print Bill
                  </button>
                )}

                <button
                  onClick={() => deleteOrder(order.id)}
                  className="bg-gray-600 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}