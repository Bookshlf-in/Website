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
              <p>
                <i className="fas fa-globe"></i>
                &nbsp;All Books
              </p>
            </div>
          </li>
        </Link>
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
        <Link to="/Contact">
          <li>
            <div className="navbar-items-chip">
              <p>
                <i className="fas fa-headset" />
                &nbsp;Contact Us
              </p>
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavbarItems;
