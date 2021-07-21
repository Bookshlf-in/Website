import {React, useState, useEffect, useContext} from "react";
import "./BookDetails.css";
import {Link, useParams, useHistory} from "react-router-dom";
import Booksnaps from "./Booksnaps";
import Bookfullsnap from "./Bookfullsnap";
import BookDesc from "./BookDesc";
import axios from "../../axios";
import {UserContext} from "../../Context/userContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";

// Alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Use Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const BookDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const bookId = params.bookId;
  const [book, setbook] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState("");
  const [wishlist, setwishlist] = useState(false);
  const [cart, setcart] = useState(false);

  // loader states
  const [loader, setloader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/getBookDetails?bookId=${bookId}`;
      axios.get(url).then((response) => {
        setbook(response.data);
        setwishlist(response.data.wishlist);
        setcart(response.data.cart);
        console.log(response.data);
        setloader(false);
      });
    };
    fetchData();
  }, []);

  // handeling wish list
  const handelWishList = (id) => {
    if (user) {
      console.log(id);
      if (wishlist === false) {
        axios
          .post("/addWishlistItem", {
            bookId: id,
          })
          .then((response) => {
            console.log(response.data);
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setwishlist(!wishlist);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({
                authHeader: user.authHeader,
                roles: user.roles,
                email: user.email,
                cartitems: user.cartitems,
                wishlist: user.wishlist + 1,
              })
            );
            setUser({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: user.cartitems,
              wishlist: user.wishlist + 1,
            });
          })
          .catch((error) => {});
      } else {
        axios
          .delete("/deleteWishlistItem", {
            data: {bookId: id},
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setwishlist(!wishlist);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({
                authHeader: user.authHeader,
                roles: user.roles,
                email: user.email,
                cartitems: user.cartitems,
                wishlist: user.wishlist - 1,
              })
            );
            setUser({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: user.cartitems,
              wishlist: user.wishlist - 1,
            });
          })
          .catch((err) => {});
      }
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
    }
  };

  const handelCart = (id) => {
    if (user) {
      if (cart === false) {
        axios
          .post("/addCartItem", {
            bookId: id,
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setcart(!cart);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({
                authHeader: user.authHeader,
                roles: user.roles,
                email: user.email,
                cartitems: user.cartitems + 1,
                wishlist: user.wishlist,
              })
            );
            setUser({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: user.cartitems + 1,
              wishlist: user.wishlist,
            });
          })
          .catch(() => {});
      } else {
        axios
          .delete("/deleteCartItem", {
            data: {bookId: id},
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            setcart(!cart);
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({
                authHeader: user.authHeader,
                roles: user.roles,
                email: user.email,
                cartitems: user.cartitems - 1,
                wishlist: user.wishlist,
              })
            );
            setUser({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: user.cartitems - 1,
              wishlist: user.wishlist,
            });
          })
          .catch((err) => {});
      }
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
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
    <div>
      {/* Loader */}
      <div className="page-loader" style={{display: loader ? "flex" : "none"}}>
        <div
          className="page-loading"
          style={{display: loader ? "block" : "none"}}
        ></div>
      </div>

      {/* Component */}
      {!loader ? (
        <div className="book-details-bg">
          <div
            style={{display: loader ? "none" : "flex"}}
            className="book-main-container"
          >
            <Booksnaps snaps={book.photos} video={book.embedVideo} />
            <Bookfullsnap url={book.photos[0]} />
            <BookDesc bookdetails={book} />
          </div>
          <div
            className="book-purchase-container"
            style={{display: loader ? "none" : "flex"}}
          >
            <div
              className="wish-list"
              onClick={() => {
                handelWishList(bookId);
              }}
            >
              <span>
                <i className={wishlist ? "fas fa-heart" : "far fa-heart"}></i>
              </span>
              <input
                type="submit"
                value={wishlist ? "Remove from Wishlist" : "Add To Wishlist"}
              />
            </div>
            <div
              className="add-to-cart"
              onClick={() => {
                handelCart(bookId);
              }}
            >
              <span>
                <i className="fas fa-cart-arrow-down" />
              </span>
              <input
                type="submit"
                value={cart ? "Remove from Cart" : "Add to Cart"}
              />
            </div>
            <div
              className="buy-now-button"
              onClick={() => {
                history.push(`/Checkout/${bookId}`);
              }}
            >
              <span>
                <i className="fas fa-shopping-basket" />
              </span>
              <input type="submit" value="Buy Now" />
            </div>
            <div className="recommened-tags">
              <h3>Recommended Tags</h3>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* !!! do not change !!! */}
      {/*  snackbar starts*/}
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {alert}
          </Alert>
        </Snackbar>
      </div>
      {/* snackbar ends */}
      {/* !!! do not change !!! */}
    </div>
  );
};
export default BookDetails;
