import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Login from "../Login/Login.js";
import Signup from "../Signup/Signup.js";
import ForgotPassword from "../ForgotPassword/ForgotPassword.js";
import Verify from "../VerifyAccount/Verify.js";
import Navbar from "../Navbar/Navbar.js";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer.js";
import About from "../About/About.js";
import Contact from "../Contact/Contact.js";
import Cart from "../Cart/Cart.js";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={Signup} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/Verify" component={Verify} />
          <Route path="/About" component={About} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Cart" component={Cart} />
        </Switch>

        {/* <div className="temp-nav">
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
          </ul>
        </div> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
