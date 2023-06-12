import { useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";

import {
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

// Icons
import FilledWishlistIcon from "@mui/icons-material/Favorite";
import WishlistIcon from "@mui/icons-material/FavoriteBorder";

import { addWishlist, deleteWishlist } from "../../../api/endpoints";
import { DeleteRequest } from "../../../api/requests/deleteAPI";
import { PostRequest } from "../../../api/requests/postAPI";

const WishlistButton = ({ book, size, fontSize }) => {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState(book.wishlist);
  const [alert, setAlert] = useState({
    type: "success",
    show: false,
    msg: "",
  });

  const isLoggedIn = () => {
    return Boolean(user);
  };

  const addToWishlist = async () => {
    const response = await PostRequest(addWishlist, { bookId: book._id });
    if (response.success) {
      setUser({ ...user, wishlist: user.wishlist + 1 });
      showAlert("success", "Book added to wishlist");
      book.wishlist = true;
      setWishlist(true);
    } else showAlert("error", response.data.error);
    setLoading(false);
  };

  const deleteFromWishlist = async () => {
    const response = await DeleteRequest(deleteWishlist, { bookId: book._id });
    if (response.success) {
      setUser({ ...user, wishlist: user.wishlist - 1 });
      showAlert("success", "Book removed from wishlist");
      book.wishlist = false;
      setWishlist(false);
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

  const handelWishlist = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    if (isLoggedIn()) {
      if (!book.wishlist) addToWishlist();
      else deleteFromWishlist();
    } else {
      showAlert("error", "please login to add item to wishlist");
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="Add to wishlist" arrow>
        <IconButton size={size} disabled={loading} onClick={handelWishlist}>
          {loading ? (
            <CircularProgress size={12} color="inherit" />
          ) : wishlist ? (
            <FilledWishlistIcon
              fontSize={fontSize}
              sx={{ color: "#f07070" }}
              className="wishlist-btn"
            />
          ) : (
            <WishlistIcon fontSize={fontSize} className="wishlist-btn" />
          )}
        </IconButton>
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

export default WishlistButton;
