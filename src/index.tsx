import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StepSelect } from "./screens/StepSelect";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <StepSelect />
  </StrictMode>,
);
