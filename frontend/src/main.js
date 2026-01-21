import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { HelmetProvider } from "react-helmet-async";
const root = createRoot(document.getElementById("root"));
root.render(_jsx(StrictMode, { children: _jsx(HelmetProvider, { children: _jsx(App, {}) }) }));
