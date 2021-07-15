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

  // sorting states
  const [Rating, setRating] = useState("0");
  const [Price, setPrice] = useState("0");
  const [Exam, setExam] = useState("0");
  const [Lang, setLang] = useState("0");

  useEffect(() => {
    if (Rating !== "0") {
      if (Rating === "1") {
        books.sort((a, b) => {
          return a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0;
        });
      } else {
        books.sort((a, b) => {
          return a.rating < b.rating ? 1 : a.rating > b.rating ? -1 : 0;
        });
      }
    } else {
      books.sort((a, b) => {
        return a.updatedAt > b.updatedAt
          ? 1
          : a.updatedAt < b.updatedAt
          ? -1
          : 0;
      });
    }
  }, [Rating, books]);

  useEffect(() => {
    if (Price === "1") {
      books.sort((a, b) => {
        return a.editionYear > b.editionYear
          ? 1
          : a.editionYear < b.editionYear
          ? -1
          : 0;
      });
    } else if (Price === "2") {
      books.sort((a, b) => {
        return a.price > b.price ? 1 : a.price < b.price ? -1 : 0;
      });
    } else if (Price === "3") {
      books.sort((a, b) => {
        return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
      });
    }
  }, [Price, books]);

  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/search", {
          params: {
            q: search,
          },
        })
        .then((response) => {
          setbooks(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    fetchdata();
  }, []);

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
          // console.log(error.response.data);

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
              // console.log("Start Search API");
              handelSearch();
            }}
          >
            {load ? "Searching..." : "Search"}
          </button>
        </div>
        <div className="filter-result">
          <div className="filter-order filter">
            <select
              className="select"
              onChange={(e) => {
                setExam(e.target.value);
              }}
            >
              <option value="0"> Competitive Exams</option>
              <option value="1">JEE Mains</option>
              <option value="2">JEE Advanced</option>
              <option value="3">NEET UG</option>
            </select>
          </div>
          <div className="filter-order filter">
            <select
              className="select"
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="0">Latest</option>
              <option value="1">High Rating</option>
              <option value="2">Low Rating</option>
            </select>
          </div>
          <div className="filter-sort filter">
            <select
              className="select"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            >
              <option value="0">Default</option>
              <option value="1">Newness</option>
              <option value="2">Price High to Low</option>
              <option value="3">Price Low to High</option>
            </select>
          </div>
          <div
            className="filter-language filter"
            onChange={(e) => setLang(e.target.value)}
          >
            <select className="select">
              <option value="0">English</option>
              <option value="1">Hindi</option>
            </select>
          </div>
        </div>
        {/* ================================================================== */}
        <div className="bs-books">
          {books ? (
            <>
              {books.map((book) => (
                // ==================================
                <div className="search-result-book">
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
                          title="Add item to cart"
                          id={book._id}
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
