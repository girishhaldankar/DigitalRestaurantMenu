import { motion } from "motion/react";
import { Minus, Plus, Star, Tag } from "lucide-react";
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

  // ✅ toggle
  const [size, setSize] = useState<"half" | "full">(
    item.priceHalf ? "half" : "full"
  );

  // ✅ SAFE PRICE FIX (important)
  const price =
    size === "half"
      ? item.priceHalf ?? item.priceFull ?? item.price ?? 0
      : item.priceFull ?? item.priceHalf ?? item.price ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-row gap-4 md:gap-6 p-3 md:p-5 bg-white/[0.04] backdrop-blur-[32px] rounded-lg border border-white/10 shadow-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden"
    >

      {/* IMAGE */}
      <div className="relative w-28 md:w-48 h-28 md:h-40 shrink-0 rounded-lg overflow-hidden shadow-2xl">
        <img
  src={item.image}
  alt={item.name}
  onError={(e) => {
    const img = e.currentTarget;

    // prevent infinite loop
    if (!img.src.includes("fallback")) {
      img.src = "/fallback.jpg";
    }
  }}
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

        {/* Veg / Non-Veg */}
        <motion.div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
          <div className={`w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 flex items-center justify-center p-1 ${
            item.isVeg ? "bg-green-500/20 border-green-500/40" : "bg-red-500/20 border-red-500/40"
          }`}>
            <div className={`w-full h-full rounded-full ${
              item.isVeg ? "bg-green-500" : "bg-red-500"
            }`} />
          </div>
        </motion.div>

        {/* Rating */}
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-black/40 backdrop-blur-xl rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
          <span className="text-white text-[10px] font-bold">4.8</span>
        </div>

        {/* Offer */}
        {item.offerTag && (
          <motion.div className="absolute top-2 right-2 md:top-3 md:right-3">
            <div className="bg-teal-600 text-white text-[9px] px-2 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-2 h-2" />
              {item.offerTag}
            </div>
          </motion.div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">

        <div>
          <h3 className="font-bold text-white text-base md:text-xl">
            {item.name}
          </h3>
          <p className="text-xs text-gray-300">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">

          {/* PRICE + TOGGLE */}
          <div>
            <span className="text-base md:text-2xl font-black text-white">
              ₹{price}
            </span>

            {/* TOGGLE */}
            {item.priceHalf && item.priceFull && (
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setSize("half")}
                  className={`text-[10px] px-2 py-1 rounded ${
                    size === "half"
                      ? "bg-teal-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  Half
                </button>

                <button
                  onClick={() => setSize("full")}
                  className={`text-[10px] px-2 py-1 rounded ${
                    size === "full"
                      ? "bg-teal-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  Full
                </button>
              </div>
            )}
          </div>

          {/* BUTTON */}
          {quantity === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAdd(item.id, size)}
              className="whitespace-nowrap px-4 py-1.5 md:px-8 md:py-3.5 bg-teal-500 text-white rounded-lg font-black text-[9px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-xl"
            >
              ORDER
            </motion.button>
          ) : (
            <motion.div className="flex items-center gap-2 bg-white/5 backdrop-blur-2xl text-white rounded-lg px-2 py-1 border border-white/20 shadow-xl">

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(item.id, size)}
                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/5"
              >
                <Minus className="w-3 h-3 md:w-4 md:h-4" />
              </motion.button>

              <span className="font-black text-[13px] md:text-lg text-teal-400">
                {quantity}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onAdd(item.id, size)}
                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/5"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
              </motion.button>

            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}