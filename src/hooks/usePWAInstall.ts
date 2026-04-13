import { useEffect, useState } from "react";

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // IMPORTANT: show button anyway after short delay fallback
    const timer = setTimeout(() => {
      setCanInstall(true);
    }, 2000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      alert("Install not available in this browser. Use 'Add to Home Screen'");
      return;
    }

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
      setCanInstall(false);
    }
  };

  return { installApp, canInstall };
}