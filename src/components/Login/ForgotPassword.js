import { React, useState } from "react";
import "./ForgotPassword.css";
import InputMask from "react-input-mask";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import * as EmailValidator from "email-validator";

const eye = {
  open: "far fa-eye",
  close: "fas fa-eye-slash",
};

const lock = {
  open: "fas fa-lock-open",
  close: "fas fa-lock",
};
// alert Styles
const alertStyle = {
  color: {
    success: "#4caf50",
    error: "#f44336",
  },
};

const Errorstyle = {
  border: "2px solid red",
  color: "red",
  width: "400px",
};

function ForgotPassword() {
  const history = useHistory();
  const [show, setshow] = useState(eye.close);
  const [show2, setshow2] = useState(eye.close);
  const [val, setval] = useState("password");
  const [val2, setval2] = useState("password");
  const [Alerttype, setAlerttype] = useState("success");
  const [showAlert, setshowAlert] = useState(false);
  const [alertColor, setalertColor] = useState(alertStyle.color.success);
  const [alertText, setalertText] = useState(null);
  const [firstUse, setFirstUse] = useState(true);

  const [Email, setEmail] = useState("");
  const [locked, setlocked] = useState(false);
  const [otpcorrect, setotpcorrect] = useState(false);
  const [Otp, setOtp] = useState(null);
  const [sendOtp, setSendOtp] = useState(false);
  const [verify, setverify] = useState(false);
  const [verified, setverified] = useState(false);
  const [Password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [confirm, setconfirm] = useState(false);

  const redirect = () => {
    setTimeout(() => {
      history.push("/Login");
    }, 3000);
  };

  // verifying OTP for correctness
  const handelOtp = (e) => {
    CheckOtp(e.target.value);
    setOtp(e.target.value);
    if (otpcorrect) {
      setlocked(true);
    } else {
      setlocked(false);
    }
  };
  const CheckOtp = (otp) => {
    let cnt = 0;
    for (let i = 0; i < otp.length; i++) {
      if ("0" <= otp[i] && otp[i] <= "9") {
        ++cnt;
        if (cnt >= 5) setotpcorrect(true);
        else setotpcorrect(false);
      }
    }
  };

  // email Verify Otp send again handeling
  const handelSendOtp = () => {
    setSendOtp(true);
    if (EmailValidator.validate(Email)) {
      axios
        .post("/sendResetPasswordOtp", {
          email: Email,
        })
        .then((response) => {
          setSendOtp(false);
          setFirstUse(false);
          setAlerttype("success");
          setalertColor(alertStyle.color.success);
          setshowAlert(true);
          setalertText(response.data.msg);
          setTimeout(() => {
            setshowAlert(false);
            setalertText(null);
          }, 10000);
        })
        .catch((error) => {
          if (error.response) {
            setAlerttype("error");
            setalertColor(alertStyle.color.error);
            if (error.response.data.hasOwnProperty("error")) {
              setalertText(error.response.data.error);
            } else {
              setalertText(error.response.data.errors[0].error);
            }
            setshowAlert(true);
            setTimeout(() => {
              setshowAlert(false);
            }, 5000);
          }
          setSendOtp(false);
        });
    } else {
      setSendOtp(false);
      setshowAlert(true);
      setAlerttype("error");
      setalertColor(alertStyle.color.error);
      setalertText("Invalid Email!");
      setTimeout(() => {
        setshowAlert(false);
      }, 3000);
    }
  };

  // OTP verification handeling
  const handelVerify = () => {
    setverify(true);
    if (otpcorrect) {
      axios
        .post("/resetPassword", {
          email: Email,
          otp: Otp,
          password: Password,
        })
        .then((response) => {
          setverify(false);
          setAlerttype("success");
          setalertColor(alertStyle.color.success);
          setalertText(response.data.msg);
          setshowAlert(true);
          setverified(true);
          redirect();
        })
        .catch((error) => {
          setverify(false);
          setAlerttype("error");
          setalertColor(alertStyle.color.error);
          setalertText(error.response.data.errors[0].error);
          setshowAlert(true);
        });
    } else {
      setverify(false);
      setAlerttype("error");
      setalertColor(alertStyle.color.error);
      setalertText("OTP Incorrect!");
      setshowAlert(true);
    }
  };

  return (
    <div className="forgotpass-container">
      <div className="forgot-containerpass">
        <div className="forgot-small-nav">
          <span
            onClick={() => {
              history.push("/");
            }}
          >
            <i class="fas fa-home"></i>&nbsp;HOME
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span
            onClick={() => {
              history.push("/Login");
            }}
          >
            <i class="fas fa-sign-in-alt"></i>&nbsp;LOGIN
          </span>
        </div>
        <div className="forgot-container-logo">
          <img src="/images/favicon.ico" height="50px" alt="Bookshlf.in" />
        </div>
        <div className="forgot-container-main">Password Recovery</div>
        <form className="signup-form">
          <div className="signup-email">
            <span>
              <i className="fas fa-envelope" />
            </span>
            <input
              type="text"
              placeholder="Enter Registered Account Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={Email}
              style={{ width: "320px" }}
            />
          </div>
        </form>

        <div className="forgot-container-otp">
          <span style={{ height: "50px", width: "50px" }}>
            <i
              className={locked ? lock.close : lock.open}
              style={{ color: locked ? "rgb(8, 194, 8)" : "red" }}
            />
          </span>
          <InputMask
            mask="999999"
            id="OTP"
            alwaysShowMask="true"
            value={Otp}
            onChange={(e) => handelOtp(e)}
            style={{ color: locked ? "rgb(8, 194, 8)" : "blue" }}
          />
          <button onClick={handelSendOtp}>
            {firstUse ? "Send OTP" : "Send Again"}&nbsp;&nbsp;
            <i
              className="fas fa-circle-notch"
              style={{
                display: sendOtp ? "inline-block" : "none",
                animation: "spin 2s linear infinite",
              }}
            />
          </button>
          <div
            id="send-otp-again-alert-2"
            style={{ display: showAlert ? "inline-block" : "none" }}
          >
            <Alert
              variant="outlined"
              severity={Alerttype}
              style={{
                fontFamily: "PT Sans",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {alertText}
            </Alert>
          </div>
        </div>
        <form className="signup-form alert-space">
          <div className="signup-password">
            <span>
              <i className="fas fa-key" />
            </span>
            <input
              type={val}
              placeholder="New Password"
              style={{ width: "320px" }}
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
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
          </div>
          <div className="signup-confirm-password">
            <span>
              <i className="fas fa-lock" />
            </span>
            <input
              type={val2}
              placeholder="Confirm New Password"
              onChange={(e) => {
                setConfPassword(e.target.value);
                if (Password !== e.target.value) {
                  setconfirm(true);
                } else {
                  setconfirm(false);
                }
              }}
              style={confirm ? Errorstyle : { width: "320px" }}
            />
            <i
              className={show2}
              onClick={() => {
                if (show2 === eye.close) {
                  setshow2(eye.open);
                  setval2("text");
                } else {
                  setshow2(eye.close);
                  setval2("password");
                }
              }}
            />
          </div>
          <div className="forgot-container-update">
            <button
              onClick={(e) => {
                e.preventDefault();
                handelVerify();
              }}
            >
              {verified ? "Redirecting to Login..." : "Update Password"}
              &nbsp;&nbsp;
              <i
                className="fas fa-circle-notch"
                style={{
                  display: !verify ? "none" : "inline-block",
                  animation: "spin 2s linear infinite",
                }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
