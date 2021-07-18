import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Carousel from "./Carousel";
import Categories from "./Categories";
import BestSelling from "./BestSelling";
import Review from "../Reviews/Reviews";
import Login from "../Login/Login";
import ForgotPassword from "../Login/ForgotPassword";
import UserSignup from "../Signup/UserSignup";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Cart from "../Cart/Cart";
import Checkout from "../Cart/Payment";
import Wishlist from "../Cart/Wishlist";
import AddReviews from "../AddReviews/AddReviews";
import UserProfile from "../UserProfile/UserProfile";
import Track from "../UserProfile/OrderTracking";
import SellerPanel from "../SellerPanel/SellerPanel";
import SearchResult from "../SearchResult/AllCategories";
import BookDetails from "../BookDetails/BookDetails";

// Protected Route
import Protected from "../Protected";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Protected" component={Protected} />
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={UserSignup} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
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
          <Route path="/Track/:orderId">
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
          </Route>
          <Route path="/BookDetails/:bookId">
            <Navbar />
            <BookDetails />
          </Route>
          <Route path="/Wishlist">
            <Navbar />
            <Wishlist />
          </Route>
          <Route path="/Checkout">
            <Navbar />
            <Checkout />
          </Route>
          <Route path="/">
            <Navbar />
            <Carousel />
            <Categories />
            <BestSelling />
            <Review />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
