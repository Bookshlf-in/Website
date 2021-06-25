import React from "react";
import "./UserProfile.css";
import {Link} from "react-router-dom";
import Account from "./Account";
import CurrentOrder from "./CurrentOrders";
import PreviousOrder from "./PreviousOrders";

function UserProfile() {
  var ID = {
    id1: "user-profile-container",
    id2: "user-profile-container",
    id3: "user-previous-orders",
  };
  function handleClick(id1, id2, id3) {
    document.getElementById(id1).style.display = "flex";
    document.getElementById(id2).style.display = "none";
    document.getElementById(id3).style.display = "none";
  }

  return (
    <div className="user-profile-main">
      {/* Hide this navbar when someone without login views this prfile */}
      <div className="user-profile-navbar">
        <div
          className="Account-details"
          onClick={() => handleClick(ID.id1, ID.id2, ID.id3)}
        >
          <i className="fas fa-info-circle" />
          &nbsp;&nbsp;Account Details
        </div>
        <br />
        <div
          className="Pending-orders"
          onClick={() => handleClick(ID.id2, ID.id1, ID.id3)}
        >
          <i className="fas fa-clipboard-list" />
          &nbsp;&nbsp;Active&nbsp;Orders
        </div>
        <br />
        <div
          className="Completed-orders"
          onClick={() => handleClick(ID.id3, ID.id1, ID.id2)}
        >
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
