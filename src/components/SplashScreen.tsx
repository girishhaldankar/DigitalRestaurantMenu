import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#114041] text-white overflow-hidden">

      {/* 🔥 ZOOM IN + SETTLE */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.1, 1], opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="flex flex-row items-center gap-2"
      >
        {/* LOGO */}
        <img
          src="/CIBOlogo.png"
          alt="CIBO Logo"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xl"
        />

        {/* TEXT */}
        <div className="flex flex-col leading-none">
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-[0.16em]"
            style={{
              background: "linear-gradient(90deg, #4fd1c5, #2c7a7b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CIBO
          </h1>

           <h2
                className="text-4xl sm:text-5xl text-black -mt-5 ml-2 z-50 tracking-tighter"
                style={{
                  fontFamily: "'Allura', cursive",
                  textShadow: "0 0 8px rgba(255,255,255,0.55), 0 2px 10px rgba(0,0,0,0.45)",
                }}
              >
                Kitchen
              </h2>

          <p className="text-[9px] sm:text-[11px] text-gray-100 mt-1 px-3 py-1 bg-teal-600/40 backdrop-blur-md rounded-full uppercase shadow-sm tracking-[0.18em]">
            Yummy Food
          </p>
        </div>
      </motion.div>

      {/* 🔥 loading dots */}
      <motion.div
        className="absolute bottom-16 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
        <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
      </motion.div>

    </div>
  );
}