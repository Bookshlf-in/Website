import { React, useState } from "react";
import "./Signup.css";
import "./Verify.css";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Verify from "./Verify";
import * as EmailValidator from "email-validator";
import CircularProgress from "@material-ui/core/CircularProgress";

const eye = {
  open: "far fa-eye",
  close: "fas fa-eye-slash",
};
const Errorstyle = {
  border: "2px solid red",
  color: "red",
};

const Msg = {
  notMatch: "Password does not match",
  Match: "Password Matches",
};

function UserSignup() {
  // signup states
  const [show, setshow] = useState(eye.close);
  const [val, setval] = useState("password");
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [Step, setStep] = useState(1);
  let [message, setmessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [Red, makeRed] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  // Signup handeling
  const handelSignUp = () => {
    if (EmailValidator.validate(Email)) {
      setLoading(true);
      if (!Red.confirm) {
        axios
          .post("/signUp", {
            name: FName + " " + LName,
            email: Email,
            password: Password,
          })
          .then((response) => {
            console.log(response.data);
            setStep(2);
            setLoading(false);
          })
          .catch((error) => {
            if (error.response) {
              handelError(error.response.data.errors[0]);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  };
  const handelError = (e) => {
    const param = e.param;
    const msg = e.error;
    if (param === "name") {
      makeRed({ name: true });
      setmessage({ name: msg });
    } else if (param === "email") {
      makeRed({ email: true });
      setmessage({ email: msg });
    } else if (param === "password") {
      makeRed({ password: true });
      setmessage({ password: msg });
    }
  };
  return (
    <div className="signup-bg">
      {Step === 1 ? (
        <div className="signup-box">
          <div className="floating-login-button">
            <Link to="/">
              <i className="fas fa-home"></i>&nbsp;Home
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/Login">
              <i className="fas fa-sign-in-alt"></i>&nbsp;Login
            </Link>
          </div>
          <div className="signup-logo">
            <img src="/images/favicon.ico" alt="" height="50px" />
          </div>

          <form className="signup-form">
            <h1 className="neonText">Register</h1>
            <div className="signup-name">
              <span>
                <i className="fas fa-user" />
              </span>
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFName(e.target.value)}
                value={FName}
                style={Red.name ? Errorstyle : {}}
              />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLName(e.target.value)}
                value={LName}
              />
              <b
                style={{
                  display: Red.name ? "inline-block" : "none",
                }}
              >
                <i className="fas fa-exclamation-circle" />
                &nbsp;{message.name}
              </b>
            </div>
            <div className="signup-email">
              <span>
                <i className="fas fa-envelope" />
              </span>
              <input
                type="mail"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                style={Red.email ? Errorstyle : {}}
              />
              <b
                style={{
                  display: Red.email ? "inline-block" : "none",
                }}
              >
                <i className="fas fa-exclamation-circle" />
                &nbsp;{message.email}
              </b>
            </div>
            <div className="signup-password">
              <span>
                <i className="fas fa-key" />
              </span>
              <input
                type={val}
                placeholder="Password"
                id="pass"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                style={Red.password ? Errorstyle : {}}
              />
              <i
                className={show}
                onClick={() => {
                  if (show === eye.close) {
                    setshow(eye.open);
                    setval("text");
                  } else {
                    setshow(eye.close);
                    setval("password");
                  }
                }}
              />
              <b
                style={{
                  display: Red.password ? "inline-block" : "none",
                }}
              >
                <i className="fas fa-exclamation-circle" />
                &nbsp;{message.password}
              </b>
            </div>
            <div className="signup-confirm-password">
              <span>
                <i className="fas fa-lock" />
              </span>
              <input
                type={val}
                id="confirm-pass"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                  if (Password !== e.target.value) {
                    Red.confirm = true;
                  } else {
                    Red.confirm = false;
                  }
                }}
                style={Red.confirm ? Errorstyle : {}}
              />
              <i
                className={show}
                onClick={() => {
                  if (show === eye.close) {
                    setshow(eye.open);
                    setval("text");
                  } else {
                    setshow(eye.close);
                    setval("password");
                  }
                }}
              />
              <b
                style={{
                  color: Red.confirm ? "red" : "green",
                  display: confPassword !== "" ? "inline-block" : "none",
                }}
              >
                <i className="fas fa-exclamation-circle" />
                &nbsp;
                {Red.confirm ? Msg.notMatch : Msg.Match}
                {Password === confPassword
                  ? (Red.confirm = false)
                  : (Red.confirm = true)}
              </b>
            </div>
            <div className="signup-button">
              <span>
                <i className="fas fa-user-plus" />
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handelSignUp();
                }}
              >
                SignUp&nbsp;&nbsp;&nbsp;
                <CircularProgress
                  style={{
                    height: "15px",
                    width: "15px",
                    color: "white",
                    display: loading ? "inline-block" : "none",
                  }}
                />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Verify mail={Email} otpsent={true} />
      )}
    </div>
  );
}

export default UserSignup;

// const handleInputChange = event => {
//   const { name, value } = event.target;
//   setState(prevState => ({
//     ...prevState,
//     [name]: value
//   }));
// };
