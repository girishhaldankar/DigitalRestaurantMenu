import { Bell } from "lucide-react";

export default function NotificationBell() {
  const notifications = 3; // example

  return (
    <div className="relative cursor-pointer">
      <Bell size={24} />
      {notifications > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {notifications}
        </span>
      )}
    </div>
  );
}