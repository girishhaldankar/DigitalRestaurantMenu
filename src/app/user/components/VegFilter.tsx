import { motion } from "framer-motion"; // make sure framer-motion is installed
import { Leaf, Drumstick } from "lucide-react";

interface VegFilterProps {
  filter: "all" | "veg" | "nonveg";
  onFilterChange: (filter: "all" | "veg" | "nonveg") => void;
}

export function VegFilter({ filter, onFilterChange }: VegFilterProps) {
  const options = [
    { id: "all", label: "All", color: "", icon: null },
    { id: "veg", label: "Veg", color: "#22c55e", icon: Leaf },      // premium green
    { id: "nonveg", label: "Non-Veg", color: "#ef4444", icon: Drumstick }, // premium red
  ];

  return (
    <div className="mb-8 relative z-30 flex justify-center">
      <div className="inline-flex w-full max-w-sm p-1.5 bg-white/5 backdrop-blur-2xl rounded-lg border border-white/10 shadow-xl">
        {options.map((option) => {
          const isActive = filter === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id as any)}
              className={`relative flex-1 px-4 py-2 md:px-6 md:py-2.5 rounded-lg text-[10px] md:text-xs font-black transition-all duration-500 flex items-center justify-center gap-2 group uppercase tracking-wider md:tracking-widest whitespace-nowrap ${
                isActive ? "text-white" : "text-gray-200 hover:text-white"
              }`}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="active-pill-veg"
                  className="absolute inset-0 bg-teal-800/80 shadow-lg shadow-teal-500/20 rounded-lg -z-10 border border-white/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              {option.icon && (
                <option.icon
                  className="w-4 h-4"
                  style={{ color: option.color }} // use inline style for correct color
                />
              )}

              {/* Label */}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}