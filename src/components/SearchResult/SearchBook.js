import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios";

// Mui Components
import { Box, Stack, Chip, Typography, Alert } from "@mui/material";
import { Avatar, Button, IconButton } from "@mui/material";
import { Snackbar, CircularProgress } from "@mui/material";

// Icons
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddCartIcon from "@mui/icons-material/AddShoppingCart";
import FilledCartIcon from "@mui/icons-material/ShoppingCart";
import FilledWishlistIcon from "@mui/icons-material/Favorite";
import WishlistIcon from "@mui/icons-material/FavoriteBorder";

const Styles = {
  Box: {
    width: "100%",
    border: "0.5px solid rgba(99, 99, 99, 0.1)",
    height: 440,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    borderRadius: "5px",
    "&:hover": {
      boxShadow: "0 4px 6px rgb(32 33 36 / 28%)",
    },
  },
  Avatar: {
    height: 240,
    width: "100%",
    cursor: "pointer",
  },
};
const SearchBook = (props) => {
  // User Context
  const [user, setUser] = useContext(UserContext);

  // Functionality States
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState("");

  // Data States
  const [book, setBook] = useState(props.book);
  const [wishlistLoad, setwishlistLoad] = useState(false);
  const [cartLoad, setcartLoad] = useState(false);

  // Add to Cart
  const handelCart = (bookId, inCart) => {
    setcartLoad(true);
    if (user) {
      if (inCart) {
        axios
          .delete("/deleteCartItem", {
            data: { bookId: bookId },
          })
          .then((response) => {
            setSeverity("success");
            setOpen(true);
            setAlert("Book Removed From Cart!");
            setcartLoad(false);
            setBook({ ...book, cart: false });
            setUser({ ...user, cartitems: user.cartitems - 1 });
          })
          .catch((error) => {
            setOpen(true);
            setAlert("Some Error Occured. Please Try Again!");
            setSeverity("error");
            setcartLoad(false);
          });
      } else {
        axios
          .post("/addCartItem", {
            bookId: bookId,
          })
          .then((response) => {
            setSeverity("success");
            setOpen(true);
            setAlert("Book Added To Cart!");
            setcartLoad(false);
            setBook({ ...book, cart: true });
            setUser({ ...user, cartitems: user.cartitems + 1 });
          })
          .catch((error) => {
            setOpen(true);
            setAlert("Some Error Occured. Please Try Again!");
            setSeverity("error");
            setcartLoad(false);
          });
      }
    } else {
      setcartLoad(false);
      setOpen(true);
      setAlert("You are not Logged In!");
      setSeverity("error");
    }
  };

  // Add to Wishlist
  const handelWishlist = (bookId, inWishlist) => {
    setwishlistLoad(true);
    if (user) {
      if (inWishlist) {
        axios
          .delete("/deleteWishlistItem", {
            data: { bookId: bookId },
          })
          .then((response) => {
            setSeverity("success");
            setOpen(true);
            setAlert("Book Removed From Wishlist!");
            setwishlistLoad(false);
            setBook({ ...book, wishlist: false });
            setUser({ ...user, wishlist: user.wishlist - 1 });
          })
          .catch((error) => {
            setOpen(true);
            setAlert("Some Error Occured. Please Try Again!");
            setSeverity("error");
            setwishlistLoad(false);
          });
      } else {
        axios
          .post("/addWishlistItem", {
            bookId: bookId,
          })
          .then((response) => {
            setSeverity("success");
            setOpen(true);
            setAlert("Book Added To Wishlist!");
            setwishlistLoad(false);
            setBook({ ...book, wishlist: true });
            setUser({ ...user, wishlist: user.wishlist + 1 });
          })
          .catch((error) => {
            setOpen(true);
            setAlert("Some Error Occured. Please Try Again!");
            setSeverity("error");
            setwishlistLoad(false);
          });
      }
    } else {
      setwishlistLoad(false);
      setOpen(true);
      setAlert("You are not Logged In!");
      setSeverity("error");
    }
  };

  // Handeling snackbar closing
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={Styles.Box}>
      <Stack
        direction="column"
        sx={{ width: "100%", height: "100%" }}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to={`/BookDetails/${book._id}`} style={{ width: "100%" }}>
          <Avatar
            alt={book.title}
            src={book.photo}
            sx={Styles.Avatar}
            variant="rounded"
          />
        </Link>

        <Typography
          align="center"
          variant="caption"
          sx={{ padding: "0px 10px" }}
        >
          {book.title.length <= 75
            ? book.title
            : book.title.substr(0, 75) + "..."}
        </Typography>
        <Stack
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ width: "100%" }}
        >
          <Stack
            sx={{
              width: "100%",
              padding: "0px 10px",
            }}
          >
            <Chip
              icon={<RupeeIcon />}
              label={book.price}
              color="primary"
              size="small"
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", padding: "5px 10px" }}
          >
            <IconButton
              onClick={() => handelWishlist(book._id, book.wishlist)}
              size="small"
            >
              {wishlistLoad ? (
                <CircularProgress color="warning" size={20} />
              ) : book.wishlist ? (
                <FilledWishlistIcon
                  sx={{ color: "rgb(235, 52, 70)", height: 20, width: 20 }}
                />
              ) : (
                <WishlistIcon
                  sx={{ color: "rgb(235, 52, 70)", height: 20, width: 20 }}
                />
              )}
            </IconButton>
            <IconButton
              onClick={() => handelCart(book._id, book.cart)}
              size="small"
            >
              {cartLoad ? (
                <CircularProgress color="warning" size={20} />
              ) : book.cart ? (
                <FilledCartIcon
                  color="success"
                  sx={{ height: 20, width: 20 }}
                />
              ) : (
                <AddCartIcon
                  sx={{ color: "rgb(235, 113, 52)", height: 20, width: 20 }}
                />
              )}
            </IconButton>
          </Stack>
          <Link to={`/BookDetails/${book._id}`} style={{ width: "100%" }}>
            <Button
              endIcon={<NextIcon />}
              color="primary"
              fullWidth
              size="small"
            >
              More Details
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alert}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchBook;
