import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  BarChart3,
  Package,
  Settings,
  X,
  LogOut,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen, handleLogout }) {
  const links = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 }, // ✅ FIXED
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-white/10 shadow-xl transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 md:static z-30`}
    >
      <div className="flex flex-col h-full p-4">

        {/* 🔝 HEADER */}
       <div className="relative mb-6 px-2">

  {/* ❌ CLOSE BTN */}
  <button
    className="absolute right-2 top-2 md:hidden"
    onClick={() => setSidebarOpen(false)}
  >
    <X size={20} />
  </button>

  {/* 🔥 LOGO ROW */}
  <div className="flex items-center gap-3">

    {/* 🖼 LOGO */}
    <img
      src="/CIBOlogo.png"
      alt="CIBO Logo"
      className="w-18 h-18 object-contain drop-shadow-md"
    />

    {/* 🔤 TEXT */}
    <div className="leading-tight">
      <h1
        className="text-lg font-extrabold tracking-[0.15em]"
        style={{
          background: "linear-gradient(90deg, #4fd1c5, #2c7a7b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        CIBO
      </h1>

      <p
        className="text-xs text-gray-400 -mt-1"
        style={{ fontFamily: "'Allura', cursive" }}
      >
        Kitchen
      </p>
    </div>

  </div>

</div>

        {/* 🔗 NAV */}
        <nav className="flex-1 overflow-y-auto space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* 🚪 LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}