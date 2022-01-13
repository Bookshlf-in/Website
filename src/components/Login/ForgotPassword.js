import { React, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet";
import axios from "../../axios";
import * as EmailValidator from "email-validator";
import "./ForgotPassword.css";

// Components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LoadingButton from "@mui/lab/LoadingButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import RecoveryIcon from "@mui/icons-material/PrivacyTipRounded";
import LockedIcon from "@mui/icons-material/LockRounded";
import UnlockedIcon from "@mui/icons-material/LockOpenRounded";
import EmailIcon from "@mui/icons-material/EmailRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import ErrorIcon from "@mui/icons-material/Error";
import SendIcon from "@mui/icons-material/SendRounded";
import CheckCircle from "@mui/icons-material/CheckCircleRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/PasswordRounded";
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

const ForgotPassword = () => {
  const history = useHistory();
  const classes = useStyles();
  // context states
  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    OTPInput();
  }, []);

  // Functionality States
  const [otpsent, setOtpsent] = useState(0);
  const [otpsentIcon, setOtpsentIcon] = useState(false);
  const [otpLoad, setotpLoad] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [emailerrorMsg, setemailerrorMsg] = useState("");
  const [otpError, setotpError] = useState(false);
  const [otperrorMsg, setotperrorMsg] = useState("");
  const [interval, setinterval] = useState(0);
  const OTP = ["", "", "", "", "", ""];
  const [lock, setlock] = useState(false);
  const [showpassword, setshowPassword] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [passworderrorMsg, setpassworderrorMsg] = useState("");
  const [passwordMatch, setpasswordMatch] = useState(true);
  const [updateLoad, setupdateLoad] = useState(false);
  const [openbackdrop, setopenbackdrop] = useState(false);

  // data states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

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

  // showing and hiding password
  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  // Handeling Recovery Navbar
  const handelNav = (e, value) => {
    if (value === "1") history.push("/");
    if (value === "2") history.push("/PasswordRecovery");
    if (value === "3") history.push("/Login");
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
    if (EmailValidator.validate(email)) {
      setotpLoad(true);
      axios
        .post("/sendResetPasswordOtp", {
          email: email,
        })
        .then((response) => {
          setotpLoad(false);
          setOtpsentIcon(true);
          setOtpsent(1);
          setinterval(30);
          setTimeout(() => {
            setOtpsentIcon(false);
            setOtpsent(1);
          }, 30000);
        })
        .catch((error) => {
          setotpLoad(false);
          setemailError(true);
          setemailerrorMsg(error.response.data.error);
          setTimeout(() => {
            setemailError(false);
            setemailerrorMsg("");
          }, 5000);
        });
    } else {
      setemailError(true);
      setemailerrorMsg("Invalid Email!");
      setTimeout(() => {
        setemailError(false);
        setemailerrorMsg("");
      }, 5000);
    }
  };

  // handeling OTP input
  const OTPInput = () => {
    const inputs = document.querySelectorAll("#otp > *[id]");
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
      setlock(true);
      setOtp(tmp);
    } else setlock(false);
  };

  // checking if both input passwords are matching
  const handleVerifyPassword = (e) => {
    setNewpassword(e.target.value);
    if (password.length > 0 && password !== e.target.value) {
      setpasswordMatch(false);
      setpassworderrorMsg("Password Doesn't Matches");
    } else if (password.length > 0 && password === e.target.value) {
      setpasswordMatch(true);
      setpassworderrorMsg("Password Matches");
    }
  };

  // updating password
  const handelUpdatePassword = () => {
    // console.log(email, " ", otp, " ", password);
    setupdateLoad(true);
    if (EmailValidator.validate(email)) {
      if (otpsent) {
        if (otp.length === 6) {
          if (passwordMatch) {
            axios
              .post("/resetPassword", {
                email: email,
                otp: otp,
                password: password,
              })
              .then((response) => {
                redirect();
              })
              .catch((error) => {
                setupdateLoad(false);
                if (error.response.data.errors[0].param === "otp") {
                  setotpError(true);
                  setotperrorMsg(error.response.data.errors[0].error);
                  setTimeout(() => {
                    setotpError(false);
                    setotperrorMsg("");
                  }, 5000);
                }
              });
          } else {
            setupdateLoad(false);
            setpassworderrorMsg("Password Doesn't Matches");
          }
        } else {
          setupdateLoad(false);
          setotpError(true);
          setotperrorMsg("Please Enter OTP Correctly!");
          setTimeout(() => {
            setotpError(false);
            setotperrorMsg("");
          }, 5000);
        }
      } else {
        setupdateLoad(false);
        setemailError(true);
        setemailerrorMsg("Please Enter Email to Receive OTP!");
        setTimeout(() => {
          setemailError(false);
          setemailerrorMsg("");
        }, 5000);
      }
    } else {
      setupdateLoad(false);
      setemailError(true);
      setemailerrorMsg("Invalid Email!");
      setTimeout(() => {
        setemailError(false);
        setemailerrorMsg("");
      }, 5000);
    }
  };
  return (
    <>
      <Helmet>
        <title>Recovery | Bookshlf</title>
      </Helmet>
      <Stack
        className="password-recovery-bg"
        sx={{
          backgroundColor: "rgb(35, 47, 62)",
          width: "100%",
          minHeight: "100vh",
        }}
        alignItems="center"
        spacing={1}
      >
        <Stack sx={{ width: "100%", padding: "0px 10px" }}>
          <TabContext value={"2"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handelNav} aria-label="admin-tabList">
                <Tab
                  label="Home"
                  icon={<HomeIcon sx={{ height: 15, width: 15 }} />}
                  value="1"
                  className={classes.root}
                  sx={{
                    color: "whitesmoke",
                    fontSize: "12px",
                    minHeight: 0,
                    padding: "9px 0px",
                  }}
                  iconPosition="start"
                />
                <Tab
                  label="Recovery"
                  icon={<RecoveryIcon sx={{ height: 15, width: 15 }} />}
                  value="2"
                  className={classes.root}
                  sx={{
                    color: "whitesmoke",
                    fontSize: "12px",
                    minHeight: 0,
                    padding: "9px 0px",
                  }}
                  iconPosition="start"
                />
                <Tab
                  label="Login"
                  icon={<LoginIcon sx={{ height: 15, width: 15 }} />}
                  value="3"
                  className={classes.root}
                  sx={{
                    color: "whitesmoke",
                    fontSize: "12px",
                    minHeight: 0,
                    padding: "9px 0px",
                  }}
                  iconPosition="start"
                />
              </TabList>
            </Box>
          </TabContext>
        </Stack>
        <Avatar
          src="/images/smallLogoView.png"
          variant="rounded"
          sx={{ height: 60, width: 60 }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Staatliches",
            color: "whitesmoke",
            letterSpacing: "2px",
          }}
          align="center"
        >
          Bookshlf
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Staatliches",
            color: "whitesmoke",
            letterSpacing: "2px",
          }}
          align="center"
        >
          Password Recovery
        </Typography>
        <Stack
          sx={{ width: "100%", maxWidth: 800, padding: " 0px 10px" }}
          spacing={2}
          direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
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
              endAdornment: (
                <InputAdornment position="end">
                  {emailError ? <ErrorIcon color="error" /> : <></>}
                </InputAdornment>
              ),
            }}
            helperText={
              emailError ? emailerrorMsg : "Enter Your Registered Email"
            }
            variant="standard"
            error={emailError}
            fullWidth
            sx={{ fontSize: "12px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoadingButton
            className={classes.root}
            loading={otpLoad}
            loadingPosition="end"
            endIcon={otpsentIcon ? <CheckCircle /> : <SendIcon />}
            color="success"
            size="small"
            variant="contained"
            sx={{ minWidth: 150 }}
            onClick={handelSendOtp}
            disabled={otpsentIcon}
          >
            {otpsentIcon
              ? "OTP Sent"
              : otpsent === 0
              ? "Send Otp"
              : "Send Again"}
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
            maxWidth: 800,
            padding: "10px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
          }}
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            {lock ? (
              <LockedIcon color="success" sx={{ height: 32, width: 32 }} />
            ) : (
              <UnlockedIcon color="error" sx={{ height: 32, width: 32 }} />
            )}
          </Typography>

          <Stack id="otp" direction="row" spacing={1} justifyContent="center">
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
            autoComplete="off"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Stack>
        {otpsent ? (
          <Alert
            severity="info"
            variant="filled"
            sx={{
              fontFamily: "PT sans",
              fontSize: "12px",
              padding: "0px 10px",
            }}
          >
            Didn't Recieve OTP ? Check You Mail Spam!
          </Alert>
        ) : null}
        {otpError ? (
          <Alert
            severity="error"
            variant="filled"
            size="small"
            sx={{
              fontFamily: "PT sans",
              fontSize: "12px",
              padding: "0px 10px",
            }}
          >
            {otperrorMsg}
          </Alert>
        ) : null}
        <Stack
          sx={{ width: "100%", maxWidth: 800, padding: "0px 10px" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            className={classes.root}
            label="Password"
            type={showpassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle-password-visibility"
                    onClick={handleShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {showpassword ? (
                      <Visibility color="success" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Enter Your New Password"
            variant="standard"
            fullWidth
            sx={{ fontSize: "12px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Stack
          sx={{ width: "100%", maxWidth: 800, padding: "0px 10px" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            className={classes.root}
            label="Verify Password"
            type={showpassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {newpassword.length === 0 ? (
                    <PasswordIcon color="primary" />
                  ) : passwordMatch ? (
                    <CheckCircle color="success" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle-password-visibility"
                    onClick={handleShowPassword}
                    edge="end"
                    size="small"
                  >
                    {showpassword ? (
                      <Visibility color="success" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={
              newpassword.length === 0
                ? "Again Enter Password to Verify"
                : passworderrorMsg
            }
            color={
              newpassword.length === 0
                ? "primary"
                : passwordMatch
                ? "success"
                : "error"
            }
            variant="standard"
            fullWidth
            sx={{ fontSize: "12px" }}
            value={newpassword}
            onChange={handleVerifyPassword}
          />
        </Stack>
        <LoadingButton
          className={classes.root}
          color="primary"
          variant="contained"
          loading={updateLoad}
          endIcon={<UpdateIcon />}
          loadingPosition="end"
          onClick={handelUpdatePassword}
        >
          Update Password
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
      </Stack>
    </>
  );
};
export default ForgotPassword;
