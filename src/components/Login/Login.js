import {React, useState, useContext, useEffect} from "react";
import "./Login.css";
import axios from "../../axios";
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../../Context/userContext";

const eye = {
  open: "far fa-eye",
  close: "fas fa-eye-slash",
};

const Errorstyle = {
  border: "2px solid red",
  color: "red",
};
function Login() {
  // context states
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  // login states
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Log, setLog] = useState(true);
  const [adminRole, setadminRole] = useState(false);
  const [userRole, setuserRole] = useState(false);
  const [sellerRole, setsellerRole] = useState(false);

  // other states
  const [show, setshow] = useState(eye.close);
  const [val, setval] = useState("password");
  const [alert1, setalert1] = useState("none");
  const [alert2, setalert2] = useState("none");
  const [alertText1, setalertText1] = useState("Email is Incorrect");
  const [alertText2, setalertText2] = useState("Password is Incorrect");
  const [Red1, makeRed1] = useState(false);
  const [Red2, makeRed2] = useState(false);
  const [loader, setloader] = useState("none");
  const [bigLoader, setBigLoader] = useState("none");

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

  const setDefault = () => {
    setalert1("none");
    setalert2("none");
    makeRed1(false);
    makeRed2(false);
  };

  // Handeling Default Errors
  const handleDefaultError = () => {
    if (Name === "") {
      setalert1("block");
      setalertText1("Please Fill Your Email.");
      makeRed1(true);
    }
    if (Password === "") {
      setalert2("block");
      setalertText2("Please Fill Your Password.");
      makeRed2(true);
    }
  };

  // Handeling the Login
  const handelLogin = () => {
    setDefault();
    if ((Name !== "") & (Password !== "")) {
      // post request to login
      setloader("block");
      axios
        .post("/signIn", {
          email: Name,
          password: Password,
        })
        .then((response) => {
          console.log("Logged In", response);
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: `Bearer ${response.data.token}`,
              roles: response.data.roles,
            })
          );
          setUser({
            authHeader: `Bearer ${response.data.token}`,
            roles: response.data.roles,
          });
          setadminRole(response.data.roles.includes("admin"));
          setsellerRole(response.data.roles.includes("seller"));
          setuserRole(response.data.roles.includes("customer"));
          setLog(false);
          setloader("none");
        })
        .catch((error) => {
          if (error.response) {
            HandelError(error.response.data.errors[0]);
          }
          setloader("none");
        });
    } else {
      handleDefaultError();
    }
  };

  // Handeling Error
  const HandelError = (error) => {
    if (error.param === "email") {
      setalert1("block");
      setalertText1(error.error);
      makeRed1(true);
    }
    if (error.param === "password") {
      setalert2("block");
      setalertText2(error.error);
      makeRed2(true);
    }
  };

  // Handeling User Role
  const handleUserRole = (curRole) => {
    setBigLoader("flex");
    setTimeout(() => {
      setBigLoader("none");
      if (curRole === "user") {
        history.push("/");
      } else if (curRole === "seller") {
        history.push("/sellerPanel");
      } else if (curRole === "admin") {
        history.push("/adminPanel");
      }
    }, 3000);
  };

  return (
    <div className="login-bg">
      {Log ? (
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
                      value={Name}
                      placeholder="yourname@email.com"
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handelLogin();
                        }
                      }}
                      style={Red1 ? Errorstyle : {}}
                    />
                    <span style={{display: alert1}}>
                      <i className="fas fa-exclamation-circle"></i> {alertText1}
                    </span>
                  </div>
                  <div className="login-form-password-lable">Password</div>
                  <div className="login-form-password-input">
                    <i className={show} id="eye" onClick={handelClick} />
                    <input
                      type={val}
                      value={Password}
                      placeholder="Password"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handelLogin();
                        }
                      }}
                      style={Red2 ? Errorstyle : {}}
                    />
                    <span style={{display: alert2}}>
                      <i className="fas fa-exclamation-circle"></i> {alertText2}
                    </span>
                  </div>
                  <div className="login-form-forgot-password">
                    <Link to="/Login">Forgot Your Password ?</Link>
                  </div>
                  <div className="login-form-submit-button">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handelLogin();
                      }}
                    >
                      Login
                      <div id="loading" style={{display: loader}}></div>
                    </button>
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
                  <div className="login-container-right-container-register-button-card">
                    <div className="login-container-right-container-register-button-card-front">
                      Don't Have An Account ?
                    </div>
                    <div className="login-container-right-container-register-button-card-back">
                      <h2>
                        <Link to="/Signup">Register</Link>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Container ends here */}
          </div>
        </div>
      ) : (
        <div className="login-as-bg">
          <div className="login-as-loading-bg" style={{display: bigLoader}}>
            <div id="loading"></div>
          </div>
          <h1>LOGIN AS</h1>
          <div className="login-as-container">
            {userRole ? (
              <div
                className="login-as-box"
                onClick={() => {
                  handleUserRole("user");
                }}
              >
                <div className="login-as-box-img">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="login-as-box-title">USER</div>
              </div>
            ) : (
              <div> </div>
            )}
            {sellerRole ? (
              <div
                className="login-as-box"
                onClick={() => {
                  handleUserRole("seller");
                }}
              >
                <div className="login-as-box-img">
                  <i className="fas fa-user-friends"></i>
                </div>
                <div className="login-as-box-title">SELLER</div>
              </div>
            ) : (
              <div> </div>
            )}
            {adminRole ? (
              <div
                className="login-as-box"
                onClick={() => {
                  handleUserRole("admin");
                }}
              >
                <div className="login-as-box-img">
                  <i className="fas fa-user-cog"></i>
                </div>
                <div className="login-as-box-title">ADMIN</div>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
