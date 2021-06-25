import React from "react";
import "./SellerProfile.css";
import {Link} from "react-router-dom";
import AccountDetails from "./AccountDetails";
import Completed from "./CompletedOrders";
import Pending from "./PendingOrders";
function SellerProfile() {
  function handleClick(id1, id2, id3) {
    document.getElementById(id1).style.display = "flex";
    document.getElementById(id2).style.display = "none";
    document.getElementById(id3).style.display = "none";
  }
  return (
    <div className="SellerProfile-container">
      <div className="SellerProfile-navbar">
        <div
          className="Account-details"
          onClick={() =>
            handleClick(
              "seller-account-details",
              "seller-pending-orders",
              "seller-complete-orders"
            )
          }
        >
          <i className="fas fa-info-circle" />
          &nbsp;&nbsp;Account Details
        </div>
        <br />
        <div
          className="Pending-orders"
          onClick={() =>
            handleClick(
              "seller-pending-orders",
              "seller-account-details",
              "seller-complete-orders"
            )
          }
        >
          <i className="fas fa-clipboard-list" />
          &nbsp;&nbsp;Orders&nbsp;Pending
        </div>
        <br />
        <div
          className="Completed-orders"
          onClick={() =>
            handleClick(
              "seller-complete-orders",
              "seller-account-details",
              "seller-pending-orders"
            )
          }
        >
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
