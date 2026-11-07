import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./meridian-sync.css";
import "./product-system.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
