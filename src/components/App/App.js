import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Receipt from "../UserProfile/Receipt";
import Track from "../UserProfile/OrderTracking";
import SellerPanel from "../SellerPanel/SellerPanel";
import SearchResult from "../SearchResult/AllCategories";
import BookDetails from "../BookDetails/BookDetails";
import Admin from "../AdminPanel/AdminPanel";
import Blog from "../Blog/Blog";
import AdminBook from "../AdminPanel/BookDetails";
import AdminTrack from "../AdminPanel/OrderTracking";
import * as ROUTES from "../../constants/routes";

// Protected Route
import Protected from "../Protected";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={ROUTES.PROTECTED} component={Protected} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={UserSignup} />
          <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={ROUTES.ABOUT}>
            <Navbar />
            <About />
          </Route>
          <Route path={ROUTES.CONTACT}>
            <Navbar />
            <Contact />
          </Route>
          <Route path={ROUTES.CART}>
            <Navbar />
            <Cart />
          </Route>
          <Route path="/Track/:orderId">
            <Navbar />
            <Track />
          </Route>
          <Route path="/AddReview/:orderId">
            <Navbar />
            <AddReviews />
          </Route>
          <Route path="/UserProfile/:panel">
            <Navbar />
            <UserProfile />
          </Route>
          <Route path="/SellerPanel/:panel">
            <Navbar />
            <SellerPanel />
          </Route>
          <Route path="/SearchResult/:query">
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
          <Route path="/Checkout/:type">
            <Navbar />
            <Checkout />
          </Route>
          <Route path="/AdminBook/:bookId">
            <AdminBook />
          </Route>
          <Route path="/AdminTrack/:orderId">
            <AdminTrack />
          </Route>
          <Route path="/Admin/:panel">
            <Admin />
          </Route>
          <Route path={ROUTES.BLOG}>
            <Blog />
          </Route>
          <Route path={ROUTES.RECEIPT}>
            <Receipt />
          </Route>
          <Route path={ROUTES.HOME}>
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
