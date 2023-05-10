import { React, useState, useContext } from "react";
import { AdminContext } from "../../../../context/adminContext";

// API
import axios from "../../../../api/axios";

// MUI Components
import { Stack, Typography, TextField } from "@mui/material";
import { Avatar, CircularProgress, Button } from "@mui/material";

const AdminBookReject = ({ book, bookId, setOpenRejectBook }) => {
  // Admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // functionality States
  const [rejectLoad, setRejectLoad] = useState(false);

  // data States
  const [msg, setMsg] = useState("");

  const handleRejectBook = () => {
    setRejectLoad(true);
    axios
      .post("/admin-rejectBookApproval", {
        bookId: bookId,
        message: msg,
      })
      .then((response) => {
        setRejectLoad(false);
        setAdmin({
          ...admin,
          bookVerification: {
            ...admin.bookVerification,
            data: admin.bookVerification.data.map((book) => {
              return book._id === bookId
                ? { ...book, status: "Approval rejected" }
                : book;
            }),
          },
        });
        localStorage.setItem(
          "bookshlf_admin",
          JSON.stringify({
            ...admin,
            bookVerification: {
              ...admin.bookVerification,
              data: admin.bookVerification.data.map((book) => {
                return book._id === bookId
                  ? { ...book, status: "Approval rejected" }
                  : book;
              }),
            },
          })
        );
        setAdmin({
          ...admin,
          bookVerification: {
            ...admin.bookVerification,
            data: admin.bookVerification.data.filter(
              (book) => book._id !== bookId
            ),
          },
        });
        localStorage.setItem(
          "bookshlf_admin",
          JSON.stringify({
            ...admin,
            bookVerification: {
              ...admin.bookVerification,
              data: admin.bookVerification.data.filter(
                (book) => book._id !== bookId
              ),
            },
          })
        );
        setOpenRejectBook(false);
      })
      .catch((error) => {
        setRejectLoad(false);
        console.log(error.response.data);
      });
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="center"
      sx={{ padding: "16px 24px", minHeight: "50vh" }}
    >
      <Typography>{book.title}</Typography>
      <Avatar
        alt={book.title}
        src={book.photos[0]}
        sx={{ height: 150, width: 110 }}
        variant="rounded"
      />
      <Typography variant="caption">{book.description}</Typography>
      <TextField
        autoFocus
        margin="dense"
        label="Rejection Message With Reason"
        fullWidth
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        sx={{ maxWidth: 400 }}
        multiline
        minRows={3}
      />
      <Button
        onClick={handleRejectBook}
        variant="outlined"
        color="success"
        size="small"
        fullWidth
        sx={{ maxWidth: 200 }}
        startIcon={rejectLoad ? <CircularProgress size={12} /> : null}
      >
        Reject Book
      </Button>
      <Button
        onClick={() => setOpenRejectBook(false)}
        variant="outlined"
        color="error"
        size="small"
        fullWidth
        sx={{ maxWidth: 200 }}
      >
        Cancel
      </Button>
    </Stack>
  );
};

export default AdminBookReject;
