import { React, useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios";
import "./App.css";

// Components
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Carousel from "../Home/Carousel";
import Categories from "../Home/Categories";
import Review from "../Reviews/CustomerReviews";
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
import Sitemap from "../Sitemap/Sitemap";
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

const App = () => {
  const [user, setUser] = useContext(UserContext);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    axios
      .get("/getUserProfile")
      .then((response) => {
        // User Registered
        // Updating Roles
        // console.log(response.data.roles);
        localStorage.setItem(
          "bookshlf_user",
          JSON.stringify({ ...user, roles: response.data.roles })
        );
        setUser({ ...user, roles: response.data.roles });
        if (sessionStorage.getItem("bookshlf_beta_notify")) {
          setOpen(false);
        } else {
          sessionStorage.setItem("bookshlf_beta_notify", true);
          setOpen(true);
        }
      })
      .catch((error) => {
        // Token Expired or Using Incognito or Not Registered
        setUser(null);
        localStorage.removeItem("bookshlf_user");
        delete axios.defaults.headers.common["Authorization"];
        // console.log(error.response.data);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        {process.env.REACT_APP_NODE_ENV === "development" && open ? (
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
          <Route path="/Sitemap">
            <Sitemap />
          </Route>
          <Route path="/TermsofUse&PrivacyPolicy">
            <Terms />
          </Route>
          <Route path="/Wallet">
            <Navbar />
            <Wallet />
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
            <Review />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
