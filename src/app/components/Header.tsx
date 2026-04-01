import { motion } from "motion/react";
import { Download, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onExploreClick?: () => void;
}

export function Header({ onExploreClick }: HeaderProps) {
  const navigate = useNavigate();

  const openPreviewPage = () => {
    navigate("/menu-preview");
  };

  return (
    <header className="relative pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo Section */}
     <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2 group hover:scale-105 transition-transform duration-300"
>
  {/* Logo Image */}
  <img
    src="/CIBOlogo.png"
    alt="CIBO Logo"
    className="w-36 h-36 sm:w-40 sm:h-40 md:w-28 md:h-28 object-contain drop-shadow-xl"
  />

  <div className="flex flex-col items-center relative leading-none">
    
    {/* CIBO */}
    <h1
      className="text-5xl sm:text-6xl md:text-6xl font-extrabold tracking-[0.18em] drop-shadow-md"
      style={{
        background: "linear-gradient(90deg, #4fd1c5, #2c7a7b)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      CIBO
    </h1>

    {/* Kitchen */}
    <h2
      className="text-5xl sm:text-6xl md:text-6xl text-black -mt-6 text-center z-50 text-shadow-2xs text-shadow-gray-400 tracking-tighter"
      style={{
        fontFamily: "'Allura', cursive",
      }}
    >
      Kitchen
    </h2>

    {/* Tagline */}
    <p className="text-sm sm:text-base md:text-xs text-gray-100 mt-1 px-3 py-1 bg-teal-700/40 backdrop-blur-md rounded-full uppercase shadow-sm tracking-[0.2em]">
      Yummy Food
    </p>

  </div>
</motion.div>

        {/* Hero Section */}
        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Hero Text */}
          <div className="max-w-lg text-center md:text-left mx-auto md:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[22px] sm:text-3xl md:text-5xl font-bold text-white leading-snug"
            >
              The ultimate <span className="text-teal-400 italic">test</span>
              <br />
              of{" "}
              <span className="underline decoration-white/20 underline-offset-8">
                deliciousness
              </span>
            </motion.h2>

            <p className="text-gray-300 mt-4 md:mt-5 text-base md:text-lg leading-relaxed font-medium max-w-md">
              Satisfy your cravings with our chef's secret recipes. Every bite is
              a masterpiece of flavor and fresh ingredients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreClick}
                className="mt-6 px-8 py-4 md:px-10 md:py-5 bg-teal-600/30 text-white rounded-lg font-black  hover:bg-teal-700 transition-all uppercase tracking-widest text-xs"
              >
                Explore Menu
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openPreviewPage}
                className="mt-0 sm:mt-6 px-8 py-4 md:px-10 md:py-5 border-2 border-teal-500/30 text-teal-400 rounded-lg font-black hover:bg-teal-500/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </motion.button>
            </div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative block"
          >
            <div className="absolute inset-0 bg-teal-600/10 blur-[60px] md:blur-[80px] rounded-full scale-75" />

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 max-w-[280px] md:max-w-md mx-auto md:ml-auto"
            >
              <img
                src="/hero-food.png"
                alt="Signature Dish"
                className="w-full h-auto rounded-lg shadow-2xl border border-white/10"
              />

              <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-lg p-2.5 md:p-3 shadow-2xl">
                <div className="flex items-center gap-2 md:gap-2.5">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>

                  <div>
                    <p className="text-white font-bold text-[10px] md:text-xs tracking-tight">
                      Chef's Special
                    </p>
                    <p className="text-gray-300 text-[8px] md:text-[10px] font-medium italic">
                      Hand-crafted today
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}