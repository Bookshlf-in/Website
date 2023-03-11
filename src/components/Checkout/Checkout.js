import { useState, useEffect, useContext } from "react";

// react router
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet-async";

// api
import axios from "../../axios";

//  Components
import { Grid, Stack, Divider } from "@mui/material";
import { Alert, AlertTitle, Skeleton, Typography, Chip } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Popover from "@mui/material/Popover";

import LoadingButton from "@mui/lab/LoadingButton";

// Icons
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import BackIcon from "@mui/icons-material/ArrowBackIosRounded";
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import ShippingIcon from "@mui/icons-material/LocalShipping";

import CallIcon from "@mui/icons-material/CallRounded";
import CheckIcon from "@mui/icons-material/CheckCircle";

// Checkout Components
import CheckoutLoading from "./CheckoutLoading";
import CheckoutStepper from "./CheckoutStepper";
import CheckoutAddress from "./CheckoutAddress";

const Payment = () => {
  // Calling Hooks
  const history = useHistory();
  const params = useParams();

  // Primary States
  const [user, setUser] = useContext(UserContext);
  const checkoutType = params.type;

  // Functionality States
  const [checkoutLoading, setcheckoutLoading] = useState(true);
  const [panel, setPanel] = useState(0);
  const [stopCheckout, setstopCheckout] = useState(false);
  const [orderLoad, setorderLoad] = useState(false);
  const [orderPlaced, setorderPlaced] = useState(false);

  // Data States
  const [checkout, setCheckout] = useState({});
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [addressIndex, setaddressIntex] = useState(0);

  useEffect(() => {
    const fetch = () => {
      // Getting Checkout Details
      const URL =
        checkoutType === "cart"
          ? "/checkoutCart"
          : `/checkoutBook?bookId=${checkoutType}`;
      axios.get(URL).then((response) => {
        setCheckout(response.data);
        if (checkoutType === "cart") {
          for (let i = 0; i < response.data.items.length; i++) {
            if (response.data.items[i].qty < response.data.items[i].purchaseQty)
              setstopCheckout(true);
          }
        } else {
          if (response.data.item.qty < response.data.item.purchaseQty)
            setstopCheckout(true);
        }
        setcheckoutLoading(false);
      });
    };
    if (user) {
      fetch();
    }
  }, []);

  // Going to Next Stage
  const NextPanel = () => {
    setPanel((prev) => prev + 1);
  };
  // Going to Prev Stage
  const PrevPanel = () => {
    setPanel((prev) => prev - 1);
  };

  // Purchasing Order
  const handelPlaceOrder = () => {
    setorderLoad(true);
    if (checkoutType === "cart") {
      axios
        .post("/purchaseCart", {
          customerAddressId: addressId,
        })
        .then((response) => {
          setorderPlaced(true);
          setorderLoad(false);
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({ ...user, cartitems: 0 })
          );
          setUser({ ...user, cartitems: 0 });
          setTimeout(() => {
            history.push("/UserPanel/2");
          }, 3000);
        })
        .catch((error) => {});
    } else {
      axios
        .post("/purchaseBook", {
          bookId: checkoutType,
          customerAddressId: addressId,
          purchaseQty: 1,
        })
        .then((response) => {
          setorderPlaced(true);
          setorderLoad(false);
          setTimeout(() => {
            history.push("/UserPanel/2");
          }, 3000);
        })
        .catch((error) => {});
    }
  };

  const CheckoutHeading = () => {
    return (
      <Stack
        sx={{ width: "100%" }}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Staatliches", letterSpacing: "1px" }}
        >
          Checkout
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Bookshlf</title>
      </Helmet>
      {user ? (
        checkoutLoading ? (
          <CheckoutLoading />
        ) : (
          <Stack
            spacing={2}
            sx={{
              padding: "15px 24px",
              width: "100%",
            }}
            alignItems="center"
          >
            <CheckoutHeading />
            <CheckoutStepper panel={panel} />
            <Stack
              sx={{
                padding: "15px 24px",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "5px",
                maxWidth: 600,
                minWidth: 350,
              }}
            >
              {panel === 0 ? (
                <CheckoutAddress
                  address={address}
                  setAddress={setAddress}
                  addressId={addressId}
                  setAddressId={setAddressId}
                />
              ) : panel === 1 ? (
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    padding: "20px 10px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                  }}
                  spacing={5}
                >
                  <Stack
                    direction="column"
                    spacing={1}
                    divider={<Divider orientation="horizontal" flexItem />}
                    sx={{ width: "100%", maxWidth: 800 }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Staatliches", letterSpacing: "1px" }}
                      >
                        Item ({checkout.totalItems})
                      </Typography>
                      <Typography
                        align="right"
                        variant="h6"
                        sx={{
                          fontFamily: "Staatliches",
                          letterSpacing: "1px",
                        }}
                      >
                        Price (<RupeeIcon sx={{ height: 15, width: 15 }} />)
                      </Typography>
                    </Stack>
                    {checkoutType !== "cart" ? (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption">
                          {checkout.item.title}
                        </Typography>
                        <Typography align="right" variant="caption">
                          {checkout.item.price} x {checkout.item.purchaseQty}
                        </Typography>
                      </Stack>
                    ) : (
                      checkout.items.map((item) => (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          key={item._id}
                        >
                          <Typography variant="caption">
                            {item.title}
                          </Typography>
                          <Typography align="right" variant="caption">
                            {item.price} x {item.purchaseQty}
                          </Typography>
                        </Stack>
                      ))
                    )}
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={5}
                    >
                      <Typography variant="caption">Items Subtotal</Typography>
                      <Chip
                        icon={<RupeeIcon />}
                        label={checkout.itemsSubtotal}
                        size="small"
                        color="secondary"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={5}
                    >
                      <Typography variant="caption">
                        Shipping Charges
                      </Typography>
                      <Chip
                        icon={<RupeeIcon />}
                        label={checkout.shippingCharges}
                        size="small"
                        color="info"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={5}
                    >
                      <Typography variant="caption">Order Total</Typography>
                      <Chip
                        icon={<RupeeIcon />}
                        label={checkout.orderTotal}
                        size="small"
                        color="success"
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%", maxWidth: 800 }}
                    spacing={2}
                  >
                    <Button
                      startIcon={<BackIcon />}
                      variant="contained"
                      sx={{ letterSpacing: "1px", fontSize: "12px" }}
                      onClick={PrevPanel}
                      size="small"
                      color="warning"
                    >
                      Go to Address
                    </Button>
                    <Button
                      endIcon={<NextIcon />}
                      variant="contained"
                      sx={{ letterSpacing: "1px", fontSize: "12px" }}
                      onClick={NextPanel}
                    >
                      Review Your Order
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Stack
                  direction="column"
                  sx={{ paddingTop: "20px" }}
                  spacing={2}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Staatliches",
                      letterSpacing: "1px",
                    }}
                  >
                    Shipping Address
                  </Typography>
                  <Stack
                    sx={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="body2">
                      {address[addressIndex].label + " : "}
                      <Typography variant="caption">
                        {address[addressIndex].address +
                          ", " +
                          address[addressIndex].state +
                          ", " +
                          address[addressIndex].city +
                          ", " +
                          address[addressIndex].zipCode}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    spacing={2}
                  >
                    <Typography variant="body2">Contact Number :</Typography>
                    <Chip
                      icon={<CallIcon />}
                      label={address[addressIndex].phoneNo}
                      size="small"
                      color="primary"
                    />
                    {address[addressIndex].AltPhoneNo ? (
                      <Chip
                        icon={<CallIcon />}
                        label={address[addressIndex].AltPhoneNo}
                        size="small"
                        color="warning"
                      />
                    ) : null}
                  </Stack>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Staatliches",
                      letterSpacing: "1px",
                    }}
                  >
                    Payment Details
                  </Typography>
                  <Stack
                    sx={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    spacing={2}
                  >
                    <Typography variant="body2">Total Items :</Typography>
                    <Chip label={checkout.totalItems} size="small" />
                    <Typography variant="body2">Order Total :</Typography>
                    <Chip
                      icon={<RupeeIcon />}
                      label={checkout.orderTotal}
                      size="small"
                    />
                  </Stack>
                  {stopCheckout ? (
                    <Alert severity="warning">
                      <AlertTitle>Out of Stock!</AlertTitle>
                      <Typography variant="caption">
                        Some Items have Either gone Out of Stock or Currently
                        not Available. It May be Possible that Items Quantity
                        have Gone less than You Require. We Suggest to Re-Place
                        Your Order from Start.
                      </Typography>
                    </Alert>
                  ) : null}
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button
                      startIcon={<BackIcon />}
                      variant="contained"
                      sx={{ letterSpacing: "1px", fontSize: "12px" }}
                      onClick={PrevPanel}
                      size="small"
                      color="warning"
                    >
                      Go to Payments
                    </Button>
                    <LoadingButton
                      loading={orderLoad}
                      endIcon={orderPlaced ? <CheckIcon /> : <ShippingIcon />}
                      variant="contained"
                      sx={{ letterSpacing: "1px", fontSize: "12px" }}
                      size="small"
                      color="success"
                      onClick={handelPlaceOrder}
                      disabled={stopCheckout}
                    >
                      {orderPlaced
                        ? "Order Placed Successfully"
                        : orderLoad
                        ? "Placing..."
                        : "Place Order"}
                    </LoadingButton>
                  </Stack>
                </Stack>
              )}
            </Stack>

            <Button onClick={() => setPanel((prev) => prev + 1)}>
              Next Panel
            </Button>
            <Button onClick={() => setPanel((prev) => prev - 1)}>
              Prev Panel
            </Button>
          </Stack>
        )
      ) : (
        <Alert severity="error">
          <AlertTitle>Authorization Failed!</AlertTitle>
          You are not Logged In.
        </Alert>
      )}
    </>
  );
};

export default Payment;
