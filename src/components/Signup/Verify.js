import {React, useState} from "react";
import "./Verify.css";
import InputMask from "react-input-mask";
import axios from "../../axios";
import Alert from "@material-ui/lab/Alert";

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
  const [Alerttype, setAlerttype] = useState("success");
  const [showAlert, setshowAlert] = useState(false);
  const [alertColor, setalertColor] = useState(alertStyle.color.success);
  const [alertText, setalertText] = useState(null);

  const [locked, setlocked] = useState(false);
  const [otpcorrect, setotpcorrect] = useState(false);
  const [Otp, setOtp] = useState(null);
  const [sendOtp, setSendOtp] = useState(false);

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
      if ("1" <= otp[i] && otp[i] <= "9") {
        ++cnt;
        console.log(cnt);
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
        email: "mirah64698@noobf.com",
      })
      .then((response) => {
        console.log(response.data);
        setSendOtp(false);
        setshowAlert(true);
        setalertText(response.data.msg);
        setTimeout(() => {
          setshowAlert(false);
          setalertText(null);
        }, 10000);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
        setSendOtp(false);
      });
  };

  return (
    <div className="forgotmain-container">
      <div className="forgot-container-logo">
        <img src="./images/logo[800x150].png" height="50px" alt="Bookshlf.in" />
      </div>
      <div className="forgot-container-main">Verify Your Account</div>
      <div className="forgot-container-email">
        <span>
          <i className="fas fa-envelope" />
        </span>
        <input type="text" value="pussydestroyer@gmail.com" disabled />
      </div>
      <div className="forgot-container-otp">
        <span>
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
          id="send-otp-again-alert"
          style={{display: showAlert ? "inline-block" : "none"}}
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
      </div>
      <div className="forgot-container-verify">
        <button>
          Verify&nbsp;&nbsp;
          <i
            className="fas fa-circle-notch"
            style={{
              display: !true ? "none" : "inline-block",
              animation: "spin 2s linear infinite",
            }}
          />
        </button>
      </div>
      <div className="verification-container-login">
        <button>Login</button>
      </div>
    </div>
  );
}
export default Verify;
