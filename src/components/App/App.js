import { React, useEffect, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios";
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
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get("/getUserProfile")
        .then((response) => {
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({ ...user, roles: response.data.roles })
          );
          setUser({ ...user, roles: response.data.roles });
        })
        .catch((error) => {
          setUser(null);
          localStorage.removeItem("bookshlf_user");
          delete axios.defaults.headers.common["Authorization"];
          history.go(0);
        });
    }
    if (sessionStorage.getItem("bookshlf_beta_notify")) {
      setOpen(false);
    } else {
      sessionStorage.setItem("bookshlf_beta_notify", true);
      setOpen(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {process.env.REACT_APP_NODE_ENV === "development" && open ? (
          <BetaNotify />
        ) : null}
        <Navbar />
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/PasswordRecovery">
            <ForgotPassword />
          </Route>
          <Route path="/Signup" component={Signup} />
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/Cart">
            <Cart />
          </Route>
          <Route path="/Track/:orderId">
            <Track />
          </Route>
          <Route path="/AddReview/:orderId">
            <AddReviews />
          </Route>
          <Route path="/UserPanel/:panel">
            <UserProfile />
          </Route>
          <Route path="/SellerPanel/:panel">
            <SellerPanel />
          </Route>
          <Route path="/SellerBookUpdate/:bookId">
            <UpdateOrder />
          </Route>
          <Route path="/SearchResult/:query">
            <SearchResult />
          </Route>
          <Route path="/BookDetails/:bookId">
            <BookDetails />
          </Route>
          <Route path="/Wishlist">
            <Wishlist />
          </Route>
          <Route path="/Checkout/:type">
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
            <SellerProfile />
          </Route>
          <Route path="/Blog">
            <Blog />
          </Route>
          <Route path="/TermsofUsePrivacyPolicy">
            <Terms />
          </Route>
          <Route path="/Wallet">
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
