import { React, useState, useContext } from "react";
import { AdminContext } from "../../../Context/adminContext";

// API
import axios from "../../../axios";

// MUI Components
import { Grid, Stack, Box, Chip } from "@mui/material";
import { Avatar, Alert, Button, Switch } from "@mui/material";
import { Pagination, TextField, Typography } from "@mui/material";
import { FormGroup, FormControlLabel } from "@mui/material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogContentText, DialogTitle } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// icons
import LoadIcon from "@mui/icons-material/AutorenewRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";

const BookVerification = () => {
  // Admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // functionality States
  const [load, setload] = useState(false);
  const [bookDel, setbookDel] = useState("");
  const [checkId, setcheckId] = useState("");
  const [rejectId, setrejectId] = useState("");
  const [rejectOpen, setrejectOpen] = useState(false);

  // data States
  const [books, setbooks] = useState(admin.bookVerification.data);
  const [totalPages, settotalPages] = useState(
    admin.bookVerification.totalPages
  );
  const [page, setpage] = useState(admin.bookVerification.page);
  const [showverify, setshowverify] = useState(
    admin.bookVerification.isApproved
  );
  const [rejectMsg, setrejectMsg] = useState("");
  const [bookReject, setbookReject] = useState({
    title: "",
    content: "",
    id: "",
    img: "",
  });

  // fetchings book lists
  const getBooks = async (pageNo, value) => {
    setload(true);
    setpage(pageNo);
    setshowverify(value);
    axios
      .get("/admin-getBookList", {
        params: {
          page: pageNo,
          noOfBooksInOnePage: 24,
          isApproved: value,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setAdmin({
          ...admin,
          bookVerification: {
            data: response.data.data.filter(
              (book) => book.status !== "Approval rejected"
            ),
            totalPages: response.data.totalPages,
            isApproved: value,
            page: pageNo,
          },
        });
        setbooks(
          response.data.data.filter(
            (book) => book.status !== "Approval rejected"
          )
        );
        settotalPages(response.data.totalPages);
        setload(false);
      })
      .catch((error) => {
        setload(false);
      });
  };

  // approving books
  const ApproveBook = (bookId) => {
    setcheckId(bookId);
    axios
      .post("/admin-approveBook", {
        bookId: bookId,
      })
      .then((response) => {
        setcheckId("");
        setbooks(books.filter((book) => book._id !== bookId));
        setAdmin({
          ...admin,
          bookVerification: {
            ...admin.bookVerification,
            data: books.filter((book) => book._id !== bookId),
          },
        });
      })
      .catch((error) => {
        setcheckId("");
        console.log(error.response.data);
      });
  };

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
      .catch((error) => {
        setcheckId("");
      });
  };

  // Deleting Books
  const handelDeleteBook = (bookId) => {
    setbookDel(bookId);
    axios
      .delete("/admin-deleteBook", {
        data: {
          bookId: bookId,
          message: "Book is not Appropriate and Have Many Unavoidable errors",
        },
      })
      .then((response) => {
        setbookDel("");
        books(books.filter((book) => book._id !== bookId));
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="center"
      className="AdminBookVerification"
      sx={{ padding: "0px 16px 10px 0px" }}
    >
      <Stack direction="row" spacing={2}>
        <LoadingButton
          loading={load}
          loadingPosition="start"
          startIcon={<LoadIcon />}
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => getBooks(1, false)}
        >
          Fetch Books
        </LoadingButton>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={!showverify}
                onChange={(e, value) => {
                  getBooks(page, false);
                }}
                color="error"
                size="small"
              />
            }
            label="Show Not Approved Books"
            labelPlacement="bottom"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showverify}
                onChange={(e, value) => {
                  getBooks(page, true);
                }}
                color="success"
                size="small"
              />
            }
            label="Show Approved Books"
            labelPlacement="bottom"
          />
        </FormGroup>
      </Stack>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, pageNo) => {
          getBooks(pageNo, showverify);
        }}
        color="primary"
        size="small"
      />
      <Grid container spacing={2}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  border: "2px solid rgba(99, 99, 99, 0.5)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <Stack
                  direction="column"
                  sx={{ padding: "5px", height: "100%" }}
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    alt={book.title}
                    src={book.photos[0]}
                    sx={{ height: 120, width: 100 }}
                    variant="rounded"
                  />
                  <Typography align="center" variant="caption">
                    {book.title.length <= 75
                      ? book.title
                      : book.title.substr(0, 75) + "..."}
                  </Typography>
                  <Stack
                    justifyContent="flex-end"
                    sx={{ height: "100%" }}
                    spacing={1}
                  >
                    <Chip
                      icon={<RupeeIcon />}
                      label={book.price}
                      size="small"
                    />
                    <Chip
                      icon={showverify ? <CheckIcon /> : <CancelIcon />}
                      label={showverify ? "Approved" : "Not Approved"}
                      color={showverify ? "success" : "error"}
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      endIcon={<NextIcon />}
                      color="primary"
                      href={`/AdminBook/${book._id}`}
                      target="_blank"
                      size="small"
                      sx={{ fontSize: "9px" }}
                    >
                      More Details
                    </Button>
                    <Stack direction="row" spacing={1}>
                      {!showverify ? (
                        <LoadingButton
                          loading={checkId === book._id ? true : false}
                          loadingPosition="start"
                          startIcon={<CheckIcon />}
                          variant="outlined"
                          onClick={() => ApproveBook(book._id)}
                          color="success"
                          size="small"
                          disabled={
                            book.status === "Approval rejected" ? true : false
                          }
                          sx={{ fontSize: "9px" }}
                        >
                          {checkId === book._id ? "Approving..." : "Approve"}
                        </LoadingButton>
                      ) : null}
                      {!showverify ? (
                        <LoadingButton
                          loading={rejectId === book._id ? true : false}
                          loadingPosition="start"
                          startIcon={<CancelIcon />}
                          variant="outlined"
                          onClick={() => RejectBook(book, book._id)}
                          color="warning"
                          size="small"
                          disabled={
                            book.status === "Approval rejected" ? true : false
                          }
                          sx={{ fontSize: "9px" }}
                        >
                          {book.status === "Approval rejected"
                            ? "Rejected"
                            : "Reject"}
                        </LoadingButton>
                      ) : null}
                    </Stack>
                    <LoadingButton
                      loading={bookDel === book._id ? true : false}
                      loadingPosition="start"
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      onClick={() => {
                        handelDeleteBook(book._id);
                      }}
                      color="error"
                      size="small"
                      sx={{ fontSize: "9px" }}
                    >
                      Delete Book
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
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
