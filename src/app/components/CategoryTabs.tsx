import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryTabsProps {
  categories: string[];
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
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToCenter = (category: string) => {
    const button = buttonRefs.current[category];
    const container = scrollRef.current;

    if (button && container) {
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTo = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    scrollToCenter(category);
  };

  return (
    <div className="mb-8 relative z-30">
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-full p-2 hover:bg-white/10 transition-all hover:scale-110 border border-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
        )}

        {/* Categories */}
       <div
  ref={scrollRef}
  onScroll={checkScroll}
  className="overflow-x-auto no-scrollbar scroll-smooth py-2"
>
  <div className="flex gap-4 w-max mx-auto px-4">
    {categories.map((category) => (
      <motion.button
        key={category}
        ref={(el) => (buttonRefs.current[category] = el)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCategoryClick(category)}
        className={`px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg font-black text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap transition-all duration-500 border backdrop-blur-2xl shadow-xl ${
          selectedCategory === category
            ? "bg-teal-600 text-white border-teal-400 shadow-teal-500/20"
            : "bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:text-white"
        }`}
      >
        {category}
      </motion.button>
    ))}
  </div>
</div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-full p-2 hover:bg-white/10 transition-all hover:scale-110 border border-white/10"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
}