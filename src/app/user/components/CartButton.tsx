import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Sparkles } from "lucide-react";

interface CartButtonProps {
  itemCount: number;
  total: number;
  onClick: () => void;
}

export function CartButton({ itemCount, total, onClick }: CartButtonProps) {
  if (!itemCount || itemCount === 0) return null;

  // ✅ FIX: prevent NaN / undefined
  const safeTotal = Number(total) || 0;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white px-8 py-5 rounded-lg shadow-2xl shadow-teal-500/50 flex items-center gap-4 transition-all max-w-[calc(100%-2rem)] md:max-w-md border-2 border-teal-400"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/50 to-teal-500/50 rounded-lg blur-xl" />

        <div className="flex items-center gap-4 flex-1 relative z-10">
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <ShoppingCart className="w-7 h-7" />
            </motion.div>

            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-white text-teal-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
            >
              {itemCount}
            </motion.span>
          </div>

          <div className="flex flex-col items-start">
            <span className="font-bold text-lg leading-tight">View Cart</span>

            <span className="text-teal-100 text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="border-l-2 border-teal-400 pl-5 relative z-10">
          {/* ✅ FIXED */}
          <span className="font-bold text-lg md:text-2xl">
            ₹{safeTotal.toFixed(2)}
          </span>
        </div>
      </motion.button>
    </AnimatePresence>
  );
}