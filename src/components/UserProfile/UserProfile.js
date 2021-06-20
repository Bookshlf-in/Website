import React from "react";
import "./UserProfile.css";
import {Link} from "react-router-dom";
import Account from "./Account";
import CurrentOrder from "./CurrentOrders";
import PreviousOrder from "./PreviousOrders";

function UserProfile() {
  function handleClick1() {
    var show1 = document.getElementById("user-profile-container").style.display;
    var show2 = document.getElementById("user-current-orders").style.display;
    var show3 = document.getElementById("user-previous-orders").style.display;
    show1 = "flex";
    show2 = "none";
    show3 = "none";
    document.getElementById("user-profile-container").style.display = show1;
    document.getElementById("user-current-orders").style.display = show2;
    document.getElementById("user-previous-orders").style.display = show3;
  }

  function handleClick2() {
    var show1 = document.getElementById("user-profile-container").style.display;
    var show2 = document.getElementById("user-current-orders").style.display;
    var show3 = document.getElementById("user-previous-orders").style.display;
    show1 = "none";
    show2 = "flex";
    show3 = "none";
    document.getElementById("user-profile-container").style.display = show1;
    document.getElementById("user-current-orders").style.display = show2;
    document.getElementById("user-previous-orders").style.display = show3;
  }

  function handleClick3() {
    var show1 = document.getElementById("user-profile-container").style.display;
    var show2 = document.getElementById("user-current-orders").style.display;
    var show3 = document.getElementById("user-previous-orders").style.display;
    show1 = "none";
    show2 = "none";
    show3 = "flex";
    document.getElementById("user-profile-container").style.display = show1;
    document.getElementById("user-current-orders").style.display = show2;
    document.getElementById("user-previous-orders").style.display = show3;
  }
  return (
    <div className="user-profile-main">
      {/* Hide this navbar when someone without login views this prfile */}
      <div className="user-profile-navbar">
        <div className="Account-details" onClick={handleClick1}>
          <i className="fas fa-info-circle" />
          &nbsp;&nbsp;Account Details
        </div>
        <br />
        <div className="Pending-orders" onClick={handleClick2}>
          <i className="fas fa-clipboard-list" />
          &nbsp;&nbsp;Active&nbsp;Orders
        </div>
        <br />
        <div className="Completed-orders" onClick={handleClick3}>
          <i className="fas fa-clipboard-check" />
          &nbsp;&nbsp;Previous&nbsp;Orders
        </div>
      </div>
      <div className="Panel">
        <Account />
        <CurrentOrder />
        <PreviousOrder />
      </div>
    </div>
  );
}
export default UserProfile;
