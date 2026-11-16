// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
  
// )
// const loader = document.getElementById("first-loader");
// if (loader) {
//   loader.style.display = "none";
// }
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.min.css";
import "./assets/css/ainex-icons.css";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

// Pre-rendered pages (scripts/prerender.mjs) and the server (backend/utils/seoMeta.js)
// put per-page meta tags in the HTML for crawlers. Helmet renders its own once
// React mounts, so drop these to avoid duplicates.
document.querySelectorAll("[data-seo-prerender]").forEach((el) => el.remove());

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HelmetProvider>
);

window.addEventListener("load", () => {
  const loader = document.getElementById("first-loader");
  if (loader) {
    loader.style.display = "none";
  }
});
