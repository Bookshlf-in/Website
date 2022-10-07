import { React, useState, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios";

// MUI Components
import { Stack, Typography, Button } from "@mui/material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Collapse, CircularProgress, Alert } from "@mui/material";

// MUI Icons
import NameIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Contact Component
const Contact = () => {
  const [user] = useContext(UserContext);
  const [isLoggedIn, setisLoggedIn] = useState(user !== null);
  const [Load, setLoad] = useState(false);

  const [queryType, setQueryType] = useState("");
  const [orderId, setOrderId] = useState("");
  const [number, setNumber] = useState("");

  const [msgParam, setMsgParam] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleQueryChange = (e) => {
    setQueryType(e.target.value);
    setOpen(true);
  };

  const sendMessage = () => {
    setLoad(true);
    if (msgParam.subject === "Order Help")
      msgParam.message = `orderID : ${orderId}` + " " + msgParam.message;
    msgParam.message = `Ph : ${number}` + " " + msgParam.message;

    console.log(msgParam);
    axios
      .post("/sendMessage", msgParam)
      .then((res) => {
        setLoad(false);
        setAlertMsg("Message Sent Succesfully!");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoad(false);
        setAlertMsg("ERR");
      });
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
          height: "100%",
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
              startIcon={<CallIcon />}
              sx={{ maxWidth: 200 }}
              color="warning"
              onClick={() => window.open("tel:+91 97926 66122", "_blank")}
            >
              <Typography variant="body2">+91 97926 66122</Typography>
            </Button>
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
            bgcolor: "rgb(255,255,255)",
            padding: "25px",
            borderRadius: "15px",
            width: "100%",
            maxWidth: "600px",
          }}
          spacing={2}
        >
          {!isLoggedIn ? (
            <>
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
                onChange={(e) =>
                  setMsgParam({ ...msgParam, name: e.target.value })
                }
                value={msgParam.name}
              />
              <TextField
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
                onChange={(e) =>
                  setMsgParam({ ...msgParam, email: e.target.value })
                }
                value={msgParam.email}
              />
            </>
          ) : null}
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
            sx={{ minWidth: 300 }}
            helperText="Enter 10 Digit Mobile Number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          <FormControl fullWidth>
            <InputLabel id="contact-query-type">Query Type</InputLabel>
            <Select
              labelId="contact-query-type"
              label="Query Type"
              onChange={(e) => {
                handleQueryChange(e);
                setMsgParam({ ...msgParam, subject: e.target.value });
              }}
              value={queryType}
            >
              <MenuItem value={"General Query"}>General Query</MenuItem>
              <MenuItem value={"Order Help"}>Order Help</MenuItem>
              <MenuItem value={"Feedback"}>Feedback</MenuItem>
            </Select>
          </FormControl>
          <Collapse in={open}>
            {queryType === "General Query" ? (
              <TextField
                variant="outlined"
                multiline
                minRows={5}
                label="Your Query"
                fullWidth
                onChange={(e) =>
                  setMsgParam({ ...msgParam, message: e.target.value })
                }
                value={msgParam.message}
              />
            ) : queryType === "Order Help" ? (
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  label="Order Id"
                  helperText="24 digit Order Id"
                  onChange={(e) => setOrderId(e.target.value)}
                  value={orderId}
                />
                <TextField
                  variant="outlined"
                  multiline
                  minRows={5}
                  label="Your Message"
                  onChange={(e) =>
                    setMsgParam({ ...msgParam, message: e.target.value })
                  }
                  value={msgParam.message}
                />
              </Stack>
            ) : (
              <TextField
                variant="outlined"
                multiline
                minRows={5}
                label="Your Feedback"
                onChange={(e) =>
                  setMsgParam({ ...msgParam, message: e.target.value })
                }
                value={msgParam.message}
                fullWidth
              />
            )}
            <Button
              sx={{ marginTop: "10px" }}
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
          </Collapse>
          {alertMsg.length ? (
            alertMsg === "ERR" ? (
              <Alert variant="outlined" color="error" severity="error">
                Some Error Occured Please Try Again!
              </Alert>
            ) : (
              <Alert color="success" severity="success">
                Message Sent!. We Will get back to you soon.
              </Alert>
            )
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Contact;
