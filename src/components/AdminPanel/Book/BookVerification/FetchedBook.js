import { useState } from "react";

// MUI Components
import { Stack, Chip, Paper, Button } from "@mui/material";
import { Drawer, Avatar, Typography } from "@mui/material";

// icons
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import PendingIcon from "@mui/icons-material/Pending";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";
import EditIcon from "@mui/icons-material/Edit";
import RejectIcon from "@mui/icons-material/ThumbDown";

// Custom Components
import AdminBookDelete from "./AdminBookDelete";
import BookDetails from "./BookDetails";
import AdminBookApprove from "./AdminBookApprove";
import AdminBookReject from "./AdminBookReject";

const FetchedBook = ({ book }) => {
  const [openBookDetails, setOpenBookDetails] = useState(false);
  const [openRejectBook, setOpenRejectBook] = useState(false);

  const bookTitle =
    book.title.length <= 75 ? book.title : book.title.substr(0, 75) + "...";
  return (
    <Paper
      sx={{
        width: "100%",
        height: 400,
        border: "1px solid rgba(99, 99, 99, 0.5)",
        cursor: "pointer",
        padding: "10px",
        position: "relative",
      }}
    >
      <AdminBookDelete bookId={book._id} />
      <Stack
        direction="column"
        sx={{ padding: "5px", height: "100%" }}
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          alt={bookTitle}
          src={book.photos[0]}
          sx={{ height: 120, width: 100 }}
          variant="rounded"
        />
        <Typography align="center" variant="caption">
          {bookTitle}
        </Typography>
        <Stack justifyContent="flex-end" sx={{ height: "100%" }} spacing={1}>
          <Stack spacing={1}>
            <Chip
              icon={<RupeeIcon sx={{ fontSize: "1em !important" }} />}
              label={book.price}
              size="small"
              sx={{ fontSize: "0.7em" }}
            />
            <Chip
              icon={
                book.isApproved ? (
                  <CheckIcon sx={{ fontSize: "1em !important" }} />
                ) : (
                  <PendingIcon sx={{ fontSize: "1em !important" }} />
                )
              }
              label={book.isApproved ? "Approved" : "Approval Pending"}
              color={book.isApproved ? "success" : "warning"}
              size="small"
              sx={{ fontSize: "0.7em" }}
            />
          </Stack>

          <Button
            variant="outlined"
            endIcon={<EditIcon sx={{ fontSize: "12px !important" }} />}
            color="primary"
            size="small"
            sx={{ fontSize: "12px", textTransform: "none", lineHeight: 0 }}
            onClick={() => setOpenBookDetails(true)}
          >
            Edit Book Details
          </Button>
          <Drawer
            anchor="right"
            open={openBookDetails}
            onClose={() => setOpenBookDetails(false)}
          >
            <BookDetails
              bookId={book._id}
              setOpenBookDetails={setOpenBookDetails}
            />
          </Drawer>
          <AdminBookApprove bookId={book._id} />
          <Button
            variant="outlined"
            endIcon={<RejectIcon sx={{ fontSize: "12px !important" }} />}
            color="error"
            size="small"
            sx={{ fontSize: "12px", textTransform: "none", lineHeight: 0 }}
            onClick={() => setOpenRejectBook(true)}
          >
            Reject Book
          </Button>
          <Drawer
            anchor="bottom"
            open={openRejectBook}
            onClose={() => setOpenRejectBook(false)}
          >
            <AdminBookReject
              book={book}
              bookId={book._id}
              setOpenRejectBook={setOpenRejectBook}
            />
          </Drawer>
          {/* <Stack direction="row" spacing={1}>
                      {!true ? (
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
                      {!true ? (
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
                    </Stack> */}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FetchedBook;
