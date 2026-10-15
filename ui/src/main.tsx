import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CohortBuilder from "./CohortBuilder";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CohortBuilder />
  </StrictMode>,
);
