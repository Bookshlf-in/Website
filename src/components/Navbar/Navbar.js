import { React, useState, useContext, useEffect } from "react";
import "./Navbar.css";
import NavbarMenu from "./NavMenu";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SideNav from "./Sidenav.js";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios.js";

const openNav = (e) => {
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [Search, setSearch] = useState("");

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push(`/SearchResult/${Search === "" ? "tag:ALL" : Search}`);
    }
  };

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
        <div className="navbar-items">
          <ul>
            <Link to="/">
              <li>
                <div className="navbar-items-chip">
                  <p>
                    <i className="fas fa-home" />
                    &nbsp;Home
                  </p>
                </div>
              </li>
            </Link>
            <Link to="/SearchResult/tag:ALL">
              <li>
                <div className="navbar-items-chip">
                  <div className="dropdown">
                    <button className="dropbtn">All Categories</button>
                  </div>
                </div>
              </li>
            </Link>
            <li>
              <div className="navbar-items-chip">
                <div className="dropdown">
                  <button className="dropbtn">
                    Other&nbsp;
                    <i className="fas fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="/Contact">Contact Us</Link>
                    <Link to="/SellerPanel">Sell Old Books</Link>
                    <Link to="/Blog">Blog (Coming Soon)</Link>
                  </div>
                </div>
              </div>
            </li>
            <Link to="/SellerPanel/5">
              <li>
                <div className="navbar-items-chip">
                  <p>
                    <i className="fas fa-book" />
                    &nbsp;Sell Your Books
                  </p>
                </div>
              </li>
            </Link>
            <Link to="/About">
              <li>
                <div className="navbar-items-chip">
                  <p>
                    <i className="fas fa-info-circle" />
                    &nbsp;AboutUs
                  </p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            <li>
              <div className="navbar-items-chip">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
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
}
export default Navbar;
