import React, {useState} from "react";
import "./Signup.css";
import {Link} from "react-router-dom";

function UserSignup() {
  function handelconfirmation() {
    // create a password matcher
    let str1 = document.getElementById("pass").value;
    let str2 = document.getElementById("confirm-pass").value;
    if (str1 !== str2) {
      alert("Passwords do not match");
    }
  }
  function showPassword(id1, id2) {
    //  create function to show password
    let c = document.getElementById(id1).getAttribute("class");
    if (c === "fas fa-eye-slash") {
      document.getElementById(id1).setAttribute("class", "far fa-eye");
    } else if (c === "far fa-eye") {
      document.getElementById(id1).setAttribute("class", "fas fa-eye-slash");
    }
    c = document.getElementById(id2).getAttribute("type");
    console.log(c);
    if (c === "text") {
      document.getElementById(id2).setAttribute("type", "password");
    } else if (c === "password") {
      document.getElementById(id2).setAttribute("type", "text");
    }
    console.log(document.getElementById(id2).getAttribute("type"));
  }

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
            <input type="password" placeholder="Password" required id="pass" />
            <i
              className="fas fa-eye-slash"
              id="eye-icon1"
              onClick={() => showPassword("eye-icon1", "pass")}
            ></i>
            {/* <i className="far fa-eye"></i> */}
          </div>
          <div className="signup-confirm-password">
            <span>
              <i className="fas fa-lock" />
            </span>
            <input
              type="password"
              id="confirm-pass"
              placeholder="Confirm Password"
              required
              onSubmit={handelconfirmation}
            />
            <i
              className="fas fa-eye-slash"
              id="eye-icon2"
              onClick={() => showPassword("eye-icon2", "confirm-pass")}
            ></i>
            {/* <i className="far fa-eye"></i> */}
          </div>
          <div className="signup-button">
            <span>
              <i className="fas fa-user-plus"></i>
            </span>
            <input type="submit" value="Sign Up" onClick={handelconfirmation} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignup;
