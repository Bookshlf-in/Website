import { React } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

// Components
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Icons
import FaceIcon from "@mui/icons-material/Face";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import BookIcon from "@mui/icons-material/Bookmark";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans !important",
  },
}));

const BookDesc = (props) => {
  const classes = useStyles();
  const book = props.bookdetails;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/SellerProfile/${props.bookdetails.seller._id}`);
  };

  const handelTagClick = (tagName) => {
    history.push(`/SearchResult/tag:${tagName}`);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h5" align="center">
        <strong>{book.title}</strong>
      </Typography>
      {book.status === "Cancelled" ? (
        <Stack
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="warning" sx={{ width: 300 }}>
            <AlertTitle>
              <Typography variant="body1">
                <strong>Book Not Available</strong>
              </Typography>
            </AlertTitle>
            <Typography variant="caption">
              <strong>
                This Book is Currently Not Available & May Remain Same for Not
                Known Period of time
              </strong>
            </Typography>
          </Alert>
        </Stack>
      ) : null}
      <Divider flexItem />
      <Stack
        spacing={2}
        sx={{ width: "100%" }}
        justifyContent="center"
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
      >
        <Stack direction="column" spacing={3}>
          <div>
            <Typography variant="body2" className={classes.root}>
              <strong>Selling Price</strong>
            </Typography>
            <Chip
              icon={<RupeeIcon />}
              label={book.price}
              color="success"
              variant="filled"
              size="small"
              className={classes.root}
            />
          </div>

          {book?.MRP ? (
            <div>
              <Typography variant="body2" className={classes.root}>
                <strong>MRP</strong>
              </Typography>
              <Chip
                icon={<RupeeIcon />}
                label={book?.MRP}
                color="primary"
                variant="filled"
                size="small"
                className={classes.root}
              />
            </div>
          ) : null}
        </Stack>
        <Stack direction="column" spacing={3}>
          {book?.author ? (
            <div>
              <Typography variant="body2" className={classes.root}>
                <strong>Author</strong>
              </Typography>
              <Chip
                label={book?.author}
                color="default"
                variant="outlined"
                size="small"
                className={classes.root}
              />
            </div>
          ) : null}

          {book?.author ? (
            <div>
              <Typography variant="body2" className={classes.root}>
                <strong>Edition Year</strong>
              </Typography>
              <Chip
                label={book?.editionYear}
                color="default"
                variant="outlined"
                size="small"
                className={classes.root}
              />
            </div>
          ) : null}
        </Stack>
        <Stack direction="column" spacing={3}>
          {book?.ISBN ? (
            <div>
              <Typography variant="body2" className={classes.root}>
                <strong>Book ISBN</strong>{" "}
              </Typography>
              <Chip
                label={book?.ISBN}
                color="default"
                variant="outlined"
                size="small"
                className={classes.root}
              />
            </div>
          ) : null}

          {book?.qty ? (
            <div>
              <Typography variant="body2" className={classes.root}>
                <strong>Book Quantity</strong>
              </Typography>
              <Chip
                label={book?.qty}
                color="default"
                variant="outlined"
                size="small"
                className={classes.root}
              />
            </div>
          ) : null}
        </Stack>
      </Stack>
      <Divider />
      <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center">
        <Typography variant="h5" className={classes.root}>
          Book Description
        </Typography>
        <Typography variant="body1" align="justify" sx={{ maxWidth: 400 }}>
          <strong>{book?.description}</strong>
        </Typography>
      </Stack>
      <Stack
        sx={{ width: "100%" }}
        direction="column"
        spacing={2}
        alignItems="center"
      >
        <Stack direction="row" spacing={2}>
          <Chip
            label={book.seller.name}
            className={classes.root}
            icon={<FaceIcon />}
            color="secondary"
            variant="outlined"
            size="small"
            onClick={handleClick}
          />
          <Chip
            label={
              book.seller.isVerified ? "Verified Seller" : "Not Verified Seller"
            }
            className={classes.root}
            icon={book.seller.isVerified ? <CheckIcon /> : <CancelIcon />}
            color={book.seller.isVerified ? "success" : "error"}
            variant="outlined"
            size="small"
          />
        </Stack>

        <Rating value={book.seller.rating} precision={0.5} readOnly />
        <Typography variant="caption" align="center">
          <strong>Total Ratings Recieved : </strong>{" "}
          <Chip
            label={book.seller.noOfRatings}
            size="small"
            className={classes.root}
          />
        </Typography>
      </Stack>
      <Divider />
      <Typography variant="h5" className={classes.root} align="center">
        Book Tags
      </Typography>
      <Stack
        sx={{ width: "100%" }}
        justifyContent="center"
        alignItems="center"
        className="book-details-tag-stack"
        direction="row"
        spacing={1}
      >
        {book.tags.map((tag, index) => (
          <Chip
            variant="outlined"
            color="primary"
            size="small"
            label={tag}
            key={index}
            icon={<BookIcon />}
            className={classes.root}
            sx={{ cursor: "pointer" }}
            onClick={() => handelTagClick(tag)}
          />
        ))}
      </Stack>
    </Stack>
  );
};
export default BookDesc;
