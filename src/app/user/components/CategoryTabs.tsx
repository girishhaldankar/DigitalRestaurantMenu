import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";

interface TabOption {
  label: string;
  value: string;
  image?: string;
  icon?: any;
  color?: string;
}

interface CategoryTabsProps {
  categories: string[] | TabOption[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const isObject = typeof categories[0] === "object";
  const getValue = (item: any) => (isObject ? item.value : item);
  const getLabel = (item: any) => (isObject ? item.label : item);

  const getIcon = (item: any) => {
    const value = getValue(item)?.toLowerCase();
    if (value === "all") return Grid;
    if (isObject) return item.image || item.icon || null;
    return null;
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: direction === "left" ? -150 : 150, behavior: "smooth" });

  const scrollToCenter = (value: string) => {
    const button = buttonRefs.current[value];
    const container = scrollRef.current;
    if (button && container) {
      container.scrollTo({
        left: button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (value: string) => {
    onSelectCategory(value);
    scrollToCenter(value);
  };

  return (
    <div className="mb-8 relative z-30">
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm rounded-full p-1.5 border border-white/10 hover:bg-black/40 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="overflow-x-auto no-scrollbar scroll-smooth py-2 px-2 sm:px-0"
        >
          <div className="flex gap-4 min-w-max">
            {categories.map((item: any) => {
              const value = getValue(item);
              const label = getLabel(item);
              const Icon = getIcon(item);

              return (
                <motion.button
                  key={value}
                  ref={(el) => (buttonRefs.current[value] = el)}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 border ${
                    selectedCategory === value
                      ? "bg-teal-800/80 text-white border-teal-400 shadow-md"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {Icon &&
                    (typeof Icon === "string" ? (
                      <img
                        src={Icon.startsWith("http") ? Icon : `/${Icon}`}
                        alt={label}
                        className="w-6 h-6 object-cover rounded-full"
                        loading="lazy"
                      />
                    ) : (
                      <Icon className="w-5 h-5" />
                    ))}
                  <span className="text-sm font-medium">{label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm rounded-full p-1.5 border border-white/10 hover:bg-black/40 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
}