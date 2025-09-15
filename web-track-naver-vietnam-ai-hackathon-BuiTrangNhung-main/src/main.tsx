import React from "react"; // ✅ Bắt buộc phải có dòng này nếu dùng <React.StrictMode>
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ActivityProvider } from "./context/ActivityProvider";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </React.StrictMode>
);
