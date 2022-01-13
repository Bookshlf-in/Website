import { React, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios";

// Components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// Icons
import LockedIcon from "@mui/icons-material/LockRounded";
import UnlockedIcon from "@mui/icons-material/LockOpenRounded";
import EmailIcon from "@mui/icons-material/EmailRounded";
import SendIcon from "@mui/icons-material/SendRounded";
import CheckCircle from "@mui/icons-material/CheckCircleRounded";
import UpdateIcon from "@mui/icons-material/Cached";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    color: "whitesmoke !important",
    "& p": {
      fontFamily: "PT sans !important",
      color: "whitesmoke",
    },
    "& label": {
      fontFamily: "PT sans !important",
      color: "whitesmoke !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
      color: "whitesmoke !important",
      fontSize: "14px !important",
      letterSpacing: "0.8px !important",
    },
  },
  otpField: {
    "& input": {
      fontFamily: "PT sans !important",
      fontSize: "16px !important",
      padding: "0px !important",
      color: "whitesmoke !important",
      width: "32px !important",
      height: "32px !important",
      textAlign: "center !important",
    },
  },
});

const Verify = (props) => {
  const history = useHistory();
  const classes = useStyles();

  // Context
  const [, setUser] = useContext(UserContext);

  // Functionality States
  const [otpsent, setOtpsent] = useState(1);
  const [otpsentIcon, setOtpsentIcon] = useState(true);
  const [otpLoad, setotpLoad] = useState(false);
  const [otpError, setotpError] = useState(false);
  const [otperrorMsg, setotperrorMsg] = useState("");
  const [interval, setinterval] = useState(30);
  const OTP = ["", "", "", "", "", ""];
  const [verifyLoad, setverifyLoad] = useState(false);
  const [verified, setVerified] = useState(false);
  const [openbackdrop, setopenbackdrop] = useState(false);

  // data states
  const email = props.Email;
  const password = props.Password;
  const [otp, setOtp] = useState("");

  useEffect(() => {
    OTPInput();
    setTimeout(() => {
      setOtpsentIcon(false);
    }, 30000);
  }, []);

  const redirect = () => {
    setopenbackdrop(true);
    axios
      .post("/signIn", {
        email: email,
        password: password,
      })
      .then((response) => {
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
            email: email,
            cartitems: 0,
            wishlist: 0,
          })
        );
        setUser({
          authHeader: `Bearer ${response.data.token}`,
          roles: response.data.roles,
          email: email,
          cartitems: 0,
          wishlist: 0,
        });
        history.push("/");
      })
      .catch((error) => {
        history.push("/Login");
      });
  };

  // OTP Countdown
  const Clock = (props) => {
    const [countdownTime, setcountdownTime] = useState(props.time);
    const timer = () => setcountdownTime(countdownTime - 1);

    useEffect(() => {
      if (countdownTime <= 0) {
        return;
      }
      const clock = setInterval(timer, 1000);
      return () => clearInterval(clock);
    }, [countdownTime]);

    return <span>{countdownTime}</span>;
  };

  // sending Otp
  const handelSendOtp = () => {
    setotpLoad(true);
    axios
      .post("/sendVerifyEmailOtp", {
        email: email,
      })
      .then((response) => {
        setotpLoad(false);
        setOtpsentIcon(true);
        setinterval(30);
        setTimeout(() => {
          setOtpsentIcon(false);
          setOtpsent(1);
        }, 30000);
      });
  };

  // handeling OTP input
  const OTPInput = () => {
    const inputs = document.querySelectorAll("#otp > *[id]");
    inputs[0].focus();
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          inputs[i].value = "";
          OTP[i] = "";
          if (i !== 0) inputs[i - 1].focus();
          LockOTP();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== "") {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            OTP[i] = event.key;
            LockOTP();
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  };
  // const OTP completly full
  const LockOTP = () => {
    let cnt = 0,
      tmp = "";
    for (let i = 0; i < 6; i++) {
      tmp += OTP[i];
      if (OTP[i] !== "") cnt++;
    }
    if (cnt === 6) {
      setOtp(tmp);
    }
  };

  // verifying otp
  const handelVerify = () => {
    setverifyLoad(true);
    axios
      .post("/verifyEmail", {
        email: email,
        otp: otp,
      })
      .then((response) => {
        setVerified(true);
        setverifyLoad(false);
        setTimeout(() => {
          redirect();
        }, 2000);
      })
      .catch((error) => {
        setverifyLoad(false);
        setotpError(true);
        setotperrorMsg(error.response.data.errors[0].error);
        setTimeout(() => {
          setotpError(false);
          setotperrorMsg("");
        }, 5000);
      });
  };
  return (
    <>
      <Stack
        sx={{ width: "100%", maxWidth: 320, padding: " 0px 10px" }}
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          className={classes.root}
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            ),
          }}
          helperText="Your Provided Email"
          variant="filled"
          fullWidth
          sx={{ fontSize: "12px" }}
          value={email}
          disabled
        />
        <LoadingButton
          className={classes.root}
          loading={otpLoad}
          loadingPosition="end"
          endIcon={otpsentIcon ? <CheckCircle /> : <SendIcon />}
          color="success"
          variant="contained"
          sx={{ minWidth: 150 }}
          onClick={handelSendOtp}
          disabled={otpsentIcon}
          fullWidth
          sx={{ maxWidth: 300 }}
        >
          {otpsentIcon ? "OTP Sent" : otpsent === 0 ? "Send Otp" : "Send Again"}
        </LoadingButton>
        {otpsentIcon ? (
          <Typography className={classes.root} variant="caption">
            Resend&nbsp;OTP&nbsp;in&nbsp;
            <Clock time={interval} />
            &nbsp;secs.
          </Typography>
        ) : null}
      </Stack>
      <Stack
        sx={{
          width: "100%",
          maxWidth: 300,
          padding: "10px",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "10px",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          id="otp"
          direction="row"
          spacing={1}
          justifyContent="space-evenly"
          sx={{ width: "100%" }}
        >
          <input
            className="otp-input-field"
            type="text"
            id="first"
            maxLength="1"
            autoComplete="off"
          />
          <input
            className="otp-input-field"
            type="text"
            id="second"
            maxLength="1"
            autoComplete="off"
          />
          <input
            className="otp-input-field"
            type="text"
            id="third"
            maxLength="1"
            autoComplete="off"
          />
          <input
            className="otp-input-field"
            type="text"
            id="fourth"
            maxLength="1"
            autoComplete="off"
          />
          <input
            className="otp-input-field"
            type="text"
            id="fifth"
            maxLength="1"
            autoComplete="off"
          />
          <input
            className="otp-input-field"
            type="text"
            id="sixth"
            maxLength="1"
            name="field"
            autoComplete="nope"
          />
        </Stack>
        <input
          className="otp-input-field-mobile"
          type="text"
          maxLength="6"
          placeholder="ENTER OTP"
          name="mobile-otp"
          autoComplete="off"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </Stack>
      {otpsent ? (
        <Alert
          severity="info"
          // variant="filled"
          sx={{
            fontFamily: "PT sans",
            fontSize: "12px",
            padding: "0px 10px",
            width: "100%",
            maxWidth: 300,
          }}
        >
          Didn't Recieve OTP ? Check You Mail Spam!
        </Alert>
      ) : null}
      {verified ? (
        <Alert
          severity="success"
          // variant="filled"
          sx={{
            fontFamily: "PT sans",
            fontSize: "12px",
            padding: "0px 10px",
            width: "100%",
            maxWidth: 300,
          }}
        >
          OTP Verified Successfully!
        </Alert>
      ) : null}
      {otpError ? (
        <Alert
          severity="error"
          // variant="filled"
          size="small"
          sx={{
            fontFamily: "PT sans",
            fontSize: "12px",
            padding: "0px 10px",
            width: "100%",
            maxWidth: 300,
          }}
        >
          {otperrorMsg}
        </Alert>
      ) : null}
      <LoadingButton
        className={classes.root}
        color="primary"
        variant="contained"
        loading={verifyLoad}
        endIcon={<UpdateIcon />}
        loadingPosition="end"
        onClick={handelVerify}
        fullWidth
        sx={{ maxWidth: 300 }}
      >
        Verify
      </LoadingButton>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openbackdrop}
        // onClick={() => setopenbackdrop(false)}
      >
        <CircularProgress color="primary" />
        <Typography variant="h5" className={classes.root}>
          Signing In...
        </Typography>
      </Backdrop>
    </>
  );
};
export default Verify;
