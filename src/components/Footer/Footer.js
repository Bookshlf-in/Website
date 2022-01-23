import { React, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";
import * as EmailValidator from "email-validator";
import "./Footer.css";

// Components
import { Stack, Snackbar, Alert, CircularProgress } from "@mui/material";
import { TextField, Typography, Button, IconButton } from "@mui/material";

// Icons
import SubscribeIcon from "@mui/icons-material/MarkEmailRead";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Links
const YOUTUBE_URL = "https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ";
const FACEBOOK_URL = "https://www.facebook.com/Bookshlf-109479771200918";
const LINKEDIN_URL = "https://www.linkedin.com/in/bookshlf-by-aman-861073223/";
const INSTAGRAM_URL = "https://twitter.com/BookshlfA";

// Use Styles
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    fontFamily: "PT sans !important",
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
    },
  },
}));

// Footer App starts here
const Footer = () => {
  const classes = useStyles();

  const Year = new Date().getFullYear();

  // Opening Links
  const OpenLink = (link) => {
    window.open(link, "_blank").focus();
  };

  // Alert Messages
  var messages = {
    Success: "Successfully Subscribed!",
    Info: "You Are Already Subscribed!",
    Warning: "Something Went Wrong Please Try Again!",
    Error: "Incorrect Email!",
  };

  // All states
  const [Email, changeEmail] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState(messages.Success);
  const [loading, setLoading] = useState(false);

  // Handeling subscription
  const handelSubscription = () => {
    // console.log(Email);
    if (Email !== null) {
      if (EmailValidator.validate(Email)) {
        setLoading(true);
        axios
          .post("/newsletterSubscribe", {
            email: Email,
          })
          .then(function (response) {
            if (response.data.msg === "Added subscription") {
              setOpen(true);
              setSeverity("success");
              setAlert(messages.Success);
            } else {
              setOpen(true);
              setSeverity("warning");
              setAlert(messages.Warning);
            }
            setLoading(false);
          })
          .catch(function (error) {
            //   Bad Request or Already subscribed
            if (error.response) {
              if (error.response.data.error === "Already subscribed") {
                setOpen(true);
                setSeverity("info");
                setAlert(messages.Info);
              }
            } else {
              setOpen(true);
              setSeverity("warning");
              setAlert(messages.Warning);
            }
            setLoading(false);
          });
      } else {
        // Invalid Email
        setOpen(true);
        setSeverity("error");
        setAlert(messages.Error);
      }
    } else {
      // Invalid Email
      setOpen(true);
      setSeverity("error");
      setAlert(messages.Error);
    }
  };

  // Handeling snackbar closing
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack className="footer-container">
      <Stack className="footer-subscription" alignItems="center">
        <Typography align="center">
          <strong>Join Our Newsletter </strong>
        </Typography>
        <Typography align="center" variant="caption">
          <strong>
            Signup to be the first to hear about exclusive deals, special offers
            and upcoming collections
          </strong>
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <TextField
            className={classes.root}
            variant="outlined"
            color="warning"
            size="small"
            type="email"
            label="Email"
            onChange={(e) => changeEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handelSubscription();
              }
            }}
            fullWidth
            sx={{ maxWidth: 300 }}
          />
          <Button
            endIcon={
              loading ? (
                <CircularProgress color="inherit" size={15} />
              ) : (
                <SubscribeIcon color="inherit" />
              )
            }
            onClick={handelSubscription}
            variant="contained"
            color="success"
          >
            Subsribe
          </Button>
        </Stack>
      </Stack>
      <Stack
        sx={{ padding: "0px 24px" }}
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        spacing={2}
      >
        <Stack
          sx={{ padding: "10px 0px" }}
          spacing={1}
          justifyContent={{
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
            lg: "flex-start",
          }}
          alignItems={{
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
            lg: "flex-start",
          }}
        >
          <img src="/images/logo.png" alt="bookhlf.in" width="120px" />
          <Typography variant="caption" sx={{ color: "white" }}>
            IIIT Lucknow, Ahmamau 226002 UP, India
          </Typography>
          <Typography variant="caption" sx={{ color: "white" }}>
            +91 97926 66122
          </Typography>
          <Button
            href="mailto:bookshlf.in@gmail.com "
            target="_blank"
            size="small"
            sx={{
              fontSize: "12px",
              color: "white",
              minWidth: 0,
              padding: 0,
              justifyContent: "flex-start",
            }}
          >
            bookshlf.in@gmail.com
          </Button>
          <Stack spacing={1} direction="row">
            <IconButton
              aria-label="facebook"
              onClick={() => OpenLink(FACEBOOK_URL)}
              size="small"
            >
              <FacebookIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton
              size="small"
              aria-label="instagram"
              onClick={() => OpenLink(INSTAGRAM_URL)}
            >
              <InstagramIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton
              size="small"
              aria-label="youtube"
              onClick={() => OpenLink(YOUTUBE_URL)}
            >
              <YouTubeIcon sx={{ color: "white" }} />
            </IconButton>

            <IconButton
              size="small"
              aria-label="linkedin"
              onClick={() => OpenLink(LINKEDIN_URL)}
            >
              <LinkedInIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={2}
          sx={{ width: "100%", padding: "10px 0px" }}
          justifyContent="space-evenly"
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-evenly"
            sx={{ width: "100%" }}
          >
            <Stack className="footer-link-items">
              <h4>Explore</h4>
              <Link to="/About">About Us</Link>
              <Link to="/Sitemap">Sitemap</Link>
              <Link to="/Login">Sign in</Link>
              <Link to="/Signup">Join Us</Link>
            </Stack>
            <Stack className="footer-link-items">
              <h4>Customer Service</h4>
              <Link to="/">Returns</Link>
              <Link to="/Contact">Report Product</Link>
              <Link to="/">Accessibility</Link>
              <Link to="/Contact">Contact Us</Link>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-evenly"
            sx={{ width: "100%" }}
          >
            <Stack className="footer-link-items">
              <h4>Policy</h4>
              <Link to="/">Return Policy</Link>
              <Link to="/TermsofUse&PrivacyPolicy" target="_blank">
                Terms Of Use
              </Link>
              <Link to="/">Security</Link>
              <Link to="/">Privacy</Link>
            </Stack>
            <Stack className="footer-link-items">
              <h4>Categories</h4>
              <Link to="/SearchResult/tag:JEE">JEE Mains</Link>
              <Link to="/SearchResult/tag:Neet">NEET PG</Link>
              <Link to="/SearchResult/tag:Jee Advanced">JEE Advanced</Link>
              <Link to="/SearchResult/School">High School</Link>
              <Link to="/SearchResult/Programming">Programming</Link>
              <Link to="/SearchResult/tag:Novel">Novels</Link>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <div className="footer-container3">
        &copy; {Year} BookShlf. All Rights Reserved
      </div>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            className={classes.root}
            variant="filled"
          >
            {alert}
          </Alert>
        </Snackbar>
      </div>
    </Stack>
  );
};
export default Footer;
