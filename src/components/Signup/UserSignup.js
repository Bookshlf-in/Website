import React, {useState} from "react";
import "./Signup.css";
import {Link} from "react-router-dom";

function UserSignup() {
  return (
    <div className="signup-bg">
      <div className="signup-box">
        <div className="floating-login-button">
          <Link to="/Login">Login</Link>
        </div>
        <div className="signup-logo">
          <img src="./images/logo[800x150].png" alt="" height="50px" />
        </div>

        <form className="signup-form">
          <h1 className="neonText">Register</h1>
          <div className="signup-name">
            <span>
              <i className="fas fa-user" />
            </span>
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <div className="signup-email">
            <span>
              <i className="fas fa-envelope" />
            </span>
            <input type="mail" placeholder="Email" required />
          </div>
          <div className="signup-password">
            <span>
              <i className="fas fa-key" />
            </span>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="signup-confirm-password">
            <span>
              <i className="fas fa-lock" />
            </span>
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <div className="signup-button">
            <span>
              <i className="fas fa-user-plus"></i>
            </span>
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignup;
