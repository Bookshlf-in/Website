import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "../../api/axios";

// MUI Components
import { Stack, Typography, Button } from "@mui/material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Collapse, CircularProgress, Alert } from "@mui/material";

// MUI Icons
import NameIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import SubjectIcon from "@mui/icons-material/Subject";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Contact Component
const Contact = () => {
  // User Context
  const [user] = useContext(UserContext);

  // loader states
  const [isLoggedIn] = useState(!!user);
  const [Load, setLoad] = useState(false);
  const [open, setOpen] = useState(true);
  const [errorParam, setErrorParam] = useState([]);

  // data states
  const [userProfile, setUserProfile] = useState({});
  const [alert, setAlert] = useState({});
  const [msgParam, setMsgParam] = useState({
    name: "",
    email: "",
    subject: "",
    phoneNo: "",
    queryType: "GENERAL",
    message: "",
  });

  const getUserProfile = () => {
    axios.get("/getUserProfile").then((response) => {
      setUserProfile(response.data);
      setMsgParam({
        ...msgParam,
        name: response.data.name,
        email: response.data.email,
      });
    });
  };

  useEffect(() => {
    if (user) {
      getUserProfile();
    }
  }, [user]);

  const sendMessage = () => {
    setLoad(true);
    console.log(msgParam);
    axios
      .post("/sendMessage", msgParam)
      .then((res) => {
        setLoad(false);
        setAlert({
          show: true,
          type: true,
          msg: "Message Sent Succesfully!",
        });
        setOpen(false);
        setErrorParam([]);
        checkError("");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrorParam(err.response.data.errors);
        setLoad(false);
        setAlert({
          show: true,
          type: false,
          msg: "Please try again",
        });
      });
  };

  const handleChange = (e) => {
    setMsgParam({ ...msgParam, [e.target.name]: e.target.value });
  };

  const checkError = (param) => {
    return errorParam.find((error) => error.param === param) !== undefined;
  };

  return (
    <Stack
      sx={{
        bgcolor: "rgb(158,196,251)",
        minHeight: "calc(100vh - 48px)",
        padding: "15px 24px",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        sx={{
          bgcolor: "rgb(2,4,74)",
          minHeight: "calc(100vh - 78px)",
          width: "100%",
          maxWidth: "1366px",
          borderRadius: "25px",
          padding: "15px",
        }}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
      >
        <Stack sx={{ color: "whitesmoke" }} spacing={1}>
          <Typography
            variant="h3"
            sx={{ fontFamily: "Staatliches", letterSpacing: "5px" }}
          >
            <strong>Bookshlf</strong>
          </Typography>
          <Typography variant="body2">
            Fill up the form and our Team will get back to you in 24 hrs.
          </Typography>
          <Typography variant="body2">
            You can also drop us a mail or Whatsapp us.
          </Typography>
          <Stack spacing={3} sx={{ padding: "25px 0px" }}>
            <Button
              variant="outlined"
              startIcon={<MailIcon />}
              sx={{ maxWidth: 200, textTransform: "none" }}
              color="warning"
              onClick={() =>
                window.open("mailto:contact@bookshlf.in", "_blank")
              }
            >
              <Typography variant="caption">contact@bookshlf.in</Typography>
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconButton
              color="warning"
              size="large"
              sx={{
                border: "1px solid transparent",
                "&:hover": { border: "1px solid #ed6c02" },
              }}
              onClick={() =>
                window.open(
                  "https://wa.me/9792666122?text=Hi I want Help",
                  "_blank"
                )
              }
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton
              color="warning"
              size="large"
              sx={{
                border: "1px solid transparent",
                "&:hover": { border: "1px solid #ed6c02" },
              }}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/bookshlf-in",
                  "_blank"
                )
              }
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="warning"
              size="large"
              sx={{
                border: "1px solid transparent",
                "&:hover": { border: "1px solid #ed6c02" },
              }}
              onClick={() =>
                window.open("mailto:contact@bookshlf.in", "_blank")
              }
            >
              <MailIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Stack
          sx={{
            bgcolor: "rgba(255,255,255)",
            padding: "25px",
            borderRadius: "15px",
            width: "100%",
            maxWidth: "600px",
          }}
          spacing={2}
        >
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon sx={{ fontSize: 12 }} />
                </InputAdornment>
              ),
            }}
            label="Name"
            sx={{ minWidth: 300 }}
            onChange={handleChange}
            name="name"
            value={msgParam?.name}
            disabled={isLoggedIn}
            error={checkError("name")}
          />
          <TextField
            type="email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon sx={{ fontSize: 12 }} />
                </InputAdornment>
              ),
            }}
            label="Mail"
            sx={{ minWidth: 300 }}
            onChange={handleChange}
            name="email"
            value={msgParam?.email}
            disabled={isLoggedIn}
            error={checkError("email")}
          />
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SubjectIcon sx={{ fontSize: 12 }} />
                </InputAdornment>
              ),
            }}
            label="Subject"
            helperText="A small title of your query"
            onChange={handleChange}
            name="subject"
            value={msgParam?.subject}
            error={checkError("subject")}
          />
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CallIcon sx={{ fontSize: 12 }} />
                </InputAdornment>
              ),
            }}
            label="Contact Number"
            helperText="Enter 10 Digit Mobile Number"
            onChange={handleChange}
            name="phoneNo"
            value={msgParam?.phoneNo}
            error={checkError("phoneNo")}
          />
          <FormControl fullWidth>
            <InputLabel id="contact-query-type">Query Type</InputLabel>
            <Select
              labelId="contact-query-type"
              label="Query Type"
              onChange={(e) => {
                handleChange(e);
                setOpen(true);
              }}
              name="queryType"
              value={msgParam.queryType ? msgParam.queryType : "General Query"}
              error={checkError("queryType")}
            >
              <MenuItem value={"GENERAL"}>General Query</MenuItem>
              <MenuItem value={"ORDER_HELP"}>Order Help</MenuItem>
              <MenuItem value={"FEEDBACK"}>Feedback</MenuItem>
            </Select>
          </FormControl>
          <Collapse in={open}>
            {msgParam?.queryType === "GENERAL" ? (
              <TextField
                variant="outlined"
                multiline
                minRows={5}
                label="Your Query"
                fullWidth
                onChange={handleChange}
                name="message"
                value={msgParam?.message}
                error={checkError("message")}
              />
            ) : msgParam?.queryType === "ORDER_HELP" ? (
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  label="Order Id"
                  helperText="24 digit Order Id"
                  onChange={handleChange}
                  name="orderId"
                  value={msgParam.orderId ? msgParam.orderId : ""}
                  error={checkError("orderId")}
                />
                <TextField
                  variant="outlined"
                  multiline
                  minRows={5}
                  label="Your Message"
                  onChange={handleChange}
                  name="message"
                  value={msgParam?.message}
                  error={checkError("message")}
                />
              </Stack>
            ) : msgParam?.queryType === "FEEDBACK" ? (
              <TextField
                variant="outlined"
                multiline
                minRows={5}
                label="Your Feedback"
                onChange={handleChange}
                name="message"
                value={msgParam?.message}
                fullWidth
                error={checkError("message")}
              />
            ) : null}
          </Collapse>
          <Button
            sx={{ marginTop: "10px", maxWidth: 100 }}
            variant="outlined"
            color="success"
            endIcon={
              Load ? <CircularProgress size={15} color="inherit" /> : null
            }
            disabled={Load}
            onClick={sendMessage}
          >
            Send
          </Button>
          {alert && alert.show && (
            <Alert severity={alert.type ? "success" : "error"}>
              {alert.msg}
            </Alert>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Contact;
