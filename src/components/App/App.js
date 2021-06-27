import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./App.css";
import Login from "../Login/Login";
import UserSignup from "../Signup/UserSignup";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Verify from "../VerifyAccount/Verify";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Cart from "../Cart/Cart";
import Review from "../Reviews/Reviews";
import AddReviews from "../AddReviews/AddReviews";
import UserProfile from "../UserProfile/UserProfile";
import Track from "../UserProfile/OrderTracking";
import SellerPanel from "../SellerPanel/SellerPanel";
import SearchResult from "../SearchResult/SearchResult";
import BookDetails from "../BookDetails/BookDetails"
import Carousel from "../carousel/Carousel";
import Categories from "../Categories/Categories";
import BestSelling from "../BestSelling/BestSelling";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <Carousel/>
            <Categories/>
            <BestSelling/>
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
          <Route path="/SellerPanel">
            <Navbar />
            <SellerPanel />
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
