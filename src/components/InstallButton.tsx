import { usePWAInstall } from "../hooks/usePWAInstall";

export function InstallButton() {
  const { installApp, canInstall } = usePWAInstall();

  if (!canInstall) return null;

  return (
    <button
      onClick={installApp}
      className="fixed bottom-4 right-4 bg-green-600/80 text-white px-4 py-2 rounded-xl shadow-lg"
    >
      Install App 📲
    </button>
  );
}