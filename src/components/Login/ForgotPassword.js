import {React, useState} from "react";
import "./ForgotPassword.css";
import InputMask from "react-input-mask";
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router-dom";
import axios from "../../axios";

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
  const [Alerttype, setAlerttype] = useState("success");
  const [showAlert, setshowAlert] = useState(false);
  const [alertColor, setalertColor] = useState(alertStyle.color.success);
  const [alertText, setalertText] = useState(null);

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
    axios
      .post("/sendResetPasswordOtp", {
        email: Email,
      })
      .then((response) => {
        setSendOtp(false);
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
        }
        setSendOtp(false);
      });
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
        <div className="forgot-container-logo">
          <img
            src="./images/logo[800x150].png"
            height="50px"
            alt="Bookshlf.in"
          />
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
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              style={{width: "400px"}}
            />
          </div>
        </form>

        <div className="forgot-container-otp">
          <span style={{height: "50px", width: "50px"}}>
            <i
              className={locked ? lock.close : lock.open}
              style={{color: locked ? "rgb(8, 194, 8)" : "red"}}
            />
          </span>
          <InputMask
            mask="999999"
            id="OTP"
            alwaysShowMask="true"
            value={Otp}
            onChange={(e) => handelOtp(e)}
            style={{color: locked ? "rgb(8, 194, 8)" : "blue"}}
          />
          <button onClick={handelSendOtp}>
            Send Again&nbsp;&nbsp;
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
            style={{display: showAlert ? "inline-block" : "none"}}
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
        <form className="signup-form">
          <div className="signup-password">
            <span>
              <i className="fas fa-key" />
            </span>
            <input
              type="password"
              placeholder="New Password"
              style={{width: "400px"}}
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
            />
          </div>
          <div className="signup-confirm-password">
            <span>
              <i className="fas fa-lock" />
            </span>
            <input
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) => {
                setConfPassword(e.target.value);
                if (Password !== e.target.value) {
                  setconfirm(true);
                } else {
                  setconfirm(false);
                }
              }}
              style={confirm ? Errorstyle : {width: "400px"}}
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
