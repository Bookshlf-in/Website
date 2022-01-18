import { React, useState, useContext, useEffect } from "react";

// importing Navbar Components
import "./Navbar.css";
import NavbarMenu from "./NavMenu";
import NavbarItems from "./NavbarItems";
// import NavbarSearch from "./NavbarSearch";
import SideNav from "./Sidenav.js";

import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

// importing Material UI components
import { Button, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import axios from "../../axios.js";

const openNav = () => {
  document.getElementById("mySidenav").style.width = "300px";
};

const Navbar = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [walletbalance, setwalletbalance] = useState(0);

  useEffect(() => {
    if (user) {
      axios
        .get("/countWishlistItems")
        .then((response) => {
          // console.log(response);
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: user.cartitems,
              wishlist: response.data.count,
            })
          );
          setUser({
            authHeader: user.authHeader,
            roles: user.roles,
            email: user.email,
            cartitems: user.cartitems,
            wishlist: response.data.count,
          });
        })
        .catch((error) => {});
      axios
        .get("/countCartItems")
        .then((response) => {
          // console.log(response.data);
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: response.data.count,
              wishlist: user.wishlist,
            })
          );
          setUser({
            authHeader: user.authHeader,
            roles: user.roles,
            email: user.email,
            cartitems: response.data.count,
            wishlist: user.wishlist,
          });
        })
        .catch((error) => {});
      axios
        .get("/getCurrentBalance")
        .then((response) => {
          // console.log(response.data);
          setwalletbalance(response.data.walletBalance);
        })
        .catch((error) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-navbar" id="main-navbar">
      {/* navbar container starts */}
      <div className="navbar-container">
        <span onClick={(e) => openNav(e)} className="Sidenav-open">
          <i className="fas fa-bars"></i>
        </span>
        <SideNav />
        <div className="navbar-logo">
          <img
            src="/images/logo.png"
            alt="Bookshlf"
            height="25px"
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
        <NavbarItems />
        <div className="navbar-right">
          <ul>
            <li>
              <div className="navbar-items-chip">{/* <NavbarSearch /> */}</div>
            </li>
            {user ? (
              user.roles.includes("seller") ? (
                <li>
                  <div className="navbar-items-chip">
                    <Link to="/Wallet" className="cart-icon">
                      <IconButton aria-label="wallet">
                        <Badge
                          badgeContent={walletbalance}
                          color="secondary"
                          max={2000}
                        >
                          <AccountBalanceWalletIcon />
                        </Badge>
                      </IconButton>
                    </Link>
                  </div>
                </li>
              ) : null
            ) : null}
            <li>
              <div className="navbar-items-chip">
                <Link to="/Cart" className="cart-icon">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={user?.cartitems} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <Link to="/Wishlist" className="cart-icon">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={user?.wishlist} color="secondary">
                      <FavoriteIcon color="error" />
                    </Badge>
                  </IconButton>
                </Link>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                {user === null ? (
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                        fontSize: "12px",
                        backgroundColor: "rgb(21, 168, 5)",
                        color: "whitesmoke",
                      }}
                      onClick={() => {
                        history.push("/Login");
                      }}
                    >
                      Login
                    </Button>
                  </div>
                ) : (
                  <NavbarMenu />
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="mobile-cart">
          <div className="navbar-items-chip">
            <Link to="/Cart" className="cart-icon">
              <IconButton aria-label="cart">
                <Badge badgeContent={user?.cartitems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
