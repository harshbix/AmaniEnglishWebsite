import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { HelmetProvider } from "react-helmet-async";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
