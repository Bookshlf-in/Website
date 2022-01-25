import { React, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Custom Components
import Booksnaps from "./Booksnaps";
import BookDesc from "./BookDesc";
import "./BookDetails.css";

// Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Icons
import AddCartIcon from "@mui/icons-material/AddShoppingCart";
import FilledCartIcon from "@mui/icons-material/ShoppingCart";
import FilledWishlistIcon from "@mui/icons-material/Favorite";
import WishlistIcon from "@mui/icons-material/FavoriteBorder";
import BuynowIcon from "@mui/icons-material/LocalMall";

// Use Styles
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    fontFamily: "PT sans !important",
  },
  Button: {
    maxWidth: 280,
    backgroundColor: "rgb(235, 83, 52) !important",
    letterSpacing: "1px !important",
    padding: "12px 15px !important",
  },
}));

const BookDetails = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const bookId = params.bookId;

  // Functionality states
  const [bookLoading, setbookLoading] = useState(true);
  const [loadWishlist, setloadWishlist] = useState(false);
  const [loadCart, setloadCart] = useState(false);

  // data States
  const [book, setbook] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState("");
  const [wishlist, setwishlist] = useState(false);
  const [cart, setcart] = useState(false);

  // Fetching Book Details
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/getBookDetails", {
          params: {
            bookId: bookId,
          },
        })
        .then((response) => {
          setbook(response.data);
          setwishlist(response.data.wishlist);
          setcart(response.data.cart);
          setbookLoading(false);
        });
    };
    fetchData();
  }, []);

  // Handeling snackbar closing
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // handeling wish list
  const handelWishList = () => {
    if (user) {
      if (wishlist === false) {
        setloadWishlist(true);
        axios
          .post("/addWishlistItem", {
            bookId: bookId,
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setwishlist((prev) => !prev);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, wishlist: user.wishlist + 1 })
            );
            setUser({ ...user, wishlist: user.wishlist + 1 });
            setloadWishlist(false);
          })
          .catch((error) => {
            setloadWishlist(false);
          });
      } else {
        setloadWishlist(true);
        axios
          .delete("/deleteWishlistItem", {
            data: { bookId: bookId },
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setwishlist((prev) => !prev);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, wishlist: user.wishlist - 1 })
            );
            setUser({ ...user, wishlist: user.wishlist - 1 });
            setloadWishlist(false);
          })
          .catch((err) => {
            setloadWishlist(false);
          });
      }
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
    }
  };

  const handelCart = () => {
    if (user) {
      if (cart === false) {
        setloadCart(true);
        axios
          .post("/addCartItem", {
            bookId: bookId,
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setcart((prev) => !prev);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, cartitems: user.cartitems + 1 })
            );
            setUser({ ...user, cartitems: user.cartitems + 1 });
            setloadCart(false);
          })
          .catch(() => {
            setloadCart(false);
          });
      } else {
        setloadCart(true);
        axios
          .delete("/deleteCartItem", {
            data: { bookId: bookId },
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setcart((prev) => !prev);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, cartitems: user.cartitems - 1 })
            );
            setUser({ ...user, cartitems: user.cartitems - 1 });
            setloadCart(false);
          })
          .catch((err) => {
            setloadCart(false);
          });
      }
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
    }
  };

  // Purchase Book
  const handelCheckout = () => {
    if (user) {
      history.push(`/Checkout/${bookId}`);
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
    }
  };

  return (
    <>
      <Helmet>
        {book.title ? <title>{book.title} | Bookshlf</title> : null}
        {book.description ? (
          <meta name="description" content={book.description} />
        ) : null}
      </Helmet>

      {/* Component */}
      {!bookLoading ? (
        <Stack
          spacing={2}
          sx={{ padding: "10px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            sx={{ width: "100%" }}
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            justifyContent="space-evenly"
            alignItems="space-evenly"
            spacing={2}
          >
            <Booksnaps snaps={book.photos} video={book.embedVideo} />
            <Stack
              direction={{
                xs: "row",
                sm: "column",
                md: "column",
                lg: "column",
              }}
              justifyContent="center"
              alignItems="center"
              spacing={5}
            >
              <Fab
                aria-label="Add-to-Wishlist"
                size="medium"
                onClick={handelWishList}
                disabled={book.status === "Cancelled"}
              >
                {loadWishlist ? (
                  <CircularProgress size="1rem" color="warning" />
                ) : wishlist ? (
                  <FilledWishlistIcon sx={{ color: "rgb(235, 52, 70)" }} />
                ) : (
                  <WishlistIcon sx={{ color: "rgb(235, 52, 70)" }} />
                )}
              </Fab>
              <Fab
                aria-label="Add-to-Cart"
                size="medium"
                onClick={handelCart}
                disabled={book.status === "Cancelled"}
              >
                {loadCart ? (
                  <CircularProgress size="1rem" color="warning" />
                ) : cart ? (
                  <FilledCartIcon sx={{ color: "rgb(235, 113, 52)" }} />
                ) : (
                  <AddCartIcon sx={{ color: "rgb(235, 113, 52)" }} />
                )}
              </Fab>
              <Fab
                aria-label="Buy-Now"
                size="medium"
                onClick={handelCheckout}
                disabled={book.status === "Cancelled"}
              >
                <BuynowIcon sx={{ color: "rgb(235, 83, 52)" }} />
              </Fab>
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction="column"
            sx={{ width: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            <LoadingButton
              variant="contained"
              fullWidth
              className={classes.Button}
              loading={false}
              loadingPosition="end"
              endIcon={<BuynowIcon />}
              onClick={handelCheckout}
              disabled={book.status === "Cancelled"}
            >
              <strong>Buy Now</strong>
            </LoadingButton>
          </Stack>
          <BookDesc bookdetails={book} />
        </Stack>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{ padding: "10px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Stack spacing={2} direction="column">
              <Skeleton variant="square" height={60} width={60} />
              <Skeleton variant="square" height={60} width={60} />
              <Skeleton variant="square" height={60} width={60} />
            </Stack>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Skeleton variant="rectangle" height={300} width={200} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Skeleton variant="text" height={100} width="100%" />
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-evenly"
            >
              <Skeleton variant="text" height={40} width={100} />
              <Skeleton variant="text" height={40} width={100} />
            </Stack>
            <Skeleton variant="text" height={300} width="100%" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Stack spacing={2} direction="column">
              <Skeleton variant="rectangle" height={50} width={300} />
              <Skeleton variant="rectangle" height={50} width={300} />
              <Skeleton variant="rectangle" height={50} width={300} />
            </Stack>
          </Grid>
        </Grid>
      )}
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} variant="filled">
            {alert}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
export default BookDetails;
