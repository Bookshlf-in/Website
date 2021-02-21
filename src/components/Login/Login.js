import React from "react";
import "./Login.css";
function Login() {
  return (
    <div className="app">
      <div className="login-bg">
        <div className="login-container">
          {/* Left container in login container starts */}
          <div className="login-container-left">
            <div className="login-container-left-logo">Bookshlf</div>
            <div className="login-container-left-main">
              <h2> Login </h2>
              <div className="login-container-left-main-form">
                <form autoComplete="off">
                  <div className="login-form-email-lable">Email</div>
                  <div className="login-form-email-input">
                    <input
                      type="email"
                      placeholder="yourname@email.com"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="login-form-password-lable">Password</div>
                  <div className="login-form-password-input">
                    <input
                      type="Password"
                      placeholder="**************"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="login-form-forgot-password">
                    {/* <Link to=""> */}
                    Forgot Your Password ?{/* </Link> */}
                  </div>
                  <div className="login-form-submit-button">
                    <button>Login</button>
                  </div>
                </form>
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
                  src="/images/bookshlf-logo.png"
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
                        {/* <Link to="#">*/}Register{/*</Link> */}
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
    </div>
  );
}
export default Login;
