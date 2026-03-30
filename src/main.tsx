import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app/App";
import MenuPreviewPage from "./app/MenuPreviewPage";
import AdminPage from "./app/pages/AdminPage";

import AdminLogin from "./app/pages/AdminLogin";
import ProtectedRoute from "./app/components/ProtectedRoute";


// ✅ ADD THESE
import PrivacyPolicy from "./app/pages/PrivacyPolicy";
import Terms from "./app/pages/Terms";
import RefundPolicy from "./app/pages/RefundPolicy";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/menu-preview" element={<MenuPreviewPage />} />

      {/* ✅ LOGIN */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* 🔐 PROTECTED ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* ✅ LEGAL PAGES (IMPORTANT FOR RAZORPAY) */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
    </Routes>
  </BrowserRouter>
);