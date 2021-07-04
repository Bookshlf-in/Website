import React from "react";
import "./ForgotPassword.css";
import {Link} from "react-router-dom";
function ForgotPassword() {
  return (
      <div>
        <div className="forgotmain-container">
          {/* Left container in login container starts */}
          <div className="forgot-container">
            <div className="forgot-container-logo">
              <img
                src="./images/logoView[900x240].png"
                height="80px"
                alt="Bookshlf.in"
              />
            </div>
            <div className="forgot-container-main">Password Recovery</div>
            {/* <div className="forgot-container-email-lable"></div> */}
            <div className="forgot-container-email">
              <input type="text" value="pussydestroyer@gmail.com" disabled />
            </div>
            <div className="forgot-container-otp">
              <input type="text" placeholder="Enter OTP" maxlength="6" />
              <button> Send Again</button>
            </div>
            <div className="forgot-container-verify">
              <button>Verify</button>
            </div>
            <div className="forgot-container-password">
              <input type="password" placeholder="New Password" disabled />
            </div>
            <div className="forgot-container-password">
              <input type="Password" placeholder="Confirm Password" disabled />
            </div>
            <div className="forgot-container-update">
              <button disabled>Update Password</button>
            </div>
            <div className="forgot-container-login">
              <Link to="/Login">
                <button>Login</button>
              </Link>
            </div>
          </div>
          {/* Left container ends here */}
        </div>
      </div>
    
  );
}
export default ForgotPassword;
