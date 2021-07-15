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
  const [wish, setwish] = useState(0);
  const [books, setbooks] = useState([]);

  useEffect(() => {
    axios
      .get("/search", {
        params: {
          q: "hello",
        },
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
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
              // console.log(err.response.data);
            });
        });
    } else {
      setOpen(true);
      setSeverity("error");
      setAlert("Please Login!");
    }
  };
  // temporary state
  const bookId = "60ec0d3a152ad90022aa3c16";

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
                console.log("Start Search API");
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
              console.log("Start Search API");
            }}
          >
            Search
          </button>
        </div>
        <div className="filter-result">
          <div className="filter-order filter">
            <select className="select">
              <option value=""> School</option>
              <option value="">CBSE</option>
              <option value="">ICSC</option>
              <option value="">State Board</option>
              <option value="">IB</option>
              <option value="">NCERT</option>
            </select>
          </div>
          <div className="filter-order filter">
            <select className="select">
              <option value=""> Competitive Exams</option>
              <option value="">JEE Mains</option>
              <option value="">JEE Advanced</option>
              <option value="">NEET UG</option>
            </select>
          </div>
          <div className="filter-order filter">
            <select className="select">
              <option value="">Latest</option>
              <option value="">High Rating</option>
              <option value="">Low Rating</option>
            </select>
          </div>
          <div className="filter-sort filter">
            <select className="select">
              <option value="">Default</option>
              <option value="">Sort by popularity</option>
              <option value="">Sort by newness</option>
              <option value="">Price High to Low</option>
              <option value="">Price Low to High</option>
            </select>
          </div>
          <div className="filter-language filter">
            <select className="select">
              <option value="">English</option>
              <option value="">Hindi</option>
            </select>
          </div>
        </div>
        {/* ================================================================== */}
        <div className="bs-books">
          {/* =========================== */}
          <div className="search-result-book">
            <div className="search-book">
              <div className="search-book-pic">
                <img
                  src="/images/samplebookmock.jpg"
                  alt=""
                  height="100%"
                  width="100%"
                  className="bs-image"
                />
              </div>
              <div className="search-book-details">
                <p className="details-para1">Book Name</p>
                <p className="details-para3">Author Name</p>
                <p className="details-para4">
                  <i className="fas fa-rupee-sign" />
                  &nbsp;Price /-
                </p>
                <div className="hidden-items">
                  <p className="cart" title="Add item to cart">
                    Add To Cart
                  </p>
                  <i className="fas fa-arrows-alt-h" />
                  <i
                    className="far fa-heart"
                    title="Add to Wishlist"
                    id={bookId}
                    onClick={(e) => {
                      handelWishList(e);
                    }}
                  />
                </div>
                <div title="View Book Details" className="book-more-details">
                  <Link to={`/BookDetails/${bookId}`}>
                    More Details&nbsp;
                    <i className="fas fa-angle-double-right" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="book-tags">
              <span className="tag" title="tag1">
                {"JEE Advanced"}
              </span>
              <span className="tag" title="tag2">
                {"JEE Mains"}
              </span>
              <span className="tag" title="tag3">
                {"Maths"}
              </span>
              <span className="tag" title="tag1">
                {"JEE Advanced"}
              </span>
              <span className="tag" title="tag1">
                {"JEE Advanced"}
              </span>
            </div>
          </div>
          {/* =========================== */}
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
