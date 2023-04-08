import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

// Context
import { CurrentUserProvider } from "./Context/userContext";
import { CurrentAdminProvider } from "./Context/adminContext";
import { CurrentSearchProvider } from "./Context/searchContext";

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
