import { React, useState } from "react";
import "./Verify.css";
import InputMask from "react-input-mask";
import axios from "../../axios";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

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

function Verify(props) {
  const history = useHistory();
  const [Alerttype, setAlerttype] = useState("success");
  const [showAlert, setshowAlert] = useState(false);
  const [alertColor, setalertColor] = useState(alertStyle.color.success);
  const [alertText, setalertText] = useState(null);

  const [locked, setlocked] = useState(false);
  const [otpcorrect, setotpcorrect] = useState(false);
  const [Otp, setOtp] = useState(null);
  const [sendOtp, setSendOtp] = useState(false);
  const [verify, setverify] = useState(false);
  const [verified, setverified] = useState(false);

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
      .post("/sendVerifyEmailOtp", {
        email: props.mail,
      })
      .then((response) => {
        // console.log(response.data);
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
          // console.log(error.response.data);
          setAlerttype("error");
          setalertColor(alertStyle.color.error);
          setalertText(error.response.data.error);
          if (error.response.data.error === "Email already verified") {
            setverified(true);
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
        .post("/verifyEmail", {
          email: props.mail,
          otp: Otp,
        })
        .then((response) => {
          setverify(false);
          setAlerttype("success");
          setalertColor(alertStyle.color.success);
          setalertText(response.data.msg);
          setshowAlert(true);
          setverified(true);
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
    <div className="forgotmain-container">
      <div className="forgot-container-logo">
        <img src="/images/favicon.ico" height="80px" alt="Bookshlf.in" />
      </div>
      <div className="forgot-container-main">Verify Your Account</div>
      <div className="forgot-container-email">
        <span>
          <i className="fas fa-envelope" />
        </span>
        <input type="text" value={props.mail} disabled />
      </div>
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
          {sendOtp ? "Sending..." : "Send OTP"}
        </button>
      </div>
      <div
        id="send-otp-again-alert"
        style={{ display: showAlert ? "inline-block" : "none" }}
      >
        <Alert
          variant="outlined"
          severity={Alerttype}
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
            color: alertColor,
            fontSize: "12px",
          }}
        >
          {alertText}
        </Alert>
      </div>
      <div className="forgot-container-verify">
        <button onClick={handelVerify}>
          Verify&nbsp;&nbsp;
          <CircularProgress
            style={{
              height: "15px",
              width: "15px",
              color: "white",
              display: verify ? "inline-block" : "none",
            }}
          />
        </button>
      </div>
      <div className="verification-container-login">
        <button
          style={{ opacity: verified ? "1" : "0.4" }}
          onClick={() => {
            if (verified) {
              history.push("/Login");
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default Verify;
