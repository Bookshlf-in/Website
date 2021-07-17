import {React, useState, useEffect} from "react";
import "./UserProfile.css";
import Account from "./Account";
import CurrentOrder from "./CurrentOrders";
import PreviousOrder from "./PreviousOrders";

const UserProfile = () => {
  const [userprofile, setuserprofile] = useState({});
  const [panel, setpanel] = useState(1);

  return (
    <div className="user-profile-main">
      {/* Hide this navbar when someone without login views this prfile */}
      <div className="user-profile-navbar">
        <div className="Account-details" onClick={() => setpanel(1)}>
          <i className="fas fa-info-circle" />
          &nbsp;&nbsp;Account Details
        </div>
        <br />
        <div className="Pending-orders" onClick={() => setpanel(2)}>
          <i className="fas fa-clipboard-list" />
          &nbsp;&nbsp;Active&nbsp;Orders
        </div>
        <br />
        <div className="Completed-orders" onClick={() => setpanel(3)}>
          <i className="fas fa-clipboard-check" />
          &nbsp;&nbsp;Previous&nbsp;Orders
        </div>
      </div>
      <div className="Panel">
        {panel === 1 ? (
          <Account />
        ) : panel === 2 ? (
          <CurrentOrder />
        ) : (
          <PreviousOrder />
        )}
      </div>
    </div>
  );
};
export default UserProfile;
