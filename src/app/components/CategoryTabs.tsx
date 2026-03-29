import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TabOption {
  label: string;
  value: string;
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
  const getIcon = (item: any) => (isObject ? item.icon : null);
  const getColor = (item: any) => (isObject ? item.color : null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const scrollToCenter = (value: string) => {
    const button = buttonRefs.current[value];
    const container = scrollRef.current;

    if (button && container) {
      const scrollTo =
        button.offsetLeft -
        container.offsetWidth / 2 +
        button.offsetWidth / 2;

      container.scrollTo({ left: scrollTo, behavior: "smooth" });
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
           className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 
bg-black/30 backdrop-blur-sm 
rounded-full p-1.5 
border border-white/10 
hover:bg-black/40 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
        )}

        {/* Tabs */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="overflow-x-auto no-scrollbar scroll-smooth py-2"
        >
          <div className="flex gap-4 w-max mx-auto px-4">
            {categories.map((item: any) => {
              const value = getValue(item);
              const label = getLabel(item);
              const Icon = getIcon(item);
              const color = getColor(item);

              return (
                <motion.button
                  key={value}
                  ref={(el) => (buttonRefs.current[value] = el)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(value)}
                  className={`px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg font-black text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap transition-all duration-500 border backdrop-blur-2xl shadow-xl flex items-center gap-2 ${
                    selectedCategory === value
                      ? "bg-teal-600 text-white border-teal-400"
                      : "bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className="w-4 h-4"
                      style={{ color: color || "white" }}
                    />
                  )}
                  {label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 
bg-black/30 backdrop-blur-sm 
rounded-full p-1.5 
border border-white/10 
hover:bg-black/40 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
}