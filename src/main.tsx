// main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// 🟢 IMPORT APP
import App from "./app/App";

// 🟢 IMPORT GLOBAL CSS (Tailwind or custom)
import "./styles/index.css"; // <-- make sure this path is correct

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);