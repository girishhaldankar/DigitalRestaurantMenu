import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "../data/menuData";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";

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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const getItemPrice = (item: MenuItem, size: "half" | "full") =>
    size === "half" ? item.priceHalf ?? item.price ?? 0 : item.priceFull ?? item.price ?? 0;

  const subtotal = cartItems.reduce(
    (sum, { item, quantity, size }) => sum + getItemPrice(item, size) * quantity,
    0
  );

  const total = Math.max(10, Math.round(subtotal));
  const businessName = "My Kitchen";

  /* ================= PLACE ORDER WITH RAZORPAY ================= */
  const handleRazorpayPayment = async () => {
    if (!name || !phone || !location) {
      alert("Please fill all details");
      return;
    }

    try {
      // 1️⃣ Save order immediately as pending
      const orderRef = await addDoc(collection(db, "orders"), {
        name,
        phone,
        location,
        items: cartItems,
        total,
        status: "pending", // Admin will get notification
        method: "Razorpay",
        paymentId: null,
        createdAt: serverTimestamp(),
      });

      // 🔑 Razorpay options
      const options = {
        key: "rzp_test_SXmbOsiE7DQKdG", // YOUR TEST KEY
        amount: total * 100,
        currency: "INR",
        name: businessName,
        description: "Order Payment",
        image: "/logo.png",
        handler: async (response: any) => {
          try {
            // 2️⃣ Update order as paid after successful payment
            await updateDoc(doc(db, "orders", orderRef.id), {
              status: "paid",
              paymentId: response.razorpay_payment_id,
            });

            alert("Payment Successful & Order Placed! 🔥");
          } catch (error) {
            console.error(error);
            alert("Error updating payment status");
          }
        },
        prefill: { name, email: "test@example.com", contact: phone },
        theme: { color: "#10B981" },
        modal: { escape: true, backdropclose: false },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

      // Clear cart & inputs
      onClearCart();
      setName("");
      setPhone("");
      setLocation("");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* SHEET */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-white z-50 flex flex-col shadow-xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-teal-500" />
                <h2 className="font-bold text-lg">Your Cart</h2>
              </div>
              <button onClick={onClose}><X /></button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-400">Cart is empty</p>
              ) : (
                <>
                  {cartItems.map(({ item, quantity, size }) => (
                    <div key={item.id + size} className="flex gap-3 border rounded-xl p-3">
                      <img src={item.image} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-1 flex flex-col justify-between">
                        <h3 className="font-semibold text-sm">{item.name} ({size})</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center bg-gray-100 rounded-lg px-2">
                            <button onClick={() => onRemove(item.id, size)}><Minus size={14} /></button>
                            <span className="px-2">{quantity}</span>
                            <button onClick={() => onAdd(item.id, size)}><Plus size={14} /></button>
                          </div>
                          <span className="font-bold">₹{getItemPrice(item, size) * quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={onClearCart} className="text-red-500 text-sm">Clear Cart</button>

                  <div className="space-y-3 pt-2">
                    <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg p-3" />
                    <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border rounded-lg p-3" />
                    <input placeholder="Table No / Location" value={location} onChange={e => setLocation(e.target.value)} className="w-full border rounded-lg p-3" />
                  </div>
                </>
              )}
            </div>

            {/* FOOTER */}
            {cartItems.length > 0 && (
              <div className="border-t p-4 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-bold text-lg">₹{total}</p>
                  </div>
                  <button
                    onClick={handleRazorpayPayment}
                    className="bg-teal-600 text-white px-4 py-3 rounded-lg font-semibold"
                  >
                    Pay & Place Order
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}