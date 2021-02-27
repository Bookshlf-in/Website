import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Login from "../Login/Login.js";
import Signup from "../Signup/Signup.js";
import {Link} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <div className="temp-nav">
          <ul>
            <Link to="/Login">
              <li>Login</li>
            </Link>
            <Link to="/Signup">
              <li>Signup</li>
            </Link>
            <Link to="/">
              <li>Home</li>
            </Link>
          </ul>
        </div>
      </div>
    </Router>
  );
}

export default App;
