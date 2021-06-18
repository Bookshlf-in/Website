import React from "react";
import "./UserProfile.css";
import {Link} from "react-router-dom";

function UserProfile() {
  return (
    <div className="user-profile-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src="https://image.flaticon.com/icons/png/512/2922/2922510.png"
              alt="Avatar"
              width="300px"
              height="300px"
            />
            <div className="verify-tag">
              {/* change class to verified user to make it verified */}
              <p className="non-verified-user">Not Verified</p>
              <h1>John Doe</h1>
            </div>
          </div>
          <div className="flip-card-back">
            <h1>John Doe</h1>
            <p>Uttar Pradesh</p>
            <p>User Since 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
