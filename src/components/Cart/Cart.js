import { React, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

// Icons
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellerIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/AddRounded";
import RemoveIcon from "@mui/icons-material/RemoveRounded";
import BackIcon from "@mui/icons-material/ArrowBackIosRounded";
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import CheckoutIcon from "@mui/icons-material/RedoRounded";
import DeleteIcon from "@mui/icons-material/Delete";

// Use Styles
const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans !important",
  },
  Button: {
    fontFamily: "PT sans !important",
    borderRadius: "20px !important",
  },
  Stack: {
    padding: "10px",
    borderRadius: "5px !important",
    border: "1px solid rgba(0,0,0,0.2)",
    position: "relative",
  },
  DeleteButton: {
    position: "absolute",
    right: -1,
    top: -1,
    padding: "10px",
    borderRadius: "0 5px 0 0",
    margin: "0 !important",
    cursor: "pointer",
  },
}));

const Cart = () => {
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);

  // Functionality States
  const [cartLoading, setcartLoading] = useState(true);
  const [checkout, setcheckout] = useState(false);

  // Data States
  const [cart, setcart] = useState([]);
  const [amount, setamount] = useState(0);
  const [removingId, setremovingId] = useState("");

  // Fetching Cart Items
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getCartList")
        .then((response) => {
          setcart(response.data);
          setamount(0);
          for (let i = 0; i < response.data.length; i++) {
            setamount(
              (prev) =>
                prev + response.data[i].price * response.data[i].purchaseQty
            );
          }
          setcartLoading(false);
        })
        .catch((error) => {
          setcartLoading(false);
        });
    };
    if (user) fetchData();
    else setcartLoading(false);
  }, []);

  // Increase Item Value
  const handelAddItem = (id, index) => {
    setcart(
      cart.map((item) =>
        item._id === id ? { ...item, purchaseQty: item.purchaseQty + 1 } : item
      )
    );
    setamount((prev) => prev + cart[index].price);
  };

  // Decrease Item Value
  const handelRemoveItem = (id, index) => {
    setcart(
      cart.map((item) =>
        item._id === id ? { ...item, purchaseQty: item.purchaseQty - 1 } : item
      )
    );
    setamount((prev) => prev - cart[index].price);
  };

  // Handeling Cart Changes
  const handelCart = (bookId) => {
    setremovingId(bookId);
    axios
      .delete("/deleteCartItem", {
        data: { bookId: bookId },
      })
      .then((response) => {
        // console.log(response.data);
        setamount(
          (prev) =>
            prev -
            cart[cart.findIndex((f) => f.bookId === bookId)].price *
              cart[cart.findIndex((f) => f.bookId === bookId)].purchaseQty
        );
        setcart(cart.filter((item) => bookId !== item.bookId));
        setUser({ ...user, cartitems: user.cartitems - 1 });
      })
      .catch((err) => {});
  };

  // update Single Cart Item Purchase Quantity
  const UpdatePurchaseQty = async (Id, qty) => {
    const request = await axios
      .post("/changeCartItemPurchaseQty", {
        cartItemId: Id,
        purchaseQty: qty,
      })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
    return request;
  };

  // update All Cart Items Purchase Quantity
  const UpdateAllPurchaseQty = async () => {
    return await Promise.all(
      cart.map(async (item) => {
        return await UpdatePurchaseQty(item._id, item.purchaseQty);
      })
    );
  };

  // Checking Out
  const Checkout = async () => {
    setcheckout(true);
    await UpdateAllPurchaseQty();
    history.push("/Checkout/cart");
    setcheckout(false);
  };

  return (
    <>
      <Helmet>
        <title>Cart | Bookshlf</title>
        <meta
          name="description"
          content="Bookshlf Cart. All Items Added to Cart are Visible here."
        />
      </Helmet>
      <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center">
        {user ? (
          cartLoading ? (
            <Grid container sx={{ padding: "10px" }} spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Skeleton variant="rectangle" height={50} width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Skeleton variant="rectangle" height={100} width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Skeleton variant="rectangle" height={100} width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Skeleton variant="rectangle" height={100} width="100%" />
              </Grid>
            </Grid>
          ) : (
            <Stack sx={{ padding: "10px", width: "100%" }} spacing={1}>
              <Stack
                direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
                justifyContent="space-evenly"
                spacing={2}
              >
                <Button
                  startIcon={<BackIcon />}
                  variant="outlined"
                  size="small"
                  className={classes.Button}
                  color="secondary"
                  onClick={() => history.push("/SearchResult/tag:ALL")}
                >
                  Continue Shopping
                </Button>
                <Fab
                  variant="extended"
                  size="small"
                  color="primary"
                  aria-label="cart-total"
                >
                  <RupeeIcon sx={{ mr: 1, height: 20, width: 20 }} />
                  <strong>{amount + " ( " + cart.length + " Item )"}</strong>
                </Fab>
                <LoadingButton
                  loading={checkout}
                  loadingPosition="end"
                  endIcon={<CheckoutIcon />}
                  variant="contained"
                  size="small"
                  color="warning"
                  className={classes.Button}
                  disabled={cart.length == 0}
                  onClick={Checkout}
                >
                  Checkout
                </LoadingButton>
              </Stack>
              {cart.length ? (
                cart.map((product, index) => (
                  <Stack
                    className={classes.Stack}
                    key={index}
                    spacing={1}
                    direction={{
                      xs: "column",
                      sm: "row",
                      md: "row",
                      lg: "row",
                    }}
                    justifyContent={{
                      xs: "center",
                      sm: "flex-start",
                      md: "flex-start",
                      lg: "flex-start",
                    }}
                    alignItems="center"
                  >
                    <Avatar
                      variant="rounded"
                      src={product.photo}
                      alt={product.title}
                      sx={{ height: 100, width: 80 }}
                    />
                    <Stack
                      direction="column"
                      spacing={1}
                      sx={{ width: "100%" }}
                      justifyContent={{
                        xs: "center",
                        sm: "flex-start",
                        md: "flex-start",
                        lg: "flex-start",
                      }}
                      alignItems="center"
                    >
                      <Typography variant="body2">
                        <strong>{product.title}</strong>
                      </Typography>
                      <Typography variant="caption">
                        <strong>{product.author}</strong>
                      </Typography>
                      <div>
                        <Chip
                          icon={<SellerIcon />}
                          label={product.sellerName}
                          size="small"
                          className={classes.root}
                          color="primary"
                          variant="outlined"
                        />
                      </div>
                    </Stack>
                    <Stack
                      direction="column"
                      spacing={1}
                      alignItems="center"
                      sx={{ width: "100%" }}
                    >
                      <Chip
                        label={product.price * product.purchaseQty}
                        icon={<RupeeIcon />}
                        color="secondary"
                        size="small"
                        className={classes.root}
                      />
                      <ButtonGroup
                        disableElevation
                        variant="outlined"
                        size="small"
                        color="info"
                      >
                        <IconButton
                          color="primary"
                          aria-label="Remove Item Quantity"
                          component="span"
                          disabled={product.purchaseQty <= 1}
                          onClick={() => handelRemoveItem(product._id, index)}
                        >
                          <RemoveIcon color="error" />
                        </IconButton>
                        <Button
                          aria-label="add Item Quantity"
                          className={classes.root}
                          sx={{ margin: "0px 6px" }}
                        >
                          {product.purchaseQty}
                        </Button>
                        <IconButton
                          color="primary"
                          aria-label="add Item Quantity"
                          component="span"
                          disabled={product.qty <= product.purchaseQty}
                          onClick={() => handelAddItem(product._id, index)}
                        >
                          <AddIcon color="success" />
                        </IconButton>
                      </ButtonGroup>

                      <Typography variant="caption" className={classes.root}>
                        Available Qty : <strong>{product.qty}</strong>
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{ width: "100%" }}
                      justifyContent="center"
                      direction="row"
                    >
                      <div>
                        <Button
                          variant="outlined"
                          className={classes.Button}
                          endIcon={<NextIcon />}
                          color="primary"
                          size="small"
                          onClick={() =>
                            history.push(`/BookDetails/${product.bookId}`)
                          }
                        >
                          More Details
                        </Button>
                      </div>
                    </Stack>
                    <IconButton
                      onClick={() => handelCart(product.bookId)}
                      className={classes.DeleteButton}
                      color="error"
                    >
                      {removingId === product.bookId ? (
                        <CircularProgress size={22} color="inherit" />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </Stack>
                ))
              ) : (
                <Stack sx={{ width: "100%" }}>
                  <Alert severity="info">
                    <Typography variant="body1" className={classes.root}>
                      Your Cart is Empty. Add Items to see them in Cart.
                    </Typography>
                  </Alert>
                </Stack>
              )}
            </Stack>
          )
        ) : (
          <Alert severity="error">
            <Typography variant="body1" className={classes.root}>
              Please Login to see your Shopping Cart
            </Typography>
          </Alert>
        )}
      </Stack>
    </>
  );
};
export default Cart;
