import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./App.css";
import Login from "../Login/Login.js";
import Signup from "../Signup/Signup.js";
import ForgotPassword from "../ForgotPassword/ForgotPassword.js";
import Verify from "../VerifyAccount/Verify.js";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import About from "../About/About.js";
import Contact from "../Contact/Contact.js";
import Cart from "../Cart/Cart.js";
import Review from "../Reviews/Reviews.js";
import AddReviews from "../AddReviews/AddReviews.js";
import UserProfile from "../UserProfile/UserProfile.js";
import SellerProfile from "../SellerProfile/SellerProfile.js";
import SearchResult from "../SearchResult/SearchResult.js";
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
          <Route path="/Review" component={Review} />
          <Route path="/AddReview" component={AddReviews} />
          <Route path="/UserProfile" component={UserProfile} />
          <Route path="/SellerProfile" component={SellerProfile} />
          <Route path="/SearchResult" component={SearchResult} />
        </Switch>
        <Review />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
