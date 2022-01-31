import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Login from "../Login/Login";
import ForgotPassword from "../Login/ForgotPassword";
import Signup from "../Signup/Signup";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Cart from "../Cart/Cart";
import Checkout from "../Cart/Checkout";
import Wishlist from "../Cart/Wishlist";
import AddReviews from "../Reviews/AddReviews";
import UserProfile from "../UserProfile/UserProfile";
import Track from "../Order/OrderTracking";
import SellerPanel from "../SellerPanel/SellerPanel";
import UpdateOrder from "../Order/UpdateOrder";
import SearchResult from "../SearchResult/SearchPanel";
import BookDetails from "../BookDetails/BookDetails";
import Admin from "../AdminPanel/AdminPanel";
import Blog from "../Blog/Blog";
import AdminBook from "../AdminPanel/BookDetails";
import AdminTrack from "../AdminPanel/OrderTracking";
import SellerProfile from "../SellerPanel/SellerProfile";
import Wallet from "../Wallet/Wallet";
import Terms from "../Footer/Terms";
import BetaNotify from "./BetaNotify";
import NotFoundPage from "../Home/NotFoundPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        {process.env.REACT_APP_NODE_ENV === "development" ? (
          <BetaNotify />
        ) : null}
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/PasswordRecovery">
            <ForgotPassword />
          </Route>
          <Route path="/Signup" component={Signup} />
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
          <Route path="/UserPanel/:panel">
            <Navbar />
            <UserProfile />
          </Route>
          <Route path="/SellerPanel/:panel">
            <Navbar />
            <SellerPanel />
          </Route>
          <Route path="/SellerBookUpdate/:bookId">
            <Navbar />
            <UpdateOrder />
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
          <Route path="/Admin/:panel/:subpanel">
            <Admin />
          </Route>
          <Route path="/SellerProfile/:sellerId">
            <Navbar />
            <SellerProfile />
          </Route>
          <Route path="/Blog">
            <Navbar />
            <Blog />
          </Route>
          <Route path="/TermsofUsePrivacyPolicy">
            <Terms />
          </Route>
          <Route path="/Wallet">
            <Navbar />
            <Wallet />
          </Route>
          <Route path="/" component={Home} exact />
          <Route component={NotFoundPage} status={404} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
