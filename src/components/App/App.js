import React, {useState, useEffect} from "react";
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
import Display from "../DisplayReview/Display";

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
          <Route path="/Display" component={Display} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
