import React from "react";
import "./Signup.css";
import InputMask from "react-input-mask";
import {Link} from "react-router-dom";
function Signup() {
  return (
    <div className="app">
      <div className="Signup-bg">
        {/* Main Container Starts */}
        <div className="Signup-container">
          {/* upper-logo **dont-change** */}
          <div className="signup-logo-sm">
            <img src="./images/logo.svg" alt="Bookshlf" height="50px" />
          </div>
          <div className="signup-logo-container">
            <div className="signup-logo-box">Signup</div>
            <div className="login-logo-box">
              <Link to="/Login"> Login</Link>
            </div>
            <div className="login-logo-bookshlf">
              <img src="./images/logo.svg" alt="Bookshlf" height="50px" />
            </div>
          </div>
          <div className="signup-logo-end"></div>
          {/* upper-logo ends */}

          {/* Main-Form starts */}
          <div
            className="signup-main"
            style={{backgroundImage: `url(./images/signup-main.png)`}}
          >
            <form action="#" autoComplete="off">
              <div className="signup-lable">
                Full&nbsp;Name&nbsp;<sup title="Required Field">*</sup>
              </div>
              <div className="signup-input signup-name">
                <input
                  type="text"
                  id="signup-name"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="signup-lable">
                Email&nbsp;<sup title="Required Field">*</sup>
              </div>
              <div className="signup-input signup-email">
                <input
                  type="email"
                  id="signup-email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="signup-lable">
                Password&nbsp;<sup title="Required Field">*</sup>
              </div>
              <div className="signup-input signup-password">
                <input
                  type="text"
                  id="signup-password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="signup-lable">
                Phone&nbsp;Number&nbsp;<sup title="Required Field">*</sup>
              </div>
              <div className="signup-input signup-phone">
                <InputMask
                  mask="999-9999-999"
                  alwaysShowMask
                  id="signup-phone"
                  required
                />
              </div>
              <div className="signup-lable">
                Date&nbsp;of&nbsp;Birth&nbsp;<sup title="Required Field">*</sup>
              </div>
              <div className="signup-input signup-DOB">
                <InputMask
                  mask="99/99/9999"
                  maskPlaceholder="DD/MM/YYYY"
                  alwaysShowMask
                  id="signup-DOB"
                />
              </div>
              <div className="signup-lable">
                Pincode&nbsp;<sup title="Required Field">*</sup>
              </div>
              <div className="signup-input signup-pincode">
                <InputMask mask="999-999" alwaysShowMask id="signup-phone" />
              </div>
              <div className="signup-lable">Current&nbsp;Address</div>
              <div className="signup-input signup-address">
                <input
                  type="text"
                  id="signup-address"
                  placeholder="Delivery Address"
                />
              </div>
              <div className="signup-submit">
                <img src="./images/smallLogo.svg" alt="" height="40px" />
                <input type="submit" id="signup-register" value="Register" />
              </div>
            </form>
          </div>
          {/* Main Form Ends */}
        </div>
        {/* Main Container Ends */}
      </div>
    </div>
  );
}

export default Signup;
