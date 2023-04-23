import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

// Context
import { CurrentUserProvider } from "./context/userContext";
import { CurrentAdminProvider } from "./context/adminContext";
import { CurrentSearchProvider } from "./context/searchContext";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <CurrentSearchProvider>
        <CurrentUserProvider>
          <CurrentAdminProvider>
            <App />
          </CurrentAdminProvider>
        </CurrentUserProvider>
      </CurrentSearchProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
