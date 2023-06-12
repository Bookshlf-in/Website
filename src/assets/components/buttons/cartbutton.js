import { useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";

import {
  Tooltip,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import AddCartIcon from "@mui/icons-material/AddShoppingCart";
import FilledCartIcon from "@mui/icons-material/ShoppingCart";

import { addCart, deleteCart } from "../../../api/endpoints";
import { DeleteRequest } from "../../../api/requests/deleteAPI";
import { PostRequest } from "../../../api/requests/postAPI";

const CartButton = ({ book }) => {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(book.cart);
  const [alert, setAlert] = useState({
    type: "success",
    show: false,
    msg: "",
  });

  const isLoggedIn = () => {
    return Boolean(user);
  };

  const addToCart = async () => {
    const response = await PostRequest(addCart, { bookId: book._id });
    if (response.success) {
      setUser({ ...user, cartitems: user.cartitems + 1 });
      showAlert("success", "Book added to cart");
      book.cart = true;
      setCart(true);
    } else showAlert("error", response.data.error);
    setLoading(false);
  };

  const deleteFromCart = async () => {
    const response = await DeleteRequest(deleteCart, {
      bookId: book._id,
    });
    if (response.success) {
      setUser({ ...user, cartitems: user.cartitems - 1 });
      showAlert("success", "Book removed from cart");
      book.cart = false;
      setCart(false);
    } else showAlert("error", response.data.error);
    setLoading(false);
  };

  const showAlert = (type, msg) => {
    setAlert({
      show: true,
      type: type,
      msg: msg,
    });
    setTimeout(() => {
      setAlert((prev) => {
        return { ...prev, show: false };
      });
    }, 5000);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => {
      return { ...prev, show: false };
    });
  };

  const handleCart = async (e) => {
    setLoading(true);
    e.stopPropagation();
    e.preventDefault();
    if (isLoggedIn()) {
      if (!book.cart) addToCart();
      else deleteFromCart();
    } else {
      showAlert("error", "please login to add item to cart");
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title={cart ? "Remove from cart" : "Add to Cart"} arrow>
        <Button
          className="search-book-cart-button"
          variant={cart ? "" : "outlined"}
          onClick={handleCart}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={12} color="inherit" />
          ) : cart ? (
            <FilledCartIcon />
          ) : (
            <AddCartIcon fontSize="1em" />
          )}
        </Button>
      </Tooltip>
      <Snackbar open={alert.show} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CartButton;
