import React from "react";
import "./Verify.css";
import {Link} from "react-router-dom";
function Verify() {
  return (
    <div className="app">
      <div className="login-bg">
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
            <div className="forgot-container-main">Verification</div>
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
            <div className="verification-container-login">
              <Link to="/Login">
                <button disabled >Login</button>
              </Link>
            </div>
          </div>
          {/* Left container ends here */}
        </div>
      </div>
    </div>
  );
}
export default Verify;
