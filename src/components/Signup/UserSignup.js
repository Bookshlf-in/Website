import { React, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";
import axios from "../../axios";
import * as EmailValidator from "email-validator";
import "./Signup.css";

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
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import SignupIcon from "@mui/icons-material/GroupAddRounded";
import EmailIcon from "@mui/icons-material/EmailRounded";
import NameIcon from "@mui/icons-material/AccountCircleRounded";
import PasswordIcon from "@mui/icons-material/PasswordRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
});

const UserSignup = () => {
  const history = useHistory();
  const classes = useStyles();

  // Handeling SignUP Navbar
  const handelNav = (e, value) => {
    if (value === "1") history.push("/");
    if (value === "2") history.push("/Login");
    if (value === "3") history.push("/Signup");
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
          spacing={2}
          direction="row"
        >
          <TextField
            className={classes.root}
            label="First Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon color="primary" />
                </InputAdornment>
              ),
              // endAdornment: (
              //   <InputAdornment position="end">
              //     {emailError ? <ErrorIcon color="error" /> : <></>}
              //   </InputAdornment>
              // ),
            }}
            // helperText={emailError ? emailerrorMsg : "Enter Your Email"}
            variant="filled"
            // error={emailError}
            fullWidth
            sx={{ fontSize: "12px" }}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.root}
            label="Last Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon color="primary" sx={{ opacity: 0 }} />
                </InputAdornment>
              ),
              // endAdornment: (
              //   <InputAdornment position="end">
              //     {emailError ? <ErrorIcon color="error" /> : <></>}
              //   </InputAdornment>
              // ),
            }}
            // helperText={emailError ? emailerrorMsg : "Enter Your Email"}
            variant="filled"
            // error={emailError}
            fullWidth
            sx={{ fontSize: "12px" }}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
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
              // endAdornment: (
              //   <InputAdornment position="end">
              //     {emailError ? <ErrorIcon color="error" /> : <></>}
              //   </InputAdornment>
              // ),
            }}
            // helperText={emailError ? emailerrorMsg : "Enter Your Email"}
            variant="filled"
            // error={emailError}
            fullWidth
            sx={{ fontSize: "12px" }}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
        <Stack sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}>
          <TextField
            className={classes.root}
            label="Password"
            // type={showpassword ? "text" : "password"}
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
                    // onClick={handleShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {false ? (
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
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Stack sx={{ width: "100%", maxWidth: 420, padding: "0px 10px" }}>
          <TextField
            className={classes.root}
            label="Password"
            // type={showpassword ? "text" : "password"}
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
                    // onClick={handleShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {false ? (
                      <Visibility color="success" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Verify Entered Password"
            variant="filled"
            fullWidth
            sx={{ fontSize: "12px" }}
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
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
            // loading={loginLoad}
            endIcon={<SignupIcon />}
            loadingPosition="end"
            // onClick={handelLogin}
          >
            Register
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
};

export default UserSignup;
