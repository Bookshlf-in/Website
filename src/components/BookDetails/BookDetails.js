import { React, useState, useEffect, useContext } from "react";
import "./BookDetails.css";
import { useParams, useHistory, Link } from "react-router-dom";
import Booksnaps from "./Booksnaps";
import Bookfullsnap from "./Bookfullsnap";
import BookDesc from "./BookDesc";
import axios from "../../axios";
import { UserContext } from "../../Context/userContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
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
  const [loadWishlist, setloadWishlist] = useState(false);
  const [loadCart, setloadCart] = useState(false);

  // maintain visibility state for showing alert when user is not logged in
  const [showLoginAlert, setShowLoginAlert] = useState(false);

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
      if (wishlist === false) {
        setloadWishlist(true);
        axios
          .post("/addWishlistItem", {
            bookId: id,
          })
          .then((response) => {
            // console.log(response.data);
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
            setloadWishlist(false);
          })
          .catch((error) => {
            setloadWishlist(false);
          });
      } else {
        setloadWishlist(true);
        axios
          .delete("/deleteWishlistItem", {
            data: { bookId: id },
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

  const handelCart = (id) => {
    if (user) {
      if (cart === false) {
        setloadCart(true);
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
            setloadCart(false);
          })
          .catch(() => {
            setloadCart(false);
          });
      } else {
        setloadCart(true);
        axios
          .delete("/deleteCartItem", {
            data: { bookId: id },
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
      <div
        className="page-loader"
        style={{ display: loader ? "flex" : "none" }}
      >
        <CircularProgress style={{ height: "80px", width: "80px" }} />
      </div>

      {/* Component */}
      {!loader ? (
        <>
          {book.status === "Deleted" && (
            <div className="deleted-book-overlay">
              <span className="deleted-book-content">Book not available</span>
            </div>
          )}
          <div className="book-details-bg">
            <div className="book-main-container">
              <Booksnaps snaps={book.photos} video={book.embedVideo} />
              <Bookfullsnap url={book.photos[0]} />
              <BookDesc bookdetails={book} />
            </div>
            <div className="book-purchase-container">
              <Button
                variant="contained"
                onClick={() => {
                  handelWishList(bookId);
                }}
                className="wishlist-btn"
              >
                <i className={wishlist ? "fas fa-heart" : "far fa-heart"} />
                &nbsp;
                {wishlist ? "Remove From Wishlist" : "Add To Wishlist"}
                &nbsp;
                <CircularProgress
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "white",
                    display: loadWishlist ? "inline-block" : "none",
                  }}
                />
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  handelCart(bookId);
                }}
                className="addtocart-btn"
              >
                <i className="fas fa-cart-arrow-down" />
                &nbsp;
                {cart ? "Remove from Cart" : "Add to Cart"}
                &nbsp;
                <CircularProgress
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "white",
                    display: loadCart ? "inline-block" : "none",
                  }}
                />
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  if (!user) {
                    setShowLoginAlert(true);
                  } else {
                    history.push(`/Checkout/${bookId}`);
                  }
                }}
                className="buynow-btn"
              >
                <i className="fas fa-shopping-basket" />
                &nbsp;Buy Now
              </Button>
              {showLoginAlert ? (
                <Alert
                  onClose={() => {
                    setShowLoginAlert(false);
                  }}
                  severity="error"
                  style={{ fontSize: "12px" }}
                >
                  Please{" "}
                  <Link
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      textDecoration: "none",
                      letterSpacing: "1px",
                    }}
                    to="/Login"
                  >
                    <u>Login</u>
                  </Link>{" "}
                  to purchase <b>"{book.title}"</b> book
                </Alert>
              ) : null}
              {/* <div className="recommened-tags">
              <h3>Recommended Tags</h3>
            </div> */}
            </div>
          </div>
        </>
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
