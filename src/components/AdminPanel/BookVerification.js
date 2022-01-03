import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios";

// components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Alert from "@material-ui/lab/Alert";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// icons
import LoadIcon from "@material-ui/icons/AutorenewRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import NextIcon from "@material-ui/icons/NavigateNextRounded";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& span": {
      fontFamily: "PT sans !important",
      fontSize: "12px",
    },
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
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

const BookVerification = () => {
  const classes = useStyles();
  const history = useHistory();

  // functionality States
  const [showverify, setshowverify] = useState(false);
  const [load, setload] = useState(false);
  const [bookDel, setbookDel] = useState("");
  const [checkId, setcheckId] = useState("");
  const [rejectId, setrejectId] = useState("");
  const [rejectOpen, setrejectOpen] = useState(false);

  // data States
  const [books, setbooks] = useState([]);
  const [verifiedbooks, setverifiedbooks] = useState([]);
  const [notVerifiedbooks, setNotVerifiedbooks] = useState([]);
  const [totalPages, settotalPages] = useState(0);
  const [page, setpage] = useState(1);
  const [rejectMsg, setrejectMsg] = useState("");
  const [bookReject, setbookReject] = useState({
    title: "",
    content: "",
    id: "",
    img: "",
  });

  // fetchings book lists
  const getBooks = async (pageNo) => {
    setload(true);
    setpage(pageNo);
    axios
      .get("/admin-getBookList", {
        params: { page: pageNo, noOfBooksInOnePage: 10 },
      })
      .then((response) => {
        setbooks(response.data.data);
        settotalPages(response.data.totalPages);
        setverifiedbooks(
          response.data.data.filter((book) => book.isApproved === true)
        );
        setNotVerifiedbooks(
          response.data.data.filter((book) => book.isApproved === false)
        );
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
        setNotVerifiedbooks(
          notVerifiedbooks.filter((book) => book._id !== bookId)
        );
        console.log(response.data.msg);
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
        history.go(0);
      })
      .catch((error) => {
        setcheckId("");
        console.log(error.response.data);
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
        setverifiedbooks(verifiedbooks.filter((book) => book._id !== bookId));
        setNotVerifiedbooks(
          notVerifiedbooks.filter((book) => book._id !== bookId)
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
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
      className="admin-book-verify-container"
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%" }}
        justifyContent="space-evenly"
      >
        <LoadingButton
          loading={load}
          loadingPosition="start"
          startIcon={<LoadIcon />}
          variant="contained"
          className={classes.root}
          onClick={() => getBooks(1)}
        >
          Fetch Books
        </LoadingButton>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={!showverify}
                onChange={(e, value) => {
                  setshowverify((prev) => !prev);
                  getBooks(page);
                }}
                color="error"
              />
            }
            label="Show Not Verified Books"
            labelPlacement="bottom"
            className={classes.root}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showverify}
                onChange={(e, value) => {
                  setshowverify((prev) => !prev);
                  getBooks(page);
                }}
                color="success"
              />
            }
            label="Show Verified Books"
            labelPlacement="bottom"
            className={classes.root}
          />
        </FormGroup>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%" }}
        justifyContent="space-evenly"
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, pageNo) => {
            getBooks(pageNo);
          }}
          color="primary"
          className={classes.root}
        />
      </Stack>
      <Grid container spacing={2}>
        {showverify ? (
          verifiedbooks.length > 0 ? (
            verifiedbooks.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: 400,
                    border: "0.5px solid rgba(99, 99, 99, 0.1)",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                >
                  <Stack
                    direction="column"
                    sx={{ width: "100%", padding: "10px" }}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar
                      alt={book.title}
                      src={book.photos[0]}
                      sx={{ height: 150, width: 110 }}
                      variant="rounded"
                    />
                    <Typography
                      align="center"
                      className={classes.root}
                      variant="body2"
                    >
                      {book.title}
                    </Typography>
                    <Chip
                      icon={<i className="fas fa-rupee-sign" />}
                      label={book.price}
                      className={classes.root}
                    />
                    <Chip
                      icon={<CheckIcon />}
                      label="Approved"
                      className={classes.root}
                      color="success"
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      endIcon={<NextIcon />}
                      className={classes.root}
                      color="primary"
                      onClick={() => {
                        history.push(`/AdminBook/${book._id}`);
                      }}
                    >
                      More Details
                    </Button>
                    <LoadingButton
                      loading={bookDel === book._id ? true : false}
                      loadingPosition="start"
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      className={classes.root}
                      onClick={() => {
                        handelDeleteBook(book._id);
                      }}
                      color="error"
                    >
                      Delete Book
                    </LoadingButton>
                  </Stack>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item sm={12} md={12} lg={12} xs={12}>
              <Alert severity="error" className={classes.root} color="warning">
                No Books in this Page
              </Alert>
            </Grid>
          )
        ) : notVerifiedbooks.length > 0 ? (
          notVerifiedbooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  border: "0.5px solid rgba(99, 99, 99, 0.1)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <Stack
                  direction="column"
                  sx={{ width: "100%", padding: "10px" }}
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    alt={book.title}
                    src={book.photos[0]}
                    sx={{ height: 150, width: 110 }}
                    variant="rounded"
                  />
                  <Typography
                    align="center"
                    className={classes.root}
                    variant="body2"
                  >
                    {book.title}
                  </Typography>
                  <Chip
                    icon={<i className="fas fa-rupee-sign" />}
                    label={book.price}
                    className={classes.root}
                  />
                  <Chip
                    icon={<CancelIcon />}
                    label="Not Approved"
                    className={classes.root}
                    color="error"
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    endIcon={<NextIcon />}
                    className={classes.root}
                    color="primary"
                    onClick={() => {
                      history.push(`/AdminBook/${book._id}`);
                    }}
                    size="small"
                  >
                    More Details
                  </Button>
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      loading={checkId === book._id ? true : false}
                      loadingPosition="start"
                      startIcon={<CheckIcon />}
                      variant="contained"
                      className={classes.root}
                      onClick={() => ApproveBook(book._id)}
                      color="success"
                      size="small"
                    >
                      {checkId === book._id ? "Approving..." : "Approve"}
                    </LoadingButton>
                    <LoadingButton
                      loading={rejectId === book._id ? true : false}
                      loadingPosition="start"
                      startIcon={<CancelIcon />}
                      variant="contained"
                      className={classes.root}
                      onClick={() => RejectBook(book, book._id)}
                      color="warning"
                      size="small"
                      disabled={
                        book.status === "Approval rejected" ? true : false
                      }
                    >
                      {book.status === "Approval rejected"
                        ? "Rejected"
                        : "Reject"}
                    </LoadingButton>
                  </Stack>
                  <LoadingButton
                    loading={bookDel === book._id ? true : false}
                    loadingPosition="start"
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    className={classes.root}
                    onClick={() => {
                      handelDeleteBook(book._id);
                    }}
                    color="error"
                    size="small"
                  >
                    Delete Book
                  </LoadingButton>
                </Stack>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item sm={12} md={12} lg={12} xs={12}>
            <Alert severity="error" className={classes.root} color="warning">
              No Books in this Page
            </Alert>
          </Grid>
        )}
      </Grid>
      <Dialog
        open={rejectOpen}
        onClose={() => setrejectOpen(false)}
        className={classes.root}
      >
        <DialogTitle className={classes.root}>{bookReject.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Avatar
              alt={bookReject.title}
              src={bookReject.img}
              sx={{ height: 150, width: 110 }}
              variant="rounded"
            />
          </DialogContentText>
          <DialogContentText className={classes.root}>
            {bookReject.content}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Message With Reason"
            type="text"
            fullWidth
            variant="standard"
            className={classes.root}
            value={rejectMsg}
            onChange={(e) => setrejectMsg(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setrejectOpen(false)}
            variant="outlined"
            className={classes.root}
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={() => RejectBookDialog(bookReject.id, rejectMsg)}
            variant="outlined"
            className={classes.root}
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
