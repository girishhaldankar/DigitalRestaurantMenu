import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import type { MenuItem } from "../data/menuData";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

interface CartItem {
  item: MenuItem;
  quantity: number;
  size: "half" | "full";
}

interface CheckoutSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAdd: (id: string, size: "half" | "full") => void;
  onRemove: (id: string, size: "half" | "full") => void;
  onClearCart: () => void;
}

export function CheckoutSheet({
  isOpen,
  onClose,
  cartItems,
  onAdd,
  onRemove,
  onClearCart,
}: CheckoutSheetProps) {

  // 👤 USER FROM LOCAL STORAGE
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState("");

  const REVIEW_LINK = "https://g.page/r/CVkfccV-VGOPEAE/review";

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  // 👇 AUTO FILL WHEN USER EXISTS
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.mobile || "");
    }
  }, [user]);

  const getItemPrice = (item: MenuItem, size: "half" | "full") =>
    size === "half"
      ? item.priceHalf ?? item.price ?? 0
      : item.priceFull ?? item.price ?? 0;

  const subtotal = cartItems.reduce(
    (sum, { item, quantity, size }) =>
      sum + getItemPrice(item, size) * quantity,
    0
  );

  const total = Math.max(10, Math.round(subtotal));
  const businessName = "My Kitchen";

  const handleRazorpayPayment = async () => {
    if (!name || !phone || !location) {
      alert("Please fill all details");
      return;
    }

    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        name,
        phone,
        location,
        items: cartItems,
        total,
        status: "pending",
        method: "Razorpay",
        paymentId: null,
        createdAt: serverTimestamp(),
        prepTime: 20,
        customerId: user?.mobile || null, // 🔥 link user
      });

      const trackUrl = `/track/${orderRef.id}`;

      const options = {
        key: "rzp_test_SXmbOsiE7DQKdG",
        amount: total * 100,
        currency: "INR",
        name: businessName,
        description: "Order Payment",
        image: "https://digital-restaurant-menu-eight.vercel.app/logo.png",

        handler: async (response: any) => {
          await updateDoc(doc(db, "orders", orderRef.id), {
            status: "paid",
            paymentId: response.razorpay_payment_id,
            trackingUrl: trackUrl,
          });

          setTrackingUrl(trackUrl);
          setOrderSuccess(true);

          onClearCart();
          setLocation("");

          // 👇 only clear if guest
          if (!user) {
            setName("");
            setPhone("");
          }
        },

        prefill: {
          name,
          contact: phone,
        },

        theme: { color: "#10B981" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <AnimatePresence>

      {/* SUCCESS SCREEN */}
      {orderSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center text-center p-6"
        >
          <h2 className="text-2xl font-bold mb-2">🎉 Order Placed!</h2>

          <a
            href={trackingUrl}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg mb-4"
          >
            📍 Track Order
          </a>

          <a
            href={REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            ⭐ Rate Us
          </a>

          <button
            onClick={() => {
              setOrderSuccess(false);
              onClose();
            }}
            className="mt-4 text-gray-400 text-sm underline"
          >
            Close
          </button>
        </motion.div>
      )}

      {/* CART */}
      {isOpen && !orderSuccess && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-white z-50 flex flex-col"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-teal-500" />
                <h2 className="font-bold text-lg">Your Cart</h2>
              </div>
              <button onClick={onClose}><X /></button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map(({ item, quantity, size }) => (
                <div key={item.id + size} className="flex gap-3 border rounded-xl p-3">
                  <img src={item.image} className="w-20 h-20 rounded-lg object-cover" />

                  <div className="flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-sm">
                      {item.name} ({size})
                    </h3>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center bg-gray-100 rounded-lg px-2">
                        <button onClick={() => onRemove(item.id, size)}><Minus size={14} /></button>
                        <span className="px-2">{quantity}</span>
                        <button onClick={() => onAdd(item.id, size)}><Plus size={14} /></button>
                      </div>

                      <span className="font-bold">
                        ₹{getItemPrice(item, size) * quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* USER INFO */}
              <div className="space-y-3 pt-2">
                <input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg p-3"
                  disabled={!!user}
                />

                <input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded-lg p-3"
                  disabled={!!user}
                />

                <input
                  placeholder="Table No / Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            {/* PAY */}
            <div className="border-t p-4">
              <button
                onClick={handleRazorpayPayment}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold"
              >
                Pay ₹{total}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}