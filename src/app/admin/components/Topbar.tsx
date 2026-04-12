import NotificationBell from "./NotificationBell";

export default function Topbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <NotificationBell />
        {/* Add Profile avatar here if needed */}
      </div>
    </div>
  );
}