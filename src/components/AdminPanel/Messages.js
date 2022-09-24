import { React, useState } from "react";
import axios from "../../axios";

// components
import { Box, Stack, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
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
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const Messages = () => {
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
      .get(`/admin-getMessageList?page=${pageNo}&noOfMessagesInOnePage=6`)
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
          onClick={() => handelgetMessages(1)}
          size="small"
        >
          Fetch Messages
        </LoadingButton>

        <FormGroup size="small">
          <FormControlLabel
            control={
              <Switch
                checked={shownotseen}
                onChange={(e, value) => {
                  setshownotseen((prev) => !prev);
                  handelfilterMessages(value);
                }}
                color="success"
              />
            }
            label="Show Not Seen Messages"
            labelPlacement="right"
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
          />
        </Stack>
      ) : null}
      <Grid container spacing={2}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message, index) => (
            <Grid
              Item
              lg={4}
              md={4}
              sm={6}
              xs={12}
              sx={{ padding: "10px", height: 300 }}
              key={message._id}
            >
              <Box
                sx={{
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  height: "100%",
                }}
              >
                <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                  <Stack
                    direction="row"
                    sx={{ width: "100%" }}
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <TextField
                      label="Email"
                      fullWidth
                      readOnly
                      variant="filled"
                      value={message.email}
                      size="small"
                      sx={{ input: { fontSize: "12px" } }}
                    />
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handelDeleteMessages(message._id)}
                      size="small"
                    >
                      {message._id === msgdeleteId ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        <DeleteIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: "100%" }}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      label="Subject"
                      fullWidth
                      readOnly
                      variant="filled"
                      value={message.subject}
                      sx={{ input: { fontSize: "12px" } }}
                    />
                    <IconButton
                      aria-label="delete"
                      color="success"
                      onClick={() => {
                        handelReadMessages(message._id, message.read);
                      }}
                      size="small"
                    >
                      {msgreadId === message._id ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : message.read ? (
                        <CheckIcon fontSize="inherit" />
                      ) : (
                        <CheckCircleIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: "100%" }}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      label="Message"
                      fullWidth
                      readOnly
                      multiline
                      maxRows={6}
                      variant="filled"
                      value={message.message}
                      sx={{ textarea: { fontSize: "11px" } }}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))
        ) : (
          <Alert severity="error" color="warning">
            No Messages in this Page
          </Alert>
        )}
      </Grid>
    </Stack>
  );
};

export default Messages;
