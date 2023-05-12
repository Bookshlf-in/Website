import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { Helmet } from "react-helmet-async";
import axios from "../../../api/axios";
import * as EmailValidator from "email-validator";
import "./login.css";

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
import Button from "@mui/material/Button";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import EmailIcon from "@mui/icons-material/EmailRounded";
import PasswordIcon from "@mui/icons-material/PasswordRounded";
import SignupIcon from "@mui/icons-material/GroupAddRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const navigate = useNavigate();

  // context states
  const [, setUser] = useContext(UserContext);

  // Functionality States
  const [showpassword, setshowPassword] = useState(false);
  const [loginLoad, setloginLoad] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [emailerrorMsg, setemailerrorMsg] = useState("");
  const [passwordError, setpasswordError] = useState(false);
  const [passworderrorMsg, setpassworderrorMsg] = useState("");

  // data states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // showing and hiding password
  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  // Handeling Login Navbar
  const handelNav = (e, value) => {
    if (value === "1") navigate("/");
    if (value === "2") navigate("/Login");
    if (value === "3") navigate("/Signup");
  };

  // handeling Login
  const handelLogin = () => {
    setloginLoad(true);
    if (EmailValidator.validate(email)) {
      if (password !== "") {
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
              })
            );
            setUser({
              authHeader: `Bearer ${response.data.token}`,
              roles: response.data.roles,
              email: email,
              cartitems: 0,
              wishlist: 0,
              balance: 0,
            });
            setloginLoad(false);
            navigate("/");
          })
          .catch((error) => {
            setloginLoad(false);
            if (error.response.data.errors[0].param === "email") {
              setemailError(true);
              setemailerrorMsg(error.response.data.errors[0].error);
              setTimeout(() => {
                setemailError(false);
                setemailerrorMsg("");
              }, 5000);
            } else {
              setpasswordError(true);
              setpassworderrorMsg(error.response.data.errors[0].error);
              setTimeout(() => {
                setpasswordError(false);
                setpassworderrorMsg("");
              }, 5000);
            }
          });
      } else {
        setloginLoad(false);
        setpasswordError(true);
        setpassworderrorMsg("Password Cannot be Empty!");
        setTimeout(() => {
          setpasswordError(false);
          setpassworderrorMsg("");
        }, 5000);
      }
    } else {
      setloginLoad(false);
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
        <title>Login | Bookshlf</title>
      </Helmet>
      <Stack
        className="login-bg"
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
                  sx={{ color: "whitesmoke", fontSize: "12px", minHeight: 0 }}
                  iconPosition="start"
                />
                <Tab
                  label="Login"
                  icon={<LoginIcon sx={{ height: 15, width: 15 }} />}
                  value="2"
                  sx={{ color: "whitesmoke", fontSize: "12px", minHeight: 0 }}
                  iconPosition="start"
                />
                <Tab
                  label="SignUp"
                  icon={<SignupIcon sx={{ height: 15, width: 15 }} />}
                  value="3"
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
          Login
        </Typography>
        <Stack sx={{ width: "100%", maxWidth: 420, padding: "10px" }}>
          <TextField
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
            helperText={emailError ? emailerrorMsg : "Enter Your Email"}
            variant="standard"
            error={emailError}
            fullWidth
            sx={{ fontSize: "12px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </Stack>
        <Stack sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}>
          <TextField
            label="Password"
            type={showpassword ? "text" : "password"}
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
              passwordError ? passworderrorMsg : "Enter Your Password"
            }
            variant="standard"
            error={passwordError}
            fullWidth
            sx={{ fontSize: "12px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Stack
          sx={{ width: "100%", maxWidth: 420 }}
          justifyContent="flex-end"
          direction="row"
        >
          <Button
            onClick={() => navigate("/auth/recovery")}
            size="small"
            sx={{
              letterSpacing: "1px",
              fontFamily: "PT sans",
              fontSize: "12px",
              cursor: "pointer",
            }}
            color="warning"
          >
            Forgot Password ?
          </Button>
        </Stack>
        <Stack
          sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
          spacing={2}
        >
          <LoadingButton
            color="primary"
            variant="contained"
            loading={loginLoad}
            endIcon={<LoginIcon />}
            loadingPosition="end"
            onClick={handelLogin}
          >
            Login
          </LoadingButton>
          <Button
            onClick={() => navigate("/auth/signup")}
            color="secondary"
            variant="contained"
          >
            Create Account Instead ?
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
export default Login;