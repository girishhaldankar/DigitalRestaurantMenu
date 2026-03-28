import { motion } from "motion/react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-6 relative z-20 py-2 max-w-sm mx-auto"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-lg -z-10 border border-white/10 group-focus-within:border-teal-500/40 transition-all duration-500 shadow-2xl" />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-300 group-focus-within:text-teal-400 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2.5 md:py-3 bg-transparent border-none focus:ring-0 text-white placeholder-white/40 text-sm rounded-lg font-medium tracking-wide"
          placeholder="Search for your favorite delicacies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X className="h-4 w-4 text-gray-300 hover:text-teal-400 transition-colors" />
          </button>
        )}
      </div>
    </motion.div>
  );
}