import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./Context/userContext";
import { CurrentFormProvider } from "./Context/formContext";
import HttpsRedirect from "react-https-redirect";
ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CurrentFormProvider>
        <HttpsRedirect>
          <App />
        </HttpsRedirect>
      </CurrentFormProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
