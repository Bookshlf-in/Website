import React from "react";
import { Link } from "react-router-dom";

const NavbarItems = () => {
  return (
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
  );
};

export default NavbarItems;
