import { Routes, Route } from "react-router-dom";

// USER
import UserApp from "../app/user/UserApp";

// ADMIN
import AdminLayout from "../app/admin/components/AdminLayout";
import Dashboard from "../app/admin/pages/Dashboard";
import Orders from "../app/admin/pages/Orders";
import Reports from "../app/admin/pages/Reports";
import Products from "../app/admin/pages/Products";
import Settings from "../app/admin/pages/Settings";

// AUTH
import ProtectedRoute from "../app/admin/components/ProtectedRoute";
import AdminLogin from "../app/admin/pages/AdminLogin";


import CustomerLogin from "../app/user/pages/CustomerLogin";
import CustomerRegister from "../app/user/pages/CustomerRegister";

// USER PAGES (IMPORTANT)
import TrackOrder from "../app/user/pages/TrackOrder";
import BillPage from "../app/user/pages/BillPage";

export default function App() {
  return (
    <Routes>

      {/* ✅ THESE MUST BE OUTSIDE UserApp */}
      <Route path="/bill/:id" element={<BillPage />} />
      <Route path="/track/:id" element={<TrackOrder />} />

      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/customer-register" element={<CustomerRegister />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reports" element={<Reports />} />
        <Route path="products" element={<Products />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* USER LAST */}
      <Route path="/*" element={<UserApp />} />

    </Routes>
  );
}