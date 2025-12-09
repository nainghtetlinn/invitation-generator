import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { Download } from "./Download.tsx";
import "./index.css";
import { Layout } from "./Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<App />}
          />
          <Route
            path="/download"
            element={<Download />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
