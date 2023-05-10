import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import ForgotPassword from "../components/Login/ForgotPassword";
import Signup from "../components/Signup/Signup";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import Wishlist from "../components/Cart/Wishlist";
import AddReviews from "../components/Reviews/AddReviews";
import UserProfile from "../components/UserProfile/UserProfile";
import Track from "../components/Order/OrderTracking";
import SellerPanel from "../components/SellerPanel/SellerPanel";
import UpdateOrder from "../components/Order/UpdateOrder";
import SearchResult from "../components/SearchResult/SearchPanel";
import BookDetails from "../components/BookDetails/BookDetails";
import Admin from "../components/AdminPanel/AdminPanel";
import Blog from "../components/Blog/Blog";
import AdminTrack from "../components/AdminPanel/Order/OrderTracking";
import SellerProfile from "../components/SellerPanel/SellerProfile";
import Wallet from "../components/Wallet/Wallet";
import Terms from "../components/Footer/Terms";
import BetaNotify from "../assets/components/BetaNotify";
import NotFoundPage from "../components/Home/NotFoundPage";

// external courier integrations
import ICarry from "../components/AdminPanel/CourierIntegrations/iCarry";
import Nimbuspost from "../components/AdminPanel/CourierIntegrations/Nimbuspost";
import EnviaShipping from "../components/AdminPanel/CourierIntegrations/enviaShipping";

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

          {/* External Courier Paths */}
          <Route path="/AdminCourier/Icarry/:orderId">
            <ICarry />
          </Route>
          <Route path="/AdminCourier/Nimbuspost/:orderId">
            <Nimbuspost />
          </Route>
          <Route path="/AdminCourier/EnviaShipping/:orderId">
            <EnviaShipping />
          </Route>
          {/* ========================= */}
          <Route path="/" component={Home} exact />
          <Route component={NotFoundPage} status={404} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
