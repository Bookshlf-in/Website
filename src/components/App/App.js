import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Carousel from "../Home/Carousel";
import Categories from "../Home/Categories";
import BestSelling from "../Home/BestSelling";
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
import Sitemap from "../Sitemap/Sitemap";
import Track from "../UserProfile/OrderTracking";
import SellerPanel from "../SellerPanel/SellerPanel";
import SearchResult from "../SearchResult/AllCategories";
import BookDetails from "../BookDetails/BookDetails";
import Admin from "../AdminPanel/AdminPanel";
import Blog from "../Blog/Blog";
import AdminBook from "../AdminPanel/BookDetails";
import AdminTrack from "../AdminPanel/OrderTracking";
import SellerProfile from "../SellerPanel/SellerProfile";

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
          <Route path="/SellerProfile/:sellerId">
            <Navbar />
            <SellerProfile />
          </Route>
          <Route path="/Blog">
            <Blog />
          </Route>
          <Route path="/Receipt">
            <Receipt />
          </Route>
          <Route path="/Sitemap">
            <Sitemap />
          </Route>

          <Route path="/">
            <Helmet>
              <title>Home | Bookshlf</title>
              <meta
                name="description"
                content="Bookshlf is a platform for students where you can buy secondhand books at low prices and sell books."
              />
            </Helmet>
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
