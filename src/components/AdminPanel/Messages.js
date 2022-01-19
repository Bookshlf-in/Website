import { React, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// icons
import LoadIcon from "@mui/icons-material/AutorenewRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
    "& textarea": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
    "& button": {
      "&:hover": {
        color: "black !important",
      },
    },
    "& span": {
      fontFamily: "PT sans !important",
      fontSize: "12px",
    },
    "& ul": {
      "& li": {
        "& button": {
          fontFamily: "PT sans !important",
        },
      },
    },
  },
});

const Messages = () => {
  const classes = useStyles();

  // functionality States
  const [shownotseen, setshownotseen] = useState(false);
  const [msgload, setmsgload] = useState(false);
  const [msgdeleteId, setmsgdeleteId] = useState("");
  const [msgreadId, setmsgreadId] = useState("");

  // data states
  const [messages, setmessages] = useState([]);
  const [filteredMessages, setfilteredMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [Page, setpage] = useState(1);

  // fetching Messages
  const handelgetMessages = (pageNo) => {
    setmsgload(true);
    setpage(pageNo);
    axios
      .get(`/admin-getMessageList?page=${pageNo}&noOfMessagesInOnePage=3`)
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setmessages(response.data.data);
        setfilteredMessages(response.data.data);
        setmsgload(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setmsgload(false);
      });
  };

  // deleting Messages
  const handelDeleteMessages = (msgId) => {
    setmsgdeleteId(msgId);
    axios
      .delete("/admin-deleteMessage", { data: { messageId: msgId } })
      .then((response) => {
        setfilteredMessages(
          filteredMessages.filter((message) => message._id !== msgId)
        );
        setmessages(messages.filter((message) => message._id !== msgId));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // filtering messages
  const handelfilterMessages = (seen) => {
    if (seen) {
      setfilteredMessages(messages.filter((message) => message.read === false));
    } else {
      setfilteredMessages(messages);
    }
  };

  // Marking messages as Read or Unread
  const handelReadMessages = (Id, isRead) => {
    setmsgreadId(Id);
    if (!isRead) {
      axios
        .post("/admin-markMessageAsRead", {
          messageId: Id,
        })
        .then((response) => {
          setmsgreadId("");
          setfilteredMessages(
            filteredMessages.map((message) =>
              message._id === Id ? { ...message, read: true } : message
            )
          );
          setmessages(
            messages.map((message) =>
              message._id === Id ? { ...message, read: true } : message
            )
          );
          if (shownotseen) {
            handelfilterMessages();
          }
        })
        .catch((error) => {
          setmsgreadId("");
        });
    } else {
      axios
        .post("/admin-markMessageAsUnread", {
          messageId: Id,
        })
        .then((response) => {
          setmsgreadId("");
          setfilteredMessages(
            filteredMessages.map((message) =>
              message._id === Id ? { ...message, read: false } : message
            )
          );
          setmessages(
            messages.map((message) =>
              message._id === Id ? { ...message, read: false } : message
            )
          );
        })
        .catch((error) => {
          setmsgreadId("");
        });
    }
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
      className="msg-container"
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "800px",
        }}
        justifyContent="space-evenly"
      >
        <LoadingButton
          loading={msgload}
          loadingPosition="start"
          startIcon={<LoadIcon />}
          variant="contained"
          className={classes.root}
          onClick={() => handelgetMessages(1)}
        >
          Fetch Messages
        </LoadingButton>

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={shownotseen}
                onChange={(e, value) => {
                  setshownotseen((prev) => !prev);
                  handelfilterMessages(value);
                }}
                color="error"
              />
            }
            label="Show Not Seen Messages"
            labelPlacement="bottom"
            className={classes.root}
          />
        </FormGroup>
      </Stack>
      {filteredMessages.length > 0 ? (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
          }}
          justifyContent="space-evenly"
        >
          <Pagination
            count={totalPages}
            page={Page}
            onChange={(e, pageNo) => {
              handelgetMessages(pageNo);
            }}
            color="primary"
            className={classes.root}
          />
        </Stack>
      ) : null}
      {filteredMessages.length > 0 ? (
        filteredMessages.map((message, index) => (
          <Box
            sx={{
              width: [300, 400, 800],
              boxShadow: "2px 3px 5px rgba(0,0,0,0.3)",
              borderRadius: "10px",
              cursor: "pointer",
              padding: "10px",
            }}
            key={index}
          >
            <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
              <Stack
                direction="row"
                sx={{ width: "100%" }}
                justifyContent="space-between"
                spacing={5}
              >
                <TextField
                  className={classes.root}
                  label="Email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FileCopyIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  readOnly
                  variant="filled"
                  value={message.email}
                />
                <IconButton
                  aria-label="delete"
                  color="error"
                  className={classes.root}
                  onClick={() => handelDeleteMessages(message._id)}
                >
                  {message._id === msgdeleteId ? (
                    <CircularProgress size="1em" color="inherit" />
                  ) : (
                    <DeleteIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Stack>
              <Stack
                direction="row"
                spacing={5}
                sx={{ width: "100%" }}
                justifyContent="space-evenly"
              >
                <TextField
                  className={classes.root}
                  label="Subject"
                  fullWidth
                  readOnly
                  variant="filled"
                  value={message.subject}
                />
                <IconButton
                  aria-label="delete"
                  color="success"
                  className={classes.root}
                  onClick={() => {
                    console.log(message.read);
                    handelReadMessages(message._id, message.read);
                  }}
                >
                  {msgreadId === message._id ? (
                    <CircularProgress size="1em" color="inherit" />
                  ) : message.read ? (
                    <CheckIcon />
                  ) : (
                    <CheckCircleIcon />
                  )}
                </IconButton>
              </Stack>
              <Stack
                direction="row"
                spacing={5}
                sx={{ width: "100%" }}
                justifyContent="space-evenly"
              >
                <TextField
                  className={classes.root}
                  label="Message"
                  fullWidth
                  readOnly
                  multiline
                  maxRows={4}
                  variant="filled"
                  value={message.message}
                />
              </Stack>
            </Stack>
          </Box>
        ))
      ) : (
        <Alert severity="error" className={classes.root} color="warning">
          No Messages in this Page
        </Alert>
      )}
    </Stack>
  );
};

export default Messages;
