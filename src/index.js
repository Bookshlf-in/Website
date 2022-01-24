import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./Context/userContext";
import { HelmetProvider } from "react-helmet-async";
ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
