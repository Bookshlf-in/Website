import React from "react";
import "./Sidenav.css";
import {Link} from "react-router-dom";

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function Sidenav() {
  return (
    <div className="main-sidenav">
      <div id="mySidenav" className="sidenav">
        <Link to="" className="closebtn" onClick={closeNav}>
          &times;
        </Link>
        <Link to="">
          <i className="fas fa-home"></i>&nbsp;Home
        </Link>
        {/* hidden until screen size is smaller than 650px */}
        <Link to="" className="Profile">
          <input type="text" style={{width: "150px", height: "40px"}} />
          &nbsp;<i className="fas fa-search"></i>
        </Link>
        <Link to="" className="Profile">
          Profile&nbsp;<i className="fas fa-user-circle"></i>
        </Link>
        <Link className="Profile" to="/Cart">
          Cart&nbsp;<i className="fas fa-shopping-cart"></i>
        </Link>
        {/* ends here */}
        <Link to="">
          Categories&nbsp;<i className="fas fa-angle-right"></i>
        </Link>
        <Link to="">
          Contribute&nbsp;<i className="fas fa-hands-helping"></i>
        </Link>
        <Link to="">
          Blog&nbsp;<i className="fab fa-blogger"></i>
        </Link>
        <Link to="/Contact">
          Contact&nbsp;Us&nbsp;<i className="fas fa-headset"></i>
        </Link>
        <Link to="">
          About&nbsp;Us&nbsp;<i className="fas fa-info-circle"></i>
        </Link>
      </div>
    </div>
  );
}

export default Sidenav;
