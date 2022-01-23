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
  const [counter, setCounter] = useState(60);
  const [verifyLoad, setverifyLoad] = useState(false);
  const [verified, setVerified] = useState(false);
  const [openbackdrop, setopenbackdrop] = useState(false);

  // data states
  const email = props.Email;
  const password = props.Password;
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setOtpsentIcon(false);
    }, 60000);
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
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

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
        setCounter(60);
        setTimeout(() => {
          setOtpsentIcon(false);
          setOtpsent(1);
        }, 60000);
      });
  };

  // verifying otp
  const handelVerify = (OTP) => {
    setverifyLoad(true);
    if (OTP.length < 6) {
      setverifyLoad(false);
      setotpError(true);
      setotperrorMsg("Invalid OTP!");
      setTimeout(() => {
        setotpError(false);
        setotperrorMsg("");
      }, 5000);
    } else {
      axios
        .post("/verifyEmail", {
          email: email,
          otp: OTP,
        })
        .then((response) => {
          setVerified(true);
          setverifyLoad(false);
          setTimeout(() => {
            redirect();
          }, 1000);
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
    }
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
          <Typography
            className={classes.root}
            variant="caption"
            sx={{ fontSize: "10px" }}
          >
            Resend&nbsp;OTP&nbsp;in&nbsp;
            <Typography
              variant="caption"
              sx={{
                fontSize: "12px",
                fontFamily: "Staatliches",
                color: "#3aed1f",
                letterSpacing: "2px",
              }}
            >
              00:{counter}
            </Typography>
            &nbsp;secs.
          </Typography>
        ) : null}
        {otpsent ? (
          <Alert
            severity="info"
            variant="outlined"
            sx={{
              fontFamily: "PT sans",
              fontSize: "10px",
              padding: "0px 5px",
              width: "100%",
              maxWidth: 300,
              color: "white",
              letterSpacing: "0.08em",
              "& svg": {
                height: 15,
                width: 15,
              },
            }}
          >
            Didn't Recieve OTP ? Check You Mail Spam!
          </Alert>
        ) : null}
      </Stack>
      <Stack
        sx={{
          width: "100%",
          maxWidth: 300,
          marginTop: "20px !important",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <label htmlFor="otp-input-field" style={{ width: "100%" }}>
          <Typography
            sx={{
              fontFamily: "PT sans",
              fontSize: "10px",
              color: "white",
              marginBottom: "5px",
            }}
          >
            Enter 6 Digit OTP sent to your Mail.
          </Typography>
          <input
            id="otp-input-field"
            className="otp-input-field"
            type="text"
            maxLength="6"
            name="mobile-otp"
            autoComplete="off"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              if (e.target.value.length === 6) {
                handelVerify(e.target.value);
              }
            }}
          />
        </label>
      </Stack>

      {verified ? (
        <Alert
          severity="success"
          variant="filled"
          sx={{
            fontFamily: "PT sans",
            fontSize: "14px",
            padding: "0px 10px",
            width: "100%",
            maxWidth: 300,
            "& svg": {
              height: 22,
              width: 22,
            },
          }}
        >
          OTP Verified Successfully!
        </Alert>
      ) : null}
      {otpError ? (
        <Alert
          severity="error"
          size="small"
          sx={{
            fontFamily: "PT sans",
            fontSize: "14px",
            padding: "0px 10px",
            width: "100%",
            maxWidth: 300,
            "& svg": {
              height: 22,
              width: 22,
            },
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
        onClick={() => handelVerify(otp)}
        fullWidth
        sx={{ maxWidth: 300 }}
      >
        Verify
      </LoadingButton>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
        open={verifyLoad}
      >
        <Stack spacing={2}>
          <CircularProgress color="primary" />
          <Typography variant="caption" color="inherit">
            <strong>Verifying...</strong>
          </Typography>
        </Stack>
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openbackdrop}
      >
        <Stack spacing={2}>
          <CircularProgress color="primary" />
          <Typography variant="h5">
            <strong>Signing In...</strong>
          </Typography>
        </Stack>
      </Backdrop>
    </>
  );
};
export default Verify;
