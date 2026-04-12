import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "../data/menuData";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: (id: string, size: "half" | "full") => void;
  onRemove: (id: string, size: "half" | "full") => void;
}

export function MenuItemCard({
  item,
  quantity,
  onAdd,
  onRemove,
}: MenuItemCardProps) {
  const [size, setSize] = useState<"half" | "full">(
    item.priceHalf ? "half" : "full"
  );

  const price =
    size === "half"
      ? item.priceHalf ?? item.priceFull ?? item.price ?? 0
      : item.priceFull ?? item.priceHalf ?? item.price ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col sm:flex-row gap-3 p-3 bg-teal-900/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl w-full"
    >
      {/* IMAGE */}
      <div className="relative w-full sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 rounded-xl overflow-hidden border border-white/10 shadow-md flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes("fallback")) img.src = "/fallback.jpg";
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Veg / Non-Veg */}
        <div className="absolute top-2 left-2">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              item.isVeg
                ? "bg-green-500/25 border-green-500"
                : "bg-red-500/25 border-red-500"
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                item.isVeg ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
        </div>

        {/* Rating */}
        <div className="absolute bottom-2 right-2 bg-black/50 rounded px-2 py-0.5 flex items-center gap-1">
          <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
          <span className="text-white text-[10px] font-semibold">4.8</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg line-clamp-2">
            {item.name}
          </h3>
          <p className="text-[11px] text-gray-300 line-clamp-2 mt-1">
            {item.description}
          </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col gap-1 mt-3">

          {/* HALF / FULL TOGGLE */}
          {item.priceHalf && item.priceFull && (
            <div className="relative flex bg-white/10 p-[2px] rounded-full w-fit overflow-hidden">

              {/* Animated Slider */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute top-[2px] bottom-[2px] w-1/2 rounded-full bg-teal-500/40"
                style={{
                  left: size === "half" ? "2px" : "50%",
                }}
              />

              <button
                onClick={() => setSize("half")}
                className={`relative z-10 px-2 py-[2px] text-[10px] rounded-full ${
                  size === "half" ? "text-white" : "text-gray-300"
                }`}
              >
                Half
              </button>

              <button
                onClick={() => setSize("full")}
                className={`relative z-10 px-2 py-[2px] text-[10px] rounded-full ${
                  size === "full" ? "text-white" : "text-gray-300"
                }`}
              >
                Full
              </button>
            </div>
          )}

          {/* PRICE + CONTROLS */}
          <div className="flex items-center justify-between mt-0">

            {/* PRICE */}
            <span className="text-sm font-semibold text-white">
              ₹{price}
            </span>

            {/* 🔥 ADD ↔ QUANTITY ANIMATION */}
           <AnimatePresence mode="popLayout">
      {quantity === 0 ? (
        <motion.button
          key="add"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.85 }}
          onClick={() => onAdd(item.id, size)}
          className="w-7 h-7 flex items-center justify-center bg-teal-500/40 rounded-full shadow-md"
        >
          <Plus className="w-3 h-3 text-white" />
        </motion.button>
      ) : (
        <motion.div
          key="controls"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.15 } }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center h-7 gap-1 bg-white/5 text-white rounded-full px-1.5 border border-white/10"
        >
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onRemove(item.id, size)}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <Minus className="w-2.5 h-2.5" />
          </motion.button>

          <motion.span
            key={quantity}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="font-medium text-[11px] text-teal-400 min-w-[14px] text-center"
          >
            {quantity}
          </motion.span>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onAdd(item.id, size)}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <Plus className="w-2.5 h-2.5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>

          </div>
        </div>
      </div>
    </motion.div>
  );
}