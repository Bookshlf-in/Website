import { React } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./app.css";

// Components
import Navbar from "../components/navbar/navbar";
import Home from "../components/Home/Home";
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
import Notify from "../assets/components/notify";
import NotFoundPage from "../components/Home/NotFoundPage";

// external courier integrations
import ICarry from "../components/AdminPanel/CourierIntegrations/iCarry";
import Nimbuspost from "../components/AdminPanel/CourierIntegrations/Nimbuspost";
import EnviaShipping from "../components/AdminPanel/CourierIntegrations/enviaShipping";

import Router from "../route/router";

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {process.env.REACT_APP_NODE_ENV === "development" ? <Notify /> : null}
      {!location.pathname.startsWith("/Admin") && <Navbar />}
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Track/:orderId" element={<Track />} />
        <Route path="/AddReview/:orderId" element={<AddReviews />} />
        <Route path="/UserPanel/:panel" element={<UserProfile />} />
        <Route path="/SellerPanel/:panel" element={<SellerPanel />} />
        <Route path="/SellerBookUpdate/:bookId" element={<UpdateOrder />} />
        <Route path="/SearchResult/:query" element={<SearchResult />} />
        <Route path="/BookDetails/:bookId" element={<BookDetails />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Checkout/:type" element={<Checkout />} />
        <Route path="/AdminTrack/:orderId" element={<AdminTrack />} />
        <Route path="/Admin/:panel" element={<Admin />} />
        <Route path="/SellerProfile/:sellerId" element={<SellerProfile />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/TermsofUsePrivacyPolicy" element={<Terms />} />
        <Route path="/Wallet" element={<Wallet />} />
        <Route path="/AdminCourier/Icarry/:orderId" element={<ICarry />} />
        <Route
          path="/AdminCourier/Nimbuspost/:orderId"
          element={<Nimbuspost />}
        />
        <Route
          path="/AdminCourier/EnviaShipping/:orderId"
          element={<EnviaShipping />}
        />
        <Route path="/" element={<Home />} exact />
        <Route element={<NotFoundPage />} status={404} />
      </Routes>

      <Router />
    </div>
  );
};

export default App;
