import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import {
  Globe,
  Utensils,
  Soup,
  Pizza,
  Sandwich,
  Flame
} from "lucide-react";

interface CuisineFilterProps {
  cuisine: string;
  onChange: (val: string) => void;
}

type CuisineType = {
  id?: string;
  label: string;
  value: string;
};

export function CuisineFilter({ cuisine, onChange }: CuisineFilterProps) {
  const [cuisines, setCuisines] = useState<CuisineType[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  /* 🔥 FETCH */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cuisines"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CuisineType[];

      setCuisines(data);
    });

    return () => unsub();
  }, []);

  /* 🎯 SCROLL TO CENTER */
  const scrollToCenter = (key: string) => {
    const el = itemRefs.current[key];
    const container = containerRef.current;

    if (!el || !container) return;

    const elLeft = el.offsetLeft;
    const elWidth = el.offsetWidth;

    const containerWidth = container.offsetWidth;

    container.scrollTo({
      left: elLeft - containerWidth / 2 + elWidth / 2,
      behavior: "smooth",
    });
  };

  /* 🔁 ICON MAP */
  const getIcon = (value: string) => {
    switch (value) {
      case "Indian":
        return Utensils;
      case "Chinese":
        return Soup;
      case "Continental":
        return Pizza;
      case "Thai":
        return Flame;
      case "Fast Food":
        return Sandwich;
      default:
        return Globe;
    }
  };

  return (
    <div className="mb-6 flex justify-center">
      <div
        ref={containerRef}
        className="flex gap-2 bg-white/5 p-1.5 rounded-lg border border-white/10 overflow-x-auto scrollbar-hide"
      >

        {/* ALL */}
        <button
          ref={(el) => (itemRefs.current["All"] = el)}
          onClick={() => {
            onChange("All");
            scrollToCenter("All");
          }}
          className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap ${
            cuisine === "All" ? "text-white" : "text-gray-300"
          }`}
        >
          {cuisine === "All" && (
            <motion.div
              layoutId="cuisine-pill"
              className="absolute inset-0 bg-teal-600 rounded-lg -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          <Globe className="w-3.5 h-3.5" />
          All
        </button>

        {/* DYNAMIC */}
        {cuisines.map((opt) => {
          const Icon = getIcon(opt.value);
          const active = cuisine === opt.value;

          return (
            <button
              key={opt.id}
              ref={(el) => (itemRefs.current[opt.value] = el)}
              onClick={() => {
                onChange(opt.value);
                scrollToCenter(opt.value);
              }}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap ${
                active ? "text-white" : "text-gray-300"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="cuisine-pill"
                  className="absolute inset-0 bg-teal-600 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              <Icon className="w-3.5 h-3.5" />
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}