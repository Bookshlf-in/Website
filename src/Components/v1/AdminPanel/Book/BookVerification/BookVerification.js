import { React, useState, useContext, useEffect } from "react";
import { AdminContext } from "../../../../../Context/adminContext";

// API
import axios from "../../../../../axios";

// MUI Components
import { Grid, Stack } from "@mui/material";
import { Avatar, Alert, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogContentText, DialogTitle } from "@mui/material";

// Custom Components
import FetchBookBar from "./FetchBookBar";
import FetchedBook from "./FetchedBook";

const BookVerification = () => {
  // Admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // functionality States
  const [rejectId, setrejectId] = useState("");
  const [rejectOpen, setrejectOpen] = useState(false);

  // data States
  const [books, setbooks] = useState(admin.bookVerification.data);

  const [rejectMsg, setrejectMsg] = useState("");
  const [bookReject, setbookReject] = useState({
    title: "",
    content: "",
    id: "",
    img: "",
  });

  // update books on each render
  useEffect(() => {
    setbooks(admin.bookVerification.data);
  }, [admin]);

  // Reject Book
  const RejectBook = (book, bookId) => {
    setrejectOpen(true);
    setbookReject({
      title: book.title,
      content:
        "Reject Book - " +
        book.title +
        ". This Book will Be Rejected Back to Seller.",
      id: bookId,
      img: book.photos[0],
    });
  };

  const RejectBookDialog = (bookId, msg) => {
    setrejectOpen(false);
    setrejectId(bookId);
    axios
      .post("/admin-rejectBookApproval", {
        bookId: bookId,
        message: msg,
      })
      .then((response) => {
        setrejectId("");
        setbooks(
          books.map((book) => {
            return book._id === bookId
              ? { ...book, status: "Approval rejected" }
              : book;
          })
        );
        setAdmin({
          ...admin,
          bookVerification: {
            ...admin.bookVerification,
            data: books.map((book) => {
              return book._id === bookId
                ? { ...book, status: "Approval rejected" }
                : book;
            }),
          },
        });
      })
      .catch((error) => {});
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="center"
      className="AdminBookVerification"
      sx={{ padding: "0px 16px 10px 0px" }}
    >
      <FetchBookBar />
      <Grid container spacing={2}>
        {books && books.length > 0 ? (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={book._id}>
              <FetchedBook book={book} />
            </Grid>
          ))
        ) : (
          <Grid item sm={12} md={12} lg={12} xs={12}>
            <Alert severity="error" color="warning">
              No Books in this Page
            </Alert>
          </Grid>
        )}
      </Grid>
      <Dialog open={rejectOpen} onClose={() => setrejectOpen(false)}>
        <DialogTitle>{bookReject.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Avatar
              alt={bookReject.title}
              src={bookReject.img}
              sx={{ height: 150, width: 110 }}
              variant="rounded"
            />
          </DialogContentText>
          <DialogContentText>{bookReject.content}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Message With Reason"
            type="text"
            fullWidth
            variant="standard"
            value={rejectMsg}
            onChange={(e) => setrejectMsg(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setrejectOpen(false)}
            variant="outlined"
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={() => RejectBookDialog(bookReject.id, rejectMsg)}
            variant="outlined"
            color="warning"
            size="small"
          >
            Reject Book
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default BookVerification;
