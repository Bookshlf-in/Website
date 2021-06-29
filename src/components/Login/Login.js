import {React, useState} from "react";
import "./Login.css";
import {Link} from "react-router-dom";
import axios from "../../axios";

const eye = {
  open: "far fa-eye",
  close: "fas fa-eye-slash",
};

function Login() {
  // login states
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  // other states
  const [show, setshow] = useState(eye.close);
  const [val, setval] = useState("password");

  // showing password and hiding
  const handelClick = () => {
    if (show === eye.close) {
      setshow(eye.open);
      setval("text");
    } else {
      setshow(eye.close);
      setval("password");
    }
  };

  // Handeling the Login
  const handelLogin = () => {};

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Left container in login container starts */}
        <div className="login-container-left">
          <div className="login-container-left-logo">
            <img
              src="./images/logoView[900x240].png"
              height="50px"
              alt="Bookshlf.in"
            />
          </div>
          <div className="login-container-left-main">
            <h2> Login </h2>
            <div className="login-container-left-main-form">
              {/* Login form */}
              <form autoComplete="off">
                <div className="login-form-email-lable">Email</div>
                <div className="login-form-email-input">
                  <input
                    type="email"
                    placeholder="yourname@email.com"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="login-form-password-lable">Password</div>
                <div className="login-form-password-input">
                  <i className={show} onClick={handelClick} />
                  <input
                    type={val}
                    placeholder="Password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="login-form-forgot-password">
                  <Link to="/ForgotPassword">Forgot Your Password ?</Link>
                </div>
                <div className="login-form-submit-button">
                  <button onClick={handelLogin}>Login</button>
                </div>
              </form>
              {/* Login Form Ends */}
            </div>
          </div>
        </div>
        {/* Left container ends here */}

        <div
          className="login-container-right"
          style={{backgroundImage: `url(/images/login-city.svg)`}}
        >
          {/* right container in login container starts */}
          <div className="login-container-right-container">
            <div className="login-container-right-container-logo">
              <img
                src="/images/smallLogo.svg"
                alt="bookshlf.in"
                height="250px"
                width="250px"
              />
            </div>
            <div className="login-container-right-container-register">
              <div className="login-container-right-container-register-button">
                <div class="login-container-right-container-register-button-card">
                  <div class="login-container-right-container-register-button-card-front">
                    Don't Have An Account ?
                  </div>
                  <div class="login-container-right-container-register-button-card-back">
                    <h2>
                      <Link to="/UserSignup">Register</Link>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Container ends here */}
        </div>
      </div>
    </div>
  );
}
export default Login;
