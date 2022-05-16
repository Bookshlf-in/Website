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
const INSTAGRAM_URL = "https://instagram.com/_bookshlf";

// Use Styles
const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Montserrat",
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
        <Typography align="center" className={classes.root}>
          Join Our Newsletter
        </Typography>
        <Typography align="center" variant="caption" className={classes.root}>
          Signup to be the first to hear about exclusive deals, special offers
          and upcoming collections
        </Typography>
        {/* <Stack
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
            disabled={loading}
          >
            Subsribe
          </Button>
        </Stack> */}
      </Stack>
      <Stack
        sx={{ padding: "0px 24px" }}
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        spacing={2}
      >
        <Stack
          sx={{ padding: "10px 0px" }}
          spacing={0}
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
          <Typography
            variant="body1"
            sx={{ color: "white" }}
            className={classes.root}
          >
            Contact
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "white" }}
            className={classes.root}
          >
            IIIT Lucknow, Ahmamau 226002 UP, India
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => OpenLink("tel:9792666122")}
            className={classes.root}
          >
            +91 97926 66122
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            onClick={() => OpenLink("mailto:bookshlf.in@gmail.com")}
            sx={{ cursor: "pointer" }}
            className={classes.root}
          >
            bookshlf.in@gmail.com
          </Typography>
          <Stack spacing={1} direction="row">
            <IconButton
              aria-label="facebook"
              onClick={() => OpenLink(FACEBOOK_URL)}
              size="small"
              color="warning"
            >
              <FacebookIcon sx={{ height: 16, width: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              aria-label="instagram"
              onClick={() => OpenLink(INSTAGRAM_URL)}
              color="warning"
            >
              <InstagramIcon sx={{ height: 16, width: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              aria-label="youtube"
              onClick={() => OpenLink(YOUTUBE_URL)}
              color="warning"
            >
              <YouTubeIcon sx={{ height: 16, width: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              aria-label="linkedin"
              onClick={() => OpenLink(LINKEDIN_URL)}
              color="warning"
            >
              <LinkedInIcon sx={{ height: 16, width: 16 }} />
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
              <Typography variant="h6" className={classes.root}>
                Explore
              </Typography>
              <Link to="/About" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  About Us
                </Typography>
              </Link>
              <Link to="/sitemap.xml" target="_blank" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Sitemap
                </Typography>
              </Link>
              <Link to="/Login" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Sign in
                </Typography>
              </Link>
              <Link to="/Signup" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Join Us
                </Typography>
              </Link>
            </Stack>
            <Stack className="footer-link-items">
              <Typography variant="h6" className={classes.root}>
                Customer Service
              </Typography>
              <Link to="/" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Returns
                </Typography>
              </Link>
              <Link to="/Contact" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Report Product
                </Typography>
              </Link>
              <Link to="/" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Accessibility
                </Typography>
              </Link>
              <Link to="/Contact" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Contact Us
                </Typography>
              </Link>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-evenly"
            sx={{ width: "100%" }}
          >
            <Stack className="footer-link-items">
              <Typography variant="h6" className={classes.root}>
                Policy
              </Typography>
              <Link to="/" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Return Policy
                </Typography>
              </Link>
              <Link
                to="/TermsofUsePrivacyPolicy"
                target="_blank"
                className="cool-link"
              >
                <Typography variant="caption" className={classes.root}>
                  Terms Of Use
                </Typography>
              </Link>
              <Link to="/" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Security
                </Typography>
              </Link>
              <Link to="/" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Privacy
                </Typography>
              </Link>
            </Stack>
            <Stack className="footer-link-items">
              <Typography variant="h6" className={classes.root}>
                Categories
              </Typography>
              <Link to="/SearchResult/tag:JEE" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  JEE Mains
                </Typography>
              </Link>
              <Link to="/SearchResult/tag:Neet" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  NEET UG
                </Typography>
              </Link>
              <Link to="/SearchResult/tag:Jee Advanced" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  JEE Advanced
                </Typography>
              </Link>
              <Link to="/SearchResult/tag:CBSE" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  High School
                </Typography>
              </Link>
              <Link to="/SearchResult/tag:Programming" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Programming
                </Typography>
              </Link>
              <Link to="/SearchResult/tag:Novel" className="cool-link">
                <Typography variant="caption" className={classes.root}>
                  Novels
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        className="footer-container3"
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="caption" className={classes.root}>
          &copy; {Year} BookShlf
        </Typography>
        <img src="/images/india.png" height="16px" />
        <Typography variant="caption" className={classes.root}>
          All Rights Reserved
        </Typography>
      </Stack>
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
