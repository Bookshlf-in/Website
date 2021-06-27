import React from "react";

function Account() {
  return (
    <div className="user-profile-container" id ="user-profile-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src="https://image.flaticon.com/icons/png/512/2922/2922510.png"
              alt="Avatar"
              width="200px"
              height="200px"
            />
            <div className="verify-tag">
              {/* change class to verified user to make it verified */}
              <p className="non-verified-user">Not Verified</p>
              <h1>Aman Verma</h1>
            </div>
          </div>
          <div className="flip-card-back">
            <h1>Aman Verma</h1>
            <p>Student at IIIT Lucknow</p>
            <p>Uttar Pradesh, India</p>
            <p>User Since 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
