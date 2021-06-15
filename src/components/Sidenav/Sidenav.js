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
        <Link className="closebtn" onClick={closeNav}>
          &times;
        </Link>
        <Link>
          <i class="fas fa-home"></i>&nbsp;Home
        </Link>
        {/* hidden until screen size is smaller than 650px */}
        <Link className="Profile">
          <input type="text" style={{width: "150px", height: "40px"}} />
          &nbsp;<i class="fas fa-search"></i>
        </Link>
        <Link className="Profile">
          Profile&nbsp;<i class="fas fa-user-circle"></i>
        </Link>
        <Link className="Profile">
          Cart&nbsp;<i class="fas fa-shopping-cart"></i>
        </Link>
        {/* ends here */}
        <Link>
          Categories&nbsp;<i class="fas fa-angle-right"></i>
        </Link>
        <Link>
          Contribute&nbsp;<i class="fas fa-hands-helping"></i>
        </Link>
        <Link>
          Blog&nbsp;<i class="fab fa-blogger"></i>
        </Link>
        <Link to ="/Contact">
          Contact&nbsp;Us&nbsp;<i class="fas fa-headset"></i>
        </Link>
        <Link>
          About&nbsp;Us&nbsp;<i class="fas fa-info-circle"></i>
        </Link>
      </div>
    </div>
  );
}

export default Sidenav;
