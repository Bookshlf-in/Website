import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./Context/userContext";
import { CurrentFormProvider } from "./Context/formContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CurrentFormProvider>
        <App />
      </CurrentFormProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
