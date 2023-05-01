import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "../components/v1/Navbar/Navbar";
import Home from "../components/v1/Home/Home";
import Login from "../components/v1/Login/Login";
import ForgotPassword from "../components/v1/Login/ForgotPassword";
import Signup from "../components/v1/Signup/Signup";
import About from "../components/v1/About/About";
import Contact from "../components/v1/Contact/Contact";
import Cart from "../components/v1/Cart/Cart";
import Checkout from "../components/v1/Checkout/Checkout";
import Wishlist from "../components/v1/Cart/Wishlist";
import AddReviews from "../components/v1/Reviews/AddReviews";
import UserProfile from "../components/v1/UserProfile/UserProfile";
import Track from "../components/v1/Order/OrderTracking";
import SellerPanel from "../components/v1/SellerPanel/SellerPanel";
import UpdateOrder from "../components/v1/Order/UpdateOrder";
import SearchResult from "../components/v1/SearchResult/SearchPanel";
import BookDetails from "../components/v1/BookDetails/BookDetails";
import Admin from "../components/v1/AdminPanel/AdminPanel";
import Blog from "../components/v1/Blog/Blog";
import AdminTrack from "../components/v1/AdminPanel/Order/OrderTracking";
import SellerProfile from "../components/v1/SellerPanel/SellerProfile";
import Wallet from "../components/v1/Wallet/Wallet";
import Terms from "../components/v1/Footer/Terms";
import BetaNotify from "../assets/components/BetaNotify";
import NotFoundPage from "../components/v1/Home/NotFoundPage";

// external courier integrations
import ICarry from "../components/v1/AdminPanel/CourierIntegrations/iCarry";
import Nimbuspost from "../components/v1/AdminPanel/CourierIntegrations/Nimbuspost";
import EnviaShipping from "../components/v1/AdminPanel/CourierIntegrations/enviaShipping";

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
