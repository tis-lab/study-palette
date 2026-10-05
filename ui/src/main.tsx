import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CohortBuilder from "./CohortBuilder";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CohortBuilder />
  </StrictMode>,
);
