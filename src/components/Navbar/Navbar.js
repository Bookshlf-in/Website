import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SideNav from "../Sidenav/Sidenav.js";

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  console.log("Clicked");
}

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="main-navbar" id="main-navbar">
      {/* navbar container starts */}
      <div className="navbar-container">
        <span onClick={openNav} className="Sidenav-open">
          <i className="fas fa-bars"></i>
        </span>
        <SideNav />
        {/* navbar logo */}
        <div className="navbar-logo">
          <img
            src="./images/logo[800x150].png"
            alt="Bookshlf"
            height="50px"
            width="284px"
          />
        </div>
        {/* navbar items */}
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
            <Link to="/">
              <li>
                <div className="navbar-items-chip">
                  <div className="dropdown">
                    <button className="dropbtn">
                      Categories&nbsp;
                      <i className="fas fa-caret-down" />
                    </button>
                    <div className="dropdown-content">
                      <Link to="">JEE Mains</Link>
                      <Link to="">JEE Advanced</Link>
                      <Link to="">NEET</Link>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
            <Link to="/">
              <li>
                <div className="navbar-items-chip">
                  <div className="dropdown">
                    <button className="dropbtn">
                      Other&nbsp;
                      <i className="fas fa-caret-down" />
                    </button>
                    <div className="dropdown-content">
                      <Link to="/Contact">Contact Us</Link>
                      <Link to="">Sell Old Books</Link>
                      <Link to="">Blog</Link>
                    </div>
                  </div>
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
                <div className="navbar-items-chip-searchbox">
                  <input type="text" />
                  <Link to="/SearchResult">
                    <div className="navbar-searchbox-submit">
                      <img
                        src="./images/loupe.svg"
                        alt="search"
                        height="20px"
                        width="20px"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <Link to="/Cart" className="cart-icon">
                  <i className="fas fa-shopping-cart" />
                </Link>
                <p className="Cart-items-notify-bubble">2</p>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <div>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <img
                      src="./images/user.svg"
                      alt="My Account"
                      height="30px"
                      width="30px"
                    />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
