import { React, useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

// Icons
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddCartIcon from "@mui/icons-material/AddShoppingCart";
import FilledCartIcon from "@mui/icons-material/ShoppingCart";
import FilledWishlistIcon from "@mui/icons-material/Favorite";
import WishlistIcon from "@mui/icons-material/FavoriteBorder";

// Custom Components
import SearchBar from "./Searchbar";
import { IconButton } from "@mui/material";

// Use Styles
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "PT sans !important",
    "& li": {
      "& button": {
        fontFamily: "PT sans !important",
      },
    },
  },
}));

const Search = () => {
  // Calling Hooks
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  // User Context
  const [user, setUser] = useContext(UserContext);

  // Functionality States
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [wishlistLoad, setwishlistLoad] = useState("");
  const [cartLoad, setcartLoad] = useState("");

  // Data states
  const [books, setbooks] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(1);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      axios
        .get("/search", {
          params: {
            q: params.query,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setbooks(
            response.data.data.sort((a, b) => {
              return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
            })
          );
          settotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    fetchdata();
  }, [params.query]);

  // changing Page
  const changePage = (pageNo) => {
    setLoading(true);
    setpage(pageNo);
    axios
      .get("/search", {
        params: {
          q: params.query,
          page: pageNo,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setbooks(
          response.data.data.sort((a, b) => {
            return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
          })
        );
        settotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // Add to Cart
  const handelCart = (bookId, inCart) => {
    setcartLoad(bookId);
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
            setbooks(
              books.map((book) =>
                book._id === bookId ? { ...book, cart: false } : book
              )
            );
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, cartitems: user.cartitems - 1 })
            );
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
            setbooks(
              books.map((book) =>
                book._id === bookId ? { ...book, cart: true } : book
              )
            );
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, cartitems: user.cartitems + 1 })
            );
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
    setwishlistLoad(bookId);
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
            setwishlistLoad("");
            setbooks(
              books.map((book) =>
                book._id === bookId ? { ...book, wishlist: false } : book
              )
            );
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, wishlist: user.wishlist - 1 })
            );
            setUser({ ...user, wishlist: user.wishlist - 1 });
            setcartLoad("");
          })
          .catch((error) => {
            setOpen(true);
            setAlert("Some Error Occured. Please Try Again!");
            setSeverity("error");
            setwishlistLoad("");
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
            setcartLoad(false);
            setbooks(
              books.map((book) =>
                book._id === bookId ? { ...book, wishlist: true } : book
              )
            );
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({ ...user, wishlist: user.wishlist + 1 })
            );
            setUser({ ...user, wishlist: user.wishlist + 1 });
            setwishlistLoad("");
          })
          .catch((error) => {
            setOpen(true);
            setAlert("Some Error Occured. Please Try Again!");
            setSeverity("error");
            setwishlistLoad("");
          });
      }
    } else {
      setwishlistLoad("");
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
    <>
      <Helmet>
        <title>Search | Bookshlf</title>
      </Helmet>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          width: "100%",
          padding: "10px",
        }}
        justifyContent="center"
        alignItems="center"
        className="search-book-container"
      >
        <SearchBar />
        {!Loading ? (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ paddingRight: "16px" }}
          >
            {books.length
              ? books.map((book) => (
                  <Grid item xs={12} sm={4} md={3} lg={2} key={book._id}>
                    <Box
                      sx={{
                        width: "100%",
                        border: "0.5px solid rgba(99, 99, 99, 0.1)",
                        height: 400,
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: "0 4px 6px rgb(32 33 36 / 28%)",
                        },
                      }}
                    >
                      <Stack
                        direction="column"
                        sx={{ width: "100%", height: "100%" }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Avatar
                          alt={book.title}
                          src={book.photo}
                          sx={{ height: 220, width: "100%" }}
                          variant="rounded"
                        />
                        <Typography
                          align="center"
                          className={classes.root}
                          variant="caption"
                          sx={{ padding: "0px 10px" }}
                        >
                          {book.title}
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
                              className={classes.root}
                              color="primary"
                              size="small"
                            />
                          </Stack>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{
                              width: "100%",
                              padding: "0px 10px",
                            }}
                          >
                            <IconButton
                              onClick={() =>
                                handelWishlist(book._id, book.wishlist)
                              }
                            >
                              {wishlistLoad === book._id ? (
                                <CircularProgress color="warning" size={25} />
                              ) : book.wishlist ? (
                                <FilledWishlistIcon
                                  sx={{ color: "rgb(235, 52, 70)" }}
                                />
                              ) : (
                                <WishlistIcon
                                  sx={{ color: "rgb(235, 52, 70)" }}
                                />
                              )}
                            </IconButton>
                            <IconButton
                              onClick={() => handelCart(book._id, book.cart)}
                            >
                              {cartLoad === book._id ? (
                                <CircularProgress color="warning" size={25} />
                              ) : book.cart ? (
                                <FilledCartIcon color="success" />
                              ) : (
                                <AddCartIcon
                                  sx={{ color: "rgb(235, 113, 52)" }}
                                />
                              )}
                            </IconButton>
                          </Stack>
                          <Button
                            endIcon={<NextIcon />}
                            className={classes.root}
                            color="primary"
                            onClick={() => {
                              history.push(`/BookDetails/${book._id}`);
                            }}
                            fullWidth
                          >
                            More Details
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  </Grid>
                ))
              : null}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack
                sx={{ width: "100%" }}
                justifyContent="center"
                alignItems="center"
              >
                {books.length ? (
                  <Pagination
                    variant="outlined"
                    color="primary"
                    size="large"
                    page={page}
                    count={totalPages}
                    className={classes.root}
                    showFirstButton
                    showLastButton
                    onChange={(e, pageNo) => changePage(pageNo)}
                  />
                ) : (
                  <Alert
                    severity="info"
                    variant="outlined"
                    style={{ fontFamily: "pt sans" }}
                  >
                    <AlertTitle style={{ fontFamily: "pt sans" }}>
                      No Results Found
                    </AlertTitle>
                    If you are not able to find the book you want, then mail us
                    at -{" "}
                    <strong
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        backgroundColor: "rgba(0,0,0,0.06)",
                        padding: "6px",
                        borderRadius: "5px",
                      }}
                    >
                      <Link
                        to={{
                          pathname: "mailto:bookshlf.in@gmail.com",
                        }}
                        target="_blank"
                      >
                        bookshlf.in@gmail.com
                      </Link>
                    </strong>
                    <br />
                    <br />
                    <center>
                      OR
                      <br />
                      <br />
                      <b
                        onClick={() => {
                          history.push("/Contact");
                        }}
                        style={{
                          color: "green",
                          cursor: "pointer",
                          backgroundColor: "rgba(0,0,0,0.06)",
                          padding: "6px",
                          borderRadius: "5px",
                          boxShadow: "3px 2px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        Contact Us
                      </b>
                    </center>
                  </Alert>
                )}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Stack>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} variant="filled">
            {alert}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Search;
