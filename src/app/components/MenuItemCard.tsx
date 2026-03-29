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
      className="group relative flex gap-3 md:gap-6 p-3 md:p-5 bg-white/[0.04] backdrop-blur-[32px] rounded-lg border border-white/10 shadow-2xl hover:bg-white/[0.08] transition-all duration-500"
    >
      {/* IMAGE */}
      <div className="relative w-24 md:w-48 h-24 md:h-40 shrink-0 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes("fallback")) img.src = "/fallback.jpg";
          }}
          className="w-full h-full object-cover"
        />

        {/* Veg / Non-Veg */}
        <div className="absolute top-2 left-2">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              item.isVeg
                ? "bg-green-500/20 border-green-500"
                : "bg-red-500/20 border-red-500"
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
        <div className="absolute bottom-2 right-2 bg-black/40 rounded px-2 py-0.5 flex items-center gap-1">
          <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
          <span className="text-white text-[10px] font-bold">4.8</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* TEXT */}
        <div>
          <h3 className="font-bold text-white text-sm md:text-lg leading-tight">
            {item.name}
          </h3>
          <p className="text-[11px] md:text-xs text-gray-300 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* BOTTOM */}
        <div className="flex items-end justify-between mt-2 gap-2">
          {/* LEFT: PRICE + TOGGLE */}
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-black text-white">
              ₹{price}
            </span>

            {/* TOGGLE */}
            {item.priceHalf && item.priceFull && (
              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => setSize("half")}
                  className={`text-[9px] px-2 py-0.5 rounded ${
                    size === "half"
                      ? "bg-teal-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  Half
                </button>

                <button
                  onClick={() => setSize("full")}
                  className={`text-[9px] px-2 py-0.5 rounded ${
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

          {/* RIGHT: BUTTON */}
          <div className="shrink-0">
            {quantity === 0 ? (
              <button
                onClick={() => onAdd(item.id, size)}
                className="px-3 py-1.5 md:px-6 md:py-2 bg-teal-500 text-white rounded-lg font-bold text-[10px] md:text-xs whitespace-nowrap"
              >
                ORDER
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-white/5 text-white rounded-lg px-2 py-1 border border-white/20">
                <button
                  onClick={() => onRemove(item.id, size)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <Minus className="w-3 h-3" />
                </button>

                <span className="font-bold text-sm text-teal-400">
                  {quantity}
                </span>

                <button
                  onClick={() => onAdd(item.id, size)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}