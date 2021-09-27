import {React, useState, useContext} from "react";
import "./Sidenav.css";
import {Link} from "react-router-dom";
import SideNavLink from "./SideNavLink";
import {UserContext} from "../../Context/userContext";

export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const Sidenav = () => {
  const [Search, setSearch] = useState("");
  const [user] = useContext(UserContext);

  return (
    <div className="main-sidenav">
      <div id="mySidenav" className="sidenav">
        <span className="closebtn" onClick={closeNav}>
          &times;
        </span>
        <div className="sidenav-searchbar Profile">
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <SideNavLink
            to={`/SearchResult/${Search === "" ? "books" : Search}`}
            iconClass="fas fa-search"
          />
        </div>
        <SideNavLink to="/" label="Home" iconClass="fas fa-home" />
        <SideNavLink
          to="/UserProfile/1"
          label="Profile"
          iconClass="fas fa-user-circle"
          isProfile={true}
        />
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
          <SideNavLink
            to="/Cart"
            iconClass="fas fa-shopping-cart"
            label="Cart"
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
          to="/Contribute"
          iconClass="fas fa-hands-helping"
          label="Contribute"
        />
        <SideNavLink to="/Blog" iconClass="fab fa-blogger" label="Blog" />
        <SideNavLink to="/Contact" iconClass="fas fa-headset" label="Contact" />
        <SideNavLink to="/About" iconClass="fas fa-info-circle" label="About" />
      </div>
    </div>
  );
};

export default Sidenav;
