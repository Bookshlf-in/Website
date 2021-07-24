import React from "react";

const FindProfile = (props) => {
  return (
    <div className="findprofile-cont">
      <div className="findprofile-email">
        <form action="">
          <input
            className="findprofile-email-input"
            type="email"
            placeholder="Enter Email Address"
          />
          <button
            type="submit"
            className="findprofile-email-button"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Find
          </button>
        </form>
      </div>
      <div className="findprofile-profile">
        <div className="findprofile-profile-box">
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
}

export default FindProfile;
