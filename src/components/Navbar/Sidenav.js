import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

import "./Sidenav.css";

// Components
import { Stack, Divider } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import AllBookIcon from "@mui/icons-material/Language";
import BookIcon from "@mui/icons-material/MenuBookRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import SupportIcon from "@mui/icons-material/SupportAgentRounded";
import CartIcon from "@mui/icons-material/ShoppingCart";
import WishlistIcon from "@mui/icons-material/Favorite";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GitHubIcon from "@mui/icons-material/GitHub";

// Custom Menu Item Stack
const MenuStack = (props) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        background: props.title
          ? "linear-gradient(90deg, rgb(17, 16, 16) 0%, rgb(63, 62, 62) 100%)"
          : "white",
        padding: "10px 16px",
        width: "100%",
        "& svg": {
          height: 25,
          width: 25,
        },
        "& img": {
          height: 25,
        },
        "& div": {
          fontFamily: "PT sans",
          fontSize: "14px",
          color: "rgba(0,0,0,0.8)",
        },
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        {props.title ? <img src={props.icon} /> : props.icon}
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        {props.label}
      </Stack>
    </Stack>
  );
};

const Sidenav = () => {
  const [user] = useContext(UserContext);

  return (
    <Stack className="main-sidenav" spacing={0} sx={{ minWidth: 200 }}>
      <Link to="/">
        <MenuStack title={true} icon={"/images/logo.png"} label="" />
      </Link>
      <Link to="/">
        <MenuStack icon={<HomeIcon color="primary" />} label="Home" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/SearchResult/tag:ALL">
        <MenuStack icon={<AllBookIcon color="primary" />} label="All Books" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/SellerPanel/5">
        <MenuStack icon={<BookIcon color="success" />} label="Sell Books" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Cart">
        <MenuStack icon={<CartIcon color="secondary" />} label="Cart" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Wishlist">
        <MenuStack icon={<WishlistIcon color="secondary" />} label="Wishlist" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Wallet">
        <MenuStack icon={<WalletIcon color="secondary" />} label="Wallet" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link
        to={{
          pathname: "https://github.com/Bookshlf-in",
        }}
        target="_blank"
      >
        <MenuStack icon={<GitHubIcon color="default" />} label="Contribute" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/About">
        <MenuStack icon={<InfoIcon color="info" />} label="About Us" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Contact">
        <MenuStack icon={<SupportIcon color="warning" />} label="Contact Us" />
      </Link>
    </Stack>
  );
};

export default Sidenav;

/*
 <div id="mySidenav" className="sidenav">
        <span className="closebtn" onClick={closeNav}>
          &times;
        </span>
        <div className="sidenav-searchbar Profile">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={_handleKeyDown}
          />
          <SideNavLink
            to={`/SearchResult/${Search === "" ? "books" : Search}`}
            iconClass="fas fa-search"
          />
        </div>
        <SideNavLink to="/" label="Home" iconClass="fas fa-home" />

        {user ? (
          <SideNavLink
            to="/UserProfile/1"
            label="Profile"
            iconClass="fas fa-user-circle"
            isProfile={true}
          />
        ) : (
          <></>
        )}

        {user ? (
          <SideNavLink to="/" iconClass="fas fa-sign-out-alt" label="Logout" />
        ) : (
          <SideNavLink
            to="/Login"
            iconClass="fas fa-sign-in-alt"
            label="Login"
          />
        )}
        {user ? (
          <></>
        ) : (
          <SideNavLink
            to="/Signup"
            iconClass="fas fa-user-plus"
            label="Create Account"
          />
        )}
        {user ? (
          user.roles.includes("seller") ? (
            <SideNavLink
              to="/Wallet"
              iconClass="fas fa-wallet"
              label="Wallet"
            />
          ) : null
        ) : null}
        {user ? (
          <SideNavLink
            to="/Cart"
            iconClass="fas fa-shopping-cart"
            label={CartItems}
          />
        ) : (
          <></>
        )}
        {user ? (
          <SideNavLink
            to="/Wishlist"
            iconClass="far fa-heart"
            label="Wishlist"
          />
        ) : (
          <></>
        )}
        <SideNavLink
          to="/SearchResult/books"
          label="All Categories"
          iconClass="fas fa-angle-right"
        />
        {user ? (
          <SideNavLink
            to="/SellerPanel/5"
            iconClass="fas fa-book"
            label="Sell Your Books"
          />
        ) : (
          <></>
        )}
        <SideNavLink
          to="https://github.com/Bookshlf-in/Website"
          iconClass="fas fa-hands-helping"
          label="Contribute"
        />
        <SideNavLink to="/Blog" iconClass="fab fa-blogger" label="Blog" />
        <SideNavLink to="/Contact" iconClass="fas fa-headset" label="Contact" />
        <SideNavLink to="/About" iconClass="fas fa-info-circle" label="About" />
      </div>
*/
