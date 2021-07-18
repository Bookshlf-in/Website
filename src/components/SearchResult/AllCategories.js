import {React, useState, useEffect, useContext} from "react";
import "./AllCategories.css";
import {Link} from "react-router-dom";
import {UserContext} from "../../Context/userContext";
import axios from "../../axios";
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

const AllCategories = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState("");
  // states
  const [search, setsearch] = useState("");
  const [books, setbooks] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/search", {
          params: {
            q: search,
          },
        })
        .then((response) => {
          response.data.sort((a, b) => {
            return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
          });
          setbooks(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          // console.log(error.response.data);
        });
    };
    fetchdata();
  }, []);

  const handelSearch = () => {
    setload(true);
    axios
      .get("/search", {
        params: {
          q: search,
        },
      })
      .then((response) => {
        setbooks(response.data);
        console.log(response.data);
        setload(false);
        setsearch("");
      })
      .catch((error) => {
        console.log(error.response.data);
        setload(false);
      });
  };

  // handeling wish list
  const handelWishList = (e) => {
    if (user) {
      e.target.className = "fas fa-circle-notch";
      e.target.style.animation = "spin 2s linear infinite";
      axios
        .post("/addWishlistItem", {
          bookId: e.target.id,
        })
        .then((response) => {
          // console.log(response.data);
          setOpen(true);
          setSeverity("success");
          setAlert(response.data.msg);
          e.target.className = "fas fa-heart";
          e.target.style.animation = "none";
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
        .catch((error) => {
          axios
            .delete("/deleteWishlistItem", {
              data: {bookId: e.target.id},
            })
            .then((response) => {
              // console.log(response.data);
              e.target.className = "far fa-heart";
              e.target.style.animation = "";
              setOpen(true);
              setSeverity("success");
              setAlert(response.data.msg);
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
            .catch((err) => {
              e.target.className = "far fa-heart";
              e.target.style.animation = "";
              // console.log(err.response.data);
            });
        });
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
    }
  };

  const handelCart = (e) => {
    if (user) {
      console.log(e.target.title);
      if (e.target.title === "F") {
        e.target.innerHTML = "Adding...";
        axios
          .post("/addCartItem", {
            bookId: e.target.id,
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            e.target.innerHTML = "Added In Cart";
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
            e.target.title = "T";
          })
          .catch(() => {
            e.target.innerHTML = "Failed!";
            setTimeout(() => {
              e.target.innerHTML = "Add to Cart";
            }, 2000);
          });
      } else {
        e.target.innerHTML = "Removing...";
        axios
          .delete("/deleteCartItem", {
            data: {bookId: e.target.id},
          })
          .then((response) => {
            e.target.innerHTML = "Add to Cart";
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
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
            e.target.title = "F";
          })
          .catch((err) => {
            e.target.innerHTML = "Failed!";
            setTimeout(() => {
              e.target.innerHTML = "Add to Cart";
            }, 2000);
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
    <div className="AllCategories">
      <div className="AllCategories-cont">
        <div className="AllCategories-search">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // console.log("Start Search API");
                handelSearch();
              }
            }}
            placeholder="Search.."
            className="AllCategories-input"
          />
          <button
            type="button"
            className="Search-button"
            onClick={(e) => {
              e.preventDefault();
              handelSearch();
            }}
          >
            {load ? "Searching..." : "Search"}
          </button>
        </div>
        {/* ================================================================== */}
        <div className="bs-books">
          {books ? (
            <>
              {books.map((book, idx) => (
                // ==================================
                <div className="search-result-book" key={idx}>
                  <div className="search-book">
                    <div className="search-book-pic">
                      <img
                        src={book.photo}
                        alt={book.title}
                        title={book.title}
                        height="100%"
                        width="100%"
                        className="bs-image"
                      />
                    </div>
                    <div className="search-book-details">
                      <p className="details-para1">{book.title}</p>
                      <p className="details-para3">
                        {book.author} Edition : {book.editionYear}
                      </p>
                      <p className="details-para4">
                        <i className="fas fa-rupee-sign" />
                        &nbsp;{book.price}&nbsp;/-
                      </p>
                      <div className="hidden-items">
                        <p
                          className="cart"
                          id={book._id}
                          onClick={(e) => {
                            handelCart(e);
                          }}
                          title={book.cart ? "T" : "F"}
                        >
                          {book.cart ? "Added In Cart" : "Add To Cart"}
                        </p>
                        <i className="fas fa-arrows-alt-h" />
                        <i
                          className={
                            book.wishlist ? "fas fa-heart" : "far fa-heart"
                          }
                          title="Add to Wishlist"
                          id={book._id}
                          onClick={(e) => {
                            handelWishList(e);
                          }}
                        />
                      </div>
                      <div
                        title="View Book Details"
                        className="book-more-details"
                      >
                        <Link to={`/BookDetails/${book._id}`}>
                          More Details&nbsp;
                          <i className="fas fa-angle-double-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                // ================================
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        {/* ======================================================== */}

        {/* more loading */}
        <div className="loadMore">
          <button className="loadMore-btn">
            More&nbsp;
            <i className="fas fa-caret-down" />
            &nbsp;
            <i
              className="fas fa-circle-notch"
              style={{
                display: true ? "none" : "inline-block",
                animation: "spin 2s linear infinite",
              }}
            />
          </button>
        </div>
      </div>
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

export default AllCategories;
