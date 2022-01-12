import { React, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";
import axios from "../../axios";
import * as EmailValidator from "email-validator";

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

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import SignupIcon from "@mui/icons-material/GroupAddRounded";
import EmailIcon from "@mui/icons-material/EmailRounded";
import NameIcon from "@mui/icons-material/AccountCircleRounded";
import PasswordIcon from "@mui/icons-material/PasswordRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircle from "@mui/icons-material/CheckCircleRounded";

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
      fontSize: "16px !important",
      letterSpacing: "1px !important",
    },
  },
});

const UserSignup = () => {
  const history = useHistory();
  const classes = useStyles();

  // Function States
  const [emailError, setemailError] = useState(false);
  const [emailErrorMsg, setemailErrorMsg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [showpassword, setshowPassword] = useState(false);
  const [signupLoad, setSignupLoad] = useState(false);

  // Data States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  // Handeling SignUP Navbar
  const handelNav = (e, value) => {
    if (value === "1") history.push("/");
    if (value === "2") history.push("/Login");
    if (value === "3") history.push("/Signup");
  };

  // checking if both input passwords are matching
  const handleVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
    if (password.length > 0 && password !== e.target.value) {
      setpasswordMatch(false);
    } else if (password.length > 0 && password === e.target.value) {
      setpasswordMatch(true);
    }
  };

  // handeling sign up
  const handelSignup = () => {
    setSignupLoad(true);
    if (name.length) {
      if (EmailValidator.validate(email)) {
        if (passwordMatch) {
          axios
            .post("/signUp", {
              name: name,
              email: email,
              password: password,
            })
            .then((response) => {
              setSignupLoad(false);
              history.push(`/Verify/${email}`);
            })
            .catch((error) => {
              setSignupLoad(false);
              if (error.response.data.errors[0].param === "email") {
                setemailError(true);
                setemailErrorMsg(error.response.data.errors[0].error);
                setTimeout(() => {
                  setemailError(false);
                  setemailErrorMsg("");
                }, 5000);
              }
            });
        }
      } else {
        setSignupLoad(false);
        setemailError(false);
        setTimeout(() => {
          setemailError(false);
        }, 5000);
      }
    } else {
      setSignupLoad(false);
      setNameError(true);
      setTimeout(() => {
        setNameError(false);
      }, 5000);
    }
  };
  return (
    <>
      <Helmet>
        <title>SignUp | Bookshlf</title>
      </Helmet>
      <Stack
        className="login-bg"
        sx={{
          backgroundColor: "rgb(35, 47, 62)",
          width: "100%",
          minHeight: "100vh",
        }}
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Stack sx={{ width: "100%", padding: "0px 10px" }}>
          <TabContext value={"3"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handelNav} aria-label="admin-tabList">
                <Tab
                  label="Home"
                  icon={<HomeIcon sx={{ height: 15, width: 15 }} />}
                  value="1"
                  className={classes.root}
                  sx={{ color: "whitesmoke", fontSize: "12px", minHeight: 0 }}
                  iconPosition="start"
                />
                <Tab
                  label="Login"
                  icon={<LoginIcon sx={{ height: 15, width: 15 }} />}
                  value="2"
                  className={classes.root}
                  sx={{ color: "whitesmoke", fontSize: "12px", minHeight: 0 }}
                  iconPosition="start"
                />
                <Tab
                  label="SignUp"
                  icon={<SignupIcon sx={{ height: 15, width: 15 }} />}
                  value="3"
                  className={classes.root}
                  sx={{ color: "whitesmoke", fontSize: "12px", minHeight: 0 }}
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
        >
          Register
        </Typography>
        <Stack
          sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}
          spacing={1}
          direction="row"
        >
          <TextField
            className={classes.root}
            label="Full Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {nameError ? <ErrorIcon color="error" /> : <></>}
                </InputAdornment>
              ),
            }}
            helperText={
              nameError ? "Name should be atleast 3 characters long" : null
            }
            variant="filled"
            error={nameError}
            fullWidth
            sx={{ fontSize: "12px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <Stack sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}>
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
              emailError
                ? emailErrorMsg
                : email.length === 0 && emailError
                ? "Incorrect Email"
                : null
            }
            variant="filled"
            error={emailError}
            fullWidth
            sx={{ fontSize: "12px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
        <Stack sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}>
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
                    onClick={() => setshowPassword((prev) => !prev)}
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
            helperText="Create New Password"
            variant="filled"
            fullWidth
            sx={{ fontSize: "12px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Stack sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}>
          <TextField
            className={classes.root}
            label="Password"
            type={showpassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {verifyPassword.length === 0 ? (
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
                    onClick={() => setshowPassword((prev) => !prev)}
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
              verifyPassword.length === 0
                ? "Enter Password to Verify"
                : passwordMatch
                ? "Password Matches"
                : "Password Doesn't Matches"
            }
            variant="filled"
            fullWidth
            color={
              verifyPassword.length === 0
                ? "primary"
                : passwordMatch
                ? "success"
                : "error"
            }
            sx={{ fontSize: "12px" }}
            value={verifyPassword}
            onChange={handleVerifyPassword}
          />
        </Stack>
        <Stack
          sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}
          spacing={2}
        >
          <LoadingButton
            className={classes.root}
            color="primary"
            variant="contained"
            loading={signupLoad}
            endIcon={<SignupIcon />}
            loadingPosition="end"
            onClick={handelSignup}
          >
            Register
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
};

export default UserSignup;
