import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app/App";
import MenuPreviewPage from "./app/MenuPreviewPage";

// 🔥 ADD THIS
import AdminPage from "./app/pages/AdminPage";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/menu-preview" element={<MenuPreviewPage />} />

      {/* 🔥 ADMIN PANEL ROUTE */}
      <Route path="/admin" element={<AdminPage />} />

    </Routes>
  </BrowserRouter>
);