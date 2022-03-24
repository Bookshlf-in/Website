import { React, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet-async";
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

  // Functionality States
  const [otpsent, setOtpsent] = useState(0);
  const [otpsentIcon, setOtpsentIcon] = useState(false);
  const [otpLoad, setotpLoad] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [emailerrorMsg, setemailerrorMsg] = useState("");
  const [otpError, setotpError] = useState(false);
  const [otperrorMsg, setotperrorMsg] = useState("");
  const [counter, setCounter] = useState(60);
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
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

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
          setCounter(60);
          setTimeout(() => {
            setOtpsentIcon(false);
            setOtpsent(1);
          }, 60000);
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
                for (let i = 0; i < error.response.data.errors.length; i++) {
                  if (error.response.data.errors[0].param === "otp") {
                    setotpError(true);
                    setotperrorMsg(error.response.data.errors[i].error);
                    setTimeout(() => {
                      setotpError(false);
                      setotperrorMsg("");
                    }, 5000);
                  }
                  if (error.response.data.errors[i].param === "password") {
                    setpasswordError(true);
                    setpassworderrorMsg(error.response.data.errors[i].error);
                    setTimeout(() => {
                      setpasswordError(false);
                      setpassworderrorMsg("");
                    }, 5000);
                  }
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
          paddingBottom: "10px",
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
          sx={{ width: "100%", maxWidth: 400, padding: " 0px 10px" }}
          spacing={2}
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
            onChange={(e) => setEmail(e.target.value.trim())}
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
            maxWidth: 300,
            width: "100%",
          }}
          spacing={1}
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
              }}
            />
          </label>
        </Stack>

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
          sx={{ width: "100%", maxWidth: 400, padding: "0px 10px" }}
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
              passwordError ? passworderrorMsg : "Enter Your New Password"
            }
            variant="standard"
            fullWidth
            sx={{ fontSize: "12px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </Stack>
        <Stack
          sx={{ width: "100%", maxWidth: 400, padding: "0px 10px" }}
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
        >
          <Stack spacing={2}>
            <CircularProgress color="inherit" />
            <Typography variant="h5">
              <strong>Signing In...</strong>
            </Typography>
          </Stack>
        </Backdrop>
      </Stack>
    </>
  );
};
export default ForgotPassword;
