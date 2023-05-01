import { useState } from "react";

// API
import axios from "../../../../api/axios";

// MUI Components
import { Stack, Dialog, Typography } from "@mui/material";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";

// MUI Icons
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import DeleteIcon from "@mui/icons-material/Delete";

// Custom Components
import CopyableText from "../../MicroComponents/customCopyText";
import ComposeMail from "./ComposeMail";

const formatDate = (date) => {
  const newDate = new Date(date);
  return (
    newDate.toLocaleDateString("en-US") +
    " : " +
    newDate.toLocaleTimeString("en-US")
  );
};
// POST, /admin-markMessageAsRead, messageId : ..
// POST, /admin-markMessageAsUnread, messageId ...
// DELETE, /admin-deleteMessage, messageId ...

const Message = ({ data }) => {
  // States
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(data.read);
  const [hide, setHide] = useState(false);
  const [readLoad, setReadLoad] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);

  // marking message as read
  const markMessageAsRead = () => {
    axios
      .post("/admin-markMessageAsRead", { messageId: data._id })
      .then((res) => {
        // console.log("marked as read");
        setRead(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // marking message as unread
  const AdminDeleteMessage = () => {
    setDeleteLoad(true);
    axios
      .delete("/admin-deleteMessage", { data: { messageId: data._id } })
      .then((res) => {
        // console.log("marked as unread");
        setHide(true);
        setDeleteLoad(false);
      })
      .catch((err) => {
        setDeleteLoad(false);
        console.log(err.response.data);
      });
  };

  // marking message as unread
  const markMessageAsUnRead = () => {
    setReadLoad(true);
    axios
      .post("/admin-markMessageAsUnread", { messageId: data._id })
      .then((res) => {
        // console.log("marked as unread");
        setRead(false);
        setReadLoad(false);
      })
      .catch((err) => {
        setReadLoad(false);
        console.log(err.response.data);
      });
  };

  const ListItem = ({ primary, secondary }) => {
    return (
      <Stack spacing={1}>
        {primary}
        {secondary}
      </Stack>
    );
  };

  // Custom Unread Component
  const UnRead = () => {
    return (
      <div style={{ zIndex: 1000 }}>
        <Tooltip title="Mark as Unread">
          <IconButton onClick={markMessageAsUnRead} size="small">
            {readLoad ? (
              <CircularProgress color="inherit" size={15} />
            ) : (
              <MarkAsUnreadIcon sx={{ fontSize: "0.875em" }} />
            )}
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  // Custom Unread Component
  const DeleteMessage = () => {
    return (
      <div style={{ zIndex: 1000 }}>
        <Tooltip title="Delete">
          <IconButton onClick={AdminDeleteMessage} size="small" color="error">
            {deleteLoad ? (
              <CircularProgress color="inherit" size={15} />
            ) : (
              <DeleteIcon sx={{ fontSize: "0.875em" }} />
            )}
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      <Stack
        className={
          read
            ? "admin-support-msg admin-support-msg-read"
            : "admin-support-msg"
        }
        direction="row"
        spacing={2}
        sx={{ display: hide ? "none" : "flex" }}
      >
        <Stack
          sx={{
            height: "100%",
            width: "5px",
            bgcolor: read ? "#77ec95" : "transparent",
            borderRadius: "5px",
          }}
        ></Stack>
        <Stack
          direction="row"
          sx={{ flexGrow: 1 }}
          onClick={() => {
            setOpen(true);
            if (!read) markMessageAsRead();
          }}
        >
          <Stack sx={{ width: 250 }}>
            <Typography variant="caption" sx={{ fontFamily: "PT Sans" }}>
              <strong>
                {data.subject.length > 25
                  ? data.subject.substr(0, 25) + "..."
                  : data.subject}
              </strong>
            </Typography>
          </Stack>
          <Typography sx={{ flexGrow: 1 }} variant="caption">
            {data.message.length > 100
              ? data.message.substr(0, 100) + "..."
              : data.message}
          </Typography>
          <Typography variant="caption">
            {formatDate(data.createdAt)}
          </Typography>
        </Stack>
        <UnRead />
        <DeleteMessage />
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Stack spacing={1} sx={{ padding: "24px 15px" }}>
          <ListItem
            primary={<Typography variant="body2">Message ID</Typography>}
            secondary={<CopyableText text={data._id} fontSize="12px" />}
          />
          <Typography variant="h6">User Details</Typography>
          <Stack direction="row" spacing={2}>
            <ListItem
              primary={<Typography variant="body2">Name</Typography>}
              secondary={<CopyableText text={data?.name} fontSize="12px" />}
            />
            <ListItem
              primary={<Typography variant="body2">Mail</Typography>}
              secondary={<CopyableText text={data?.email} fontSize="12px" />}
            />
            <ListItem
              primary={<Typography variant="body2">Contact Number</Typography>}
              secondary={<CopyableText text={data?.phoneNo} fontSize="12px" />}
            />
          </Stack>
          <ListItem
            primary={<Typography variant="body2">Subject</Typography>}
            secondary={<CopyableText text={data?.subject} fontSize="12px" />}
          />
          <ListItem
            primary={<Typography variant="body2">Query Type</Typography>}
            secondary={<CopyableText text={data?.queryType} fontSize="12px" />}
          />
          {data?.orderId && (
            <ListItem
              primary={<Typography variant="body2">Order ID</Typography>}
              secondary={<CopyableText text={data?.orderId} fontSize="12px" />}
            />
          )}
          <ListItem
            primary={<Typography variant="body2">Message</Typography>}
            secondary={<Typography variant="body2">{data?.message}</Typography>}
          />
          <Stack spacing={2} direction="row" alignItems="center">
            <ComposeMail value="Reply" emailData={data} type="DEFAULT" />
            <UnRead />
            <DeleteMessage />
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default Message;
