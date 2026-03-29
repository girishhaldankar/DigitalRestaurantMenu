import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app/App";
import MenuPreviewPage from "./app/MenuPreviewPage";
import AdminPage from "./app/pages/AdminPage";

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

      {/* 🔥 ADMIN PANEL */}
      <Route path="/admin" element={<AdminPage />} />

      {/* ✅ LEGAL PAGES (IMPORTANT FOR RAZORPAY) */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
    </Routes>
  </BrowserRouter>
);