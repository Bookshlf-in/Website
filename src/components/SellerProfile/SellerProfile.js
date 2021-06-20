import React from "react";
import "./SellerProfile.css";
import {Link} from "react-router-dom";
import AccountDetails from "./AccountDetails";
import Completed from "./CompletedOrders";
import Pending from "./PendingOrders";
function SellerProfile() {
  function handleClick1() {
    var show1 = document.getElementById("seller-account-details").style.display;
    var show2 = document.getElementById("seller-pending-orders").style.display;
    var show3 = document.getElementById("seller-complete-orders").style.display;
    if (show1 === "none") {
      show1 = "flex";
      show2 = "none";
      show3 = "none";
    } else {
      show1 = "flex";
      show2 = "none";
      show3 = "none";
    }
    document.getElementById("seller-account-details").style.display = show1;
    document.getElementById("seller-pending-orders").style.display = show2;
    document.getElementById("seller-complete-orders").style.display = show3;
  }

  function handleClick2() {
    var show1 = document.getElementById("seller-account-details").style.display;
    var show2 = document.getElementById("seller-pending-orders").style.display;
    var show3 = document.getElementById("seller-complete-orders").style.display;
    if (show2 === "none") {
      show1 = "none";
      show2 = "flex";
      show3 = "none";
    } else {
      show1 = "none";
      show2 = "flex";
      show3 = "none";
    }
    document.getElementById("seller-account-details").style.display = show1;
    document.getElementById("seller-pending-orders").style.display = show2;
    document.getElementById("seller-complete-orders").style.display = show3;
  }

  function handleClick3() {
    var show1 = document.getElementById("seller-account-details").style.display;
    var show2 = document.getElementById("seller-pending-orders").style.display;
    var show3 = document.getElementById("seller-complete-orders").style.display;
    if (show3 === "none") {
      show1 = "none";
      show2 = "none";
      show3 = "flex";
    } else {
      show1 = "none";
      show2 = "none";
      show3 = "flex";
    }
    document.getElementById("seller-account-details").style.display = show1;
    document.getElementById("seller-pending-orders").style.display = show2;
    document.getElementById("seller-complete-orders").style.display = show3;
  }
  return (
    <div className="SellerProfile-container">
      <div className="SellerProfile-navbar">
        <div className="Account-details" onClick={handleClick1}>
          <i className="fas fa-info-circle" />
          &nbsp;&nbsp;Account Details
        </div>
        <br />
        <div className="Pending-orders" onClick={handleClick2}>
          <i className="fas fa-clipboard-list" />
          &nbsp;&nbsp;Orders&nbsp;Pending
        </div>
        <br />
        <div className="Completed-orders" onClick={handleClick3}>
          <i className="fas fa-clipboard-check" />
          &nbsp;&nbsp;Orders&nbsp;Completed
        </div>
      </div>
      <div className="Panel">
        <AccountDetails />
        <Pending />
        <Completed />
      </div>
    </div>
  );
}
export default SellerProfile;
