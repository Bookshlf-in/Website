import { React, useState, useContext } from "react";
import "./Login.css";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { AddFormContext } from "../../Context/formContext";
import CircularProgress from "@material-ui/core/CircularProgress";
const eye = {
  open: "far fa-eye",
  close: "fas fa-eye-slash",
};

const Errorstyle = {
  borderBottom: "3px solid rgb(240, 39, 39)",
  color: "rgb(240, 39, 39)",
};
function Login() {
  // context states
  const [, setUser] = useContext(UserContext);
  const [addForm, setAddForm] = useContext(AddFormContext);
  const history = useHistory();

  // login states
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");

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

  // showing password and hiding
  const handelClick = (e) => {
    if (show === eye.close) {
      setshow(eye.open);
      setval("text");
      document.getElementById(e.target.id).style.color = "rgb(240, 39, 39)";
    } else {
      setshow(eye.close);
      setval("password");
      document.getElementById(e.target.id).style.color = "rgb(53, 53, 53)";
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
      setalertText1("Please Fill Your Email");
      makeRed1(true);
    }
    if (Password === "") {
      setalert2("block");
      setalertText2("Please Fill Your Password");
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
          // console.log("Logged In", response);
          if (response.data.token) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
          }
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: `Bearer ${response.data.token}`,
              roles: response.data.roles,
              email: Name,
              cartitems: 0,
              wishlist: 0,
            })
          );
          localStorage.setItem(
            "bookshlf_user_AddBook",
            JSON.stringify({
              title: "",
              MRP: "",
              price: "",
              editionYear: "2021",
              author: "",
              ISBN: "9782724088526",
              language: "",
              pickupAddressId: "",
              description: "",
              photos: [],
              weightInGrams: "",
              embedVideo: "",
              tags: [],
              qty: 1,
            })
          );
          setUser({
            authHeader: `Bearer ${response.data.token}`,
            roles: response.data.roles,
            email: Name,
            cartitems: 0,
            wishlist: 0,
          });
          setAddForm({
            title: "",
            MRP: "",
            price: "",
            editionYear: "2021",
            author: "",
            ISBN: "9782724088526",
            language: "",
            pickupAddressId: "",
            description: "",
            photos: [],
            weightInGrams: "",
            embedVideo: "",
            tags: [],
            qty: 1,
          });
          setTimeout(() => {
            setloader("none");
            history.goBack();
          }, 5000);
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

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Left container in login container starts */}
        <div className="login-floating-nav">
          <span
            onClick={() => {
              history.push("/");
            }}
          >
            <i className="fas fa-home"></i>&nbsp;HOME
          </span>
        </div>
        <div className="login-container-left">
          <div className="login-container-left-logo">
            <img src="/images/favicon.ico" height="70px" alt="Bookshlf.in" />
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
                    onChange={(e) => {
                      setName(e.target.value);
                      makeRed1(false);
                      setalert1("none");
                      setalertText1("");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handelLogin();
                      }
                    }}
                    style={Red1 ? Errorstyle : {}}
                  />
                  <span
                    style={{
                      display: alert1,
                    }}
                  >
                    <i className="fas fa-exclamation-circle"></i> {alertText1}
                  </span>
                </div>
                <div className="login-form-password-lable">Password</div>
                <div className="login-form-password-input">
                  <i
                    className={show}
                    id="eye"
                    onClick={(e) => handelClick(e)}
                  />
                  <input
                    type={val}
                    value={Password}
                    placeholder="Password"
                    autoComplete="off"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      makeRed2(false);
                      setalert2("none");
                      setalertText2("");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handelLogin();
                      }
                    }}
                    style={Red2 ? Errorstyle : {}}
                  />
                  <span
                    style={{
                      display: alert2,
                    }}
                  >
                    <i className="fas fa-exclamation-circle"></i> {alertText2}
                  </span>
                </div>
                <div className="login-form-forgot-password">
                  <Link to="/ForgotPassword">Forgot Your Password ?</Link>
                </div>
                <div className="login-form-submit-button">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handelLogin();
                    }}
                  >
                    Login
                  </button>
                  <div className="login-load" style={{ display: loader }}>
                    <CircularProgress
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                  </div>
                  <span className="register">
                    <Link to="/Signup">Create Account</Link>
                    &nbsp; instead ?
                  </span>
                </div>
              </form>
              {/* Login Form Ends */}
            </div>
          </div>
        </div>
        {/* Left container ends here */}
      </div>
    </div>
  );
}
export default Login;
