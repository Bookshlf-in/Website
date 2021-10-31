import { React, useContext, useEffect } from "react";

// importing Navbar Components
import "./Navbar.css";
import NavbarMenu from "./NavMenu";
import NavbarItems from "./NavbarItems";
import NavbarSearch from "./NavbarSearch";
import SideNav from "./Sidenav.js";

import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

// importing Material UI components
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";

import axios from "../../axios.js";

const openNav = () => {
  document.getElementById("mySidenav").style.width = "300px";
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    fontFamily: "PT sans",
  },
}))(Badge);

const Navbar = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

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
              <div className="navbar-items-chip">
                <NavbarSearch />
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <Link to="/Cart" className="cart-icon">
                  <IconButton aria-label="cart">
                    <StyledBadge
                      badgeContent={user?.cartitems}
                      color="secondary"
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <Link to="/Wishlist" className="cart-icon">
                  <IconButton aria-label="cart">
                    <StyledBadge
                      badgeContent={user?.wishlist}
                      color="secondary"
                    >
                      <FavoriteIcon color="error" />
                    </StyledBadge>
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
                <StyledBadge badgeContent={user?.cartitems} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
