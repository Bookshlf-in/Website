import { React, useState, useContext } from "react";
import "./Sidenav.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import SideNavLink from "./SideNavLink";

export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const Sidenav = () => {
  const history = useHistory();
  const [Search, setSearch] = useState("");
  const [user] = useContext(UserContext);
  const CartItems = "Cart(" + user?.cartitems + ")";

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      history.push(`/SearchResult/${Search === "" ? "tag:ALL" : Search}`);
    }
  };

  return (
    <div className="main-sidenav">
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
    </div>
  );
};

export default Sidenav;
