import { React, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

// Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellerIcon from "@mui/icons-material/AccountCircle";
import NextIcon from "@mui/icons-material/NavigateNextRounded";

// Use Styles
const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans !important",
    flexGrow: "0 !important",
  },
}));

const Wishlist = () => {
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);

  // Functionality States
  const [wishlistLoading, setwishlistLoading] = useState(true);
  const [wishlist, setwishlist] = useState([]);
  const [removeId, setremoveId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getWishlist")
        .then((response) => {
          setwishlist(response.data);
          setwishlistLoading(false);
        })
        .catch(() => {
          setwishlistLoading(false);
        });
    };
    if (user) fetchData();
    else setwishlistLoading(false);
  }, []);

  // handeling wish list
  const handelWishList = (ID) => {
    setremoveId(ID);
    axios
      .delete("/deleteWishlistItem", {
        data: { bookId: ID },
      })
      .then((response) => {
        setwishlist(wishlist.filter((item) => ID !== item.bookId));
        setUser({ ...user, wishlist: user.wishlist - 1 });
        setremoveId("");
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  };

  return (
    <>
      <Helmet>
        <title>Wishlist | Bookshlf</title>
        <meta
          name="description"
          content="Your Wishlist is Here. Add Your Favourite books."
        />
      </Helmet>
      {user === null ? (
        <Alert severity="warning" className={classes.root}>
          <strong>
            Please{" "}
            <Button
              href="/Login"
              size="small"
              className={classes.root}
              color="success"
            >
              Login
            </Button>{" "}
            to See or Create Your Wishlist
          </strong>
        </Alert>
      ) : wishlistLoading ? (
        <Grid container spacing={2} sx={{ padding: "10px" }}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="rectangle" height={200} width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="rectangle" height={200} width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="rectangle" height={200} width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="rectangle" height={200} width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="rectangle" height={200} width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Skeleton variant="rectangle" height={200} width="100%" />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ padding: "10px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" align="center">
              <strong>Your Wishlist</strong>
            </Typography>
          </Grid>
          {wishlist.length ? (
            wishlist.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                <Paper elevation={2}>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      md: "row",
                      lg: "row",
                    }}
                    spacing={2}
                    justifyContent={{
                      xs: "center",
                      sm: "flex-start",
                      md: "flex-start",
                      lg: "flex-start",
                    }}
                    alignItems="center"
                    sx={{ padding: "10px" }}
                  >
                    <Avatar
                      src={item.photo}
                      alt={item.title}
                      sx={{ height: 120, width: 100 }}
                      variant="rounded"
                    />
                    <Stack
                      direction="column"
                      spacing={2}
                      sx={{ width: "100%" }}
                    >
                      <Typography variant="body2">
                        <strong>{item.title}</strong>
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Chip
                          icon={<RupeeIcon />}
                          label={item.price}
                          size="small"
                          className={classes.root}
                          color="success"
                        />
                        <Chip
                          icon={<SellerIcon />}
                          label={item.sellerName}
                          size="small"
                          className={classes.root}
                          color="primary"
                          variant="outlined"
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Button
                          endIcon={<NextIcon />}
                          size="small"
                          color="warning"
                          variant="outlined"
                          className={classes.root}
                          onClick={() =>
                            history.push(`/BookDetails/${item.bookId}`)
                          }
                        >
                          More Details
                        </Button>
                        <Fab
                          aria-label="Remove-from-Wishlist"
                          onClick={() => handelWishList(item.bookId)}
                          size="small"
                        >
                          {removeId === item.bookId ? (
                            <CircularProgress size="1rem" color="warning" />
                          ) : (
                            <FavoriteIcon
                              sx={{
                                color: "rgb(235, 52, 70)",
                                height: 16,
                                width: 16,
                              }}
                            />
                          )}
                        </Fab>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Alert severity="info" className={classes.root}>
                Your Wishlist is Empty. Add Items & create Your cutomized
                Wishlist.
              </Alert>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};
export default Wishlist;
