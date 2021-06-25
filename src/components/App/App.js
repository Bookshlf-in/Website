import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./App.css";
import Login from "../Login/Login.js";
import UserSignup from "../Signup/UserSignup.js";
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
import Track from "../UserProfile/OrderTracking.js";
import SellerProfile from "../SellerProfile/SellerProfile.js";
import SearchResult from "../SearchResult/SearchResult.js";
import BookDetails from "../BookDetails/BookDetails.js"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <Review />
            <Footer />
          </Route>
          <Route path="/Login" component={Login} />
          <Route path="/UserSignup" component={UserSignup} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/Verify" component={Verify} />
          <Route path="/About">
            <Navbar />
            <About />
            <Footer />
          </Route>
          <Route path="/Contact">
            <Navbar />
            <Contact />
          </Route>
          <Route path="/Cart">
            <Navbar />
            <Cart />
          </Route>
          <Route path="/Track">
            <Navbar />
            <Track />
          </Route>
          <Route path="/AddReview">
            <Navbar />
            <AddReviews />
          </Route>
          <Route path="/UserProfile">
            <Navbar />
            <UserProfile />
          </Route>
          <Route path="/SellerProfile">
            <Navbar />
            <SellerProfile />
          </Route>
          <Route path="/SearchResult">
            <Navbar />
            <SearchResult />
            <Footer />
          </Route>
          <Route path="/BookDetails">
            <Navbar />
            <BookDetails />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
