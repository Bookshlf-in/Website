import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Login from "../Login/Login.js";
function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/Login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
