import { React, useState, useEffect, useContext } from "react";
import "./AllCategories.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const inCart = {
  backgroundColor: "green",
  color: "white",
  borderRadius: "40px",
};

const AllCategories = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState("");
  // states
  const [search, setsearch] = useState("");
  const [books, setbooks] = useState(null);
  const [load, setload] = useState(false);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      // console.log(params.query);
      setsearch(params.query);
      setbooks(null);
      axios
        .get(`/search?q=${params.query}`)
        .then((response) => {
          // console.log(response.data);
          setbooks(
            response.data.data.sort((a, b) => {
              return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
            })
          );
          settotalPages(response.data.totalPages);
        })
        .catch((error) => {});
    };
    fetchdata();
  }, [params.query]);

  const handelSearch = () => {
    setpage(1);
    if (search === "") {
    } else {
      history.push(`/SearchResult/${search}`);
      setsearch(params.query);
    }
  };

  const LoadMore = () => {
    setload(true);
    console.log(totalPages);
    if (page + 1 <= totalPages) {
      const fetchdata = async () => {
        console.log(`/search?q=tag:ALL&page=${page + 1}`);
        axios
          .get(`/search?q=tag:ALL&page=${page + 1}`)
          .then((response) => {
            setpage(page + 1);
            console.log(books.concat(response.data.data));
            setbooks(
              books.concat(response.data.data).sort((a, b) => {
                return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
              })
            );
            settotalPages(response.data.totalPages);
            setload(false);
          })
          .catch((error) => {});
      };
      fetchdata();
    } else {
      setload(false);
    }
  };
  // handeling wish list
  const handelWishList = (e) => {
    if (user) {
      if (e.target.title === "Added to Wishlist") {
        e.target.className = "fas fa-circle-notch";
        e.target.style.animation = "spin 2s linear infinite";
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

        axios
          .delete("/deleteWishlistItem", {
            data: { bookId: e.target.id },
          })
          .then((response) => {
            // console.log(response.data);
            e.target.className = "far fa-heart";
            e.target.style.animation = "";
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            e.target.title = "Add to Wishlist";
          })
          .catch((err) => {
            e.target.className = "far fa-heart";
            e.target.style.animation = "";
            // console.log(err.response.data);
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
          });
      } else {
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
            e.target.style.animation = "";
            e.target.title = "Added to Wishlist";
          })
          .catch((error) => {
            e.target.className = "fas fa-heart";
            e.target.style.animation = "";
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
          });
      }
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  const handelCart = (e) => {
    if (user) {
      if (e.target.title === "F") {
        e.target.innerHTML = "Adding...";
        e.target.style.backgroundColor = "green";
        e.target.style.color = "white";
        e.target.style.borderRadius = "40px";
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
        axios
          .post("/addCartItem", {
            bookId: e.target.id,
          })
          .then((response) => {
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);
            e.target.innerHTML = "Added In Cart";
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
        e.target.style = {};
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
        axios
          .delete("/deleteCartItem", {
            data: { bookId: e.target.id },
          })
          .then((response) => {
            e.target.innerHTML = "Add to Cart";
            setOpen(true);
            setSeverity("success");
            setAlert(response.data.msg);

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
      setTimeout(() => {
        setOpen(false);
      }, 3000);
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
            placeholder="Search book by Tags..."
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
            Search
          </button>
        </div>
        {/* ================================================================== */}
        <div className="bs-books">
          {books ? (
            <>
              {books.length ? (
                books.map((book, idx) => (
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
                            style={book.cart ? inCart : {}}
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
                ))
              ) : (
                <h1>No Results Found</h1>
              )}
            </>
          ) : (
            <CircularProgress style={{ height: "50px", width: "50px" }} />
          )}
        </div>
        {/* ======================================================== */}

        {/* more loading */}
        <div className="loadMore">
          <button
            className="loadMore-btn"
            onClick={(e) => {
              e.preventDefault();
              LoadMore();
            }}
          >
            More&nbsp;
            <i className="fas fa-caret-down" />
            &nbsp;
            <i
              className="fas fa-circle-notch"
              style={{
                display: load ? "inline-block" : "none",
                animation: "spin 2s linear infinite",
              }}
            />
          </button>
        </div>
      </div>
      {/* !!! do not change !!! */}
      {/*  snackbar starts*/}
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
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
