import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

// Context
import { CurrentUserProvider } from "./Context/userContext";
import { CurrentAdminProvider } from "./Context/adminContext";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <CurrentUserProvider>
        <CurrentAdminProvider>
          <App />
        </CurrentAdminProvider>
      </CurrentUserProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
