import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// Context
import { CurrentUserProvider } from "./context/userContext";
import { CurrentAdminProvider } from "./context/adminContext";
import { CurrentSearchProvider } from "./context/searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <CurrentSearchProvider>
          <CurrentUserProvider>
            <CurrentAdminProvider>
              <App />
            </CurrentAdminProvider>
          </CurrentUserProvider>
        </CurrentSearchProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
