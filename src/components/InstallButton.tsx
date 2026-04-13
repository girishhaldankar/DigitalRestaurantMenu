import { usePWAInstall } from "../hooks/usePWAInstall";
import { Download } from "lucide-react";

export function InstallButton() {
  const { installApp, canInstall } = usePWAInstall();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={installApp}
        className="
          flex items-center gap-2
          px-4 py-2
          text-xs sm:text-sm
          rounded-full
          bg-white/10 backdrop-blur-xl
          border border-white/20
          text-white
          shadow-lg
          hover:bg-white/20
          transition
        "
      >
        <Download size={16} className="opacity-90" />
        Install App
      </button>
    </div>
  );
}