import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/app";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// Context
import { CurrentUserProvider } from "./context/userContext";
import { CurrentAdminProvider } from "./context/adminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <CurrentUserProvider>
          <CurrentAdminProvider>
            <App />
          </CurrentAdminProvider>
        </CurrentUserProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
