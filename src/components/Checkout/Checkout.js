import { useState, useEffect, useContext } from "react";

// react router
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { Helmet } from "react-helmet-async";

// api
import axios from "../../api/axios";

//  Components
import { Stack, Button } from "@mui/material";
import { Alert, AlertTitle, Typography } from "@mui/material";

// Icons
import BackIcon from "@mui/icons-material/ArrowBackIosRounded";
import NextIcon from "@mui/icons-material/NavigateNextRounded";

// Checkout Components
import CheckoutLoading from "./CheckoutLoading";
import CheckoutStepper from "./CheckoutStepper";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutOrderReview from "./CheckoutOrderReview";
import CheckoutOrderPlace from "./CheckoutOrderPlace";

const PanelTitle = [
  "Shipping Address",
  "Payment Details",
  "Review Order",
  "Confirm Order",
];

const Payment = () => {
  // Calling Hooks
  const navigate = useNavigate();
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

  const buildRequest = () => {
    if (checkoutType === "cart")
      return {
        url: "/purchaseCart",
        body: {
          customerAddressId: addressId,
        },
      };

    return {
      url: "/purchaseBook",
      body: {
        bookId: checkoutType,
        customerAddressId: addressId,
        purchaseQty: 1,
      },
    };
  };
  // Purchasing Order
  const handelPlaceOrder = () => {
    setorderLoad(true);
    const request = buildRequest();
    axios
      .post(request.url, request.body)
      .then((res) => {
        setorderPlaced(true);
        setorderLoad(false);
        if (checkoutType === "cart") {
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({ ...user, cartitems: 0 })
          );
          setUser({ ...user, cartitems: 0 });
        }
        setTimeout(() => {
          navigate("/UserPanel/2");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response.data);
        setorderLoad(false);
      });
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
                padding: "15px 10px",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "5px",
                width: 350,
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
              ) : panel === 2 ? (
                <CheckoutOrderReview
                  address={address}
                  addressId={addressId}
                  checkout={checkout}
                />
              ) : (
                <CheckoutOrderPlace
                  orderLoad={orderLoad}
                  orderPlaced={orderPlaced}
                  handlePlaceOrder={handelPlaceOrder}
                />
              )}
              <Stack
                direction="row"
                sx={{ width: "100%" }}
                justifyContent={panel === 0 ? "flex-end" : "space-between"}
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
                    disabled={!addressId.length || orderLoad || orderPlaced}
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
                    disabled={!addressId.length || orderLoad || orderPlaced}
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
