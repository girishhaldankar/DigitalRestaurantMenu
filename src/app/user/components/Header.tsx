import { motion } from "motion/react";
import { Download, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, LogOut, History  } from "lucide-react";

interface HeaderProps {
  onExploreClick?: () => void;
}

export function Header({ onExploreClick }: HeaderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("currentUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    const interval = setInterval(loadUser, 1000);

    return () => {
      window.removeEventListener("storage", loadUser);
      clearInterval(interval);
    };
  }, []);

  const openPreviewPage = () => {
    navigate("/menu-preview");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="relative pt-5 pb-8">
      <div className="max-w-6xl mx-auto px-2">

        <div className="relative mb-8">
          <div className="absolute top-0 right-0 z-50 mt-2 mr-0 sm:mr-2">

  {!user ? (
    <button
      onClick={() => navigate("/customer-login")}
      className="
        text-xs sm:text-sm text-white
        bg-white/10 backdrop-blur-xl
        border border-white/20
        px-4 py-2 sm:px-6 sm:py-2
        rounded-full
        hover:bg-white/15 hover:scale-[1.03]
        active:scale-95
        transition-all duration-300
      "
    >
      Login
    </button>
  ) : (
    <div
      className="
        flex items-center gap-2
        px-3 py-2 sm:px-4 sm:py-2
        rounded-full
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_8px_30px_rgb(0,0,0,0.25)]
      "
    >

      {/* USER ICON + NAME */}
      <div className="flex items-center gap-1 text-white">
        <User className="w-4 h-4 text-teal-300" />

        <span className="text-xs sm:text-sm max-w-[80px] sm:max-w-none truncate">
          {user.name}
        </span>
      </div>

       {/* DIVIDER */}
  <div className="w-[1px] h-4 bg-white/20" />

  {/* ORDER HISTORY */}
  <button
    onClick={() => navigate("/orders")}
    className="text-white/80 hover:text-teal-300 transition active:scale-95"
    title="Orders"
  >
    <History className="w-4 h-4" />
  </button>

      {/* DIVIDER */}
      <div className="w-[1px] h-4 bg-white/20" />

      {/* LOGOUT ICON */}
      <button
        onClick={handleLogout}
        className="text-white/80 hover:text-red-400 transition active:scale-95"
        title="Logout"
      >
        <LogOut className="w-4 h-4" />
      </button>

    </div>
  )}

</div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-row flex-nowrap items-start gap-1 mb-2 group hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/CIBOlogo.png"
              alt="CIBO Logo"
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-xl"
            />

            <div className="flex flex-col items-center relative leading-none">

  <h1
    className="text-4xl sm:text-5xl font-extrabold tracking-[0.16em] drop-shadow-md"
    style={{
      background: "linear-gradient(90deg, #4fd1c5, #2c7a7b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    CIBO
  </h1>

  <h2
    className="text-4xl sm:text-5xl text-black -mt-5 z-50 tracking-tighter"
    style={{
      fontFamily: "'Allura', cursive",
      textShadow: "0 0 8px rgba(255,255,255,0.55), 0 2px 10px rgba(0,0,0,0.45)",
    }}
  >
    Kitchen
  </h2>

  <p className="text-[8px] sm:text-[10px] text-gray-100 -mt-1 sm:mt-1 px-2 py-1 bg-teal-700/40 backdrop-blur-md rounded-full uppercase shadow-sm tracking-[0.18em] w-fit mx-auto">
    Yummy Food
  </p>

</div>
          </motion.div>
        </div>

        {/* Hero Section (UNCHANGED) */}
        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

          <div className="max-w-lg text-center md:text-left mx-auto md:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[22px] sm:text-3xl md:text-5xl font-semibold text-white leading-snug"
            >
              The ultimate <span className="text-teal-200/80 italic">taste </span>
              <br />
              of{" "}
              <span className="underline decoration-white/20 underline-offset-8">
                deliciousness
              </span>
            </motion.h2>

            <p className="text-gray-300 mt-4 md:mt-5 text-base md:text-lg leading-relaxed font-medium max-w-md">
              Satisfy your cravings with our chef's secret recipes. Every bite is a masterpiece of flavor and fresh ingredients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreClick}
                className="mt-6 px-8 py-4 md:px-10 md:py-5 bg-teal-600/30 text-white rounded-lg font-black hover:bg-teal-700 transition-all uppercase tracking-widest text-xs"
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

          {/* Image (UNCHANGED) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative block"
          >
            <div className="absolute inset-0 bg-teal-600/10 blur-[60px] md:blur-[80px] rounded-full scale-75" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative z-10 max-w-[280px] md:max-w-md mx-auto md:ml-auto"
            >
              <img
                src="/hero-food.png"
                alt="Signature Dish"
                className="w-full rounded-lg shadow-2xl border border-white/10"
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