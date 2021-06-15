import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Login from "../Login/Login.js";
import Signup from "../Signup/Signup.js";
import ForgotPassword from "../ForgotPassword/ForgotPassword.js";
import Verify from "../VerifyAccount/Verify.js";
import Navbar from "../Navbar/Navbar.js";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";
import Reviews from "../Reviews/Reviews";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/Verify" component={Verify} />
        <Route path="/Reviews" component={Reviews}/>
        <div className="temp-nav">
          <ul>
            <Link to="/Login">
              <li>Login</li>
            </Link>
            <Link to="/Signup">
              <li>Signup</li>
            </Link>
            <Link to="/ForgotPassword">
              <li>ForgotPassword</li>
            </Link>
            <Link to="/Verify">
              <li>Verify Account</li>
            </Link>
            <Link to="/Reviews">
              <li>Reviews</li>
            </Link>
          </ul>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
