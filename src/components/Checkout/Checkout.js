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
import CheckoutPayment from "./CheckoutPayment";
import CheckoutOrderReview from "./CheckoutOrderReview";

const PanelTitle = [
  "Shipping Address",
  "Payment Details",
  "Review Order",
  "Place Order",
];

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
              spacing={2}
            >
              {panel === 0 ? (
                <CheckoutAddress
                  address={address}
                  setAddress={setAddress}
                  addressId={addressId}
                  setAddressId={setAddressId}
                />
              ) : panel === 1 ? (
                <CheckoutPayment
                  checkout={checkout}
                  checkoutType={checkoutType}
                />
              ) : (
                <CheckoutOrderReview
                  address={address}
                  addressId={addressId}
                  checkout={checkout}
                />
              )}
              <Stack
                direction="row"
                sx={{ width: "100%" }}
                justifyContent="space-between"
                spacing={2}
                alignItems="center"
              >
                {panel > 0 && (
                  <Button
                    onClick={PrevPanel}
                    variant="outlined"
                    startIcon={<BackIcon />}
                    size="small"
                    color="warning"
                  >
                    {PanelTitle[panel - 1]}
                  </Button>
                )}
                {panel < 3 && (
                  <Button
                    onClick={NextPanel}
                    variant="contained"
                    endIcon={<NextIcon />}
                    size="small"
                  >
                    {PanelTitle[panel + 1]}
                  </Button>
                )}
              </Stack>
            </Stack>
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
