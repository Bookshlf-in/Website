import { React, useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import axios from "../../axios";

//  Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

// Icons
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/AddRounded";
import BackIcon from "@mui/icons-material/ArrowBackIosRounded";
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import ReviewIcon from "@mui/icons-material/Grading";
import CallIcon from "@mui/icons-material/CallRounded";
import CheckIcon from "@mui/icons-material/CheckCircle";

// Use Styles
const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans !important",
    letterSpacing: "1px",
    flexGrow: "0 !important",
  },
}));

// Custom Stepper
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 35,
  height: 35,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

const ColorlibStepIcon = (props) => {
  const { active, completed, className } = props;

  const icons = {
    1: <ShippingIcon sx={{ height: 20, width: 20 }} />,
    2: <PaymentIcon sx={{ height: 20, width: 20 }} />,
    3: <ReviewIcon sx={{ height: 20, width: 20 }} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const PanelTitle = ["Shipping Address", "Payment Details", "Review Order"];

const Payment = () => {
  // Calling Hooks
  const history = useHistory();
  const classes = useStyles();
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
      // Getting Addresses
      axios.get("/getAddressList").then((response) => {
        setAddress(
          response.data.sort((a, b) => {
            return a.updatedAt < b.updatedAt
              ? 1
              : a.updatedAt > b.updatedAt
              ? -1
              : 0;
          })
        );
      });
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

  return (
    <>
      <Helmet>
        <title>Checkout | Bookshlf</title>
      </Helmet>
      {user ? (
        checkoutLoading ? (
          <Grid
            container
            sx={{ padding: "10px" }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack
                sx={{ width: "100%" }}
                justifyContent="center"
                alignItems="center"
              >
                <Skeleton variant="text" height={50} width={250} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack
                sx={{ width: "100%" }}
                justifyContent="center"
                alignItems="center"
                spacing={1}
                direction="row"
              >
                <Skeleton variant="circular" height={25} width={25} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="circular" height={25} width={25} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="circular" height={25} width={25} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack
                sx={{ width: "100%" }}
                justifyContent="center"
                alignItems="center"
              >
                <Skeleton variant="rectangular" height={300} width="100%" />
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            sx={{ padding: "10px" }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
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
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stepper
                alternativeLabel
                activeStep={panel}
                connector={<ColorlibConnector />}
              >
                {PanelTitle.map((label, index) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      <Typography variant="caption" className={classes.root}>
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {panel === 0 ? (
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
                  <FormControl fullWidth sx={{ maxWidth: 400 }}>
                    <InputLabel id="checkout-address" className={classes.root}>
                      Address
                    </InputLabel>
                    <Select
                      labelId="checkout-address"
                      value={addressId}
                      label="Address"
                      onChange={(e) => {
                        setAddressId(e.target.value);
                        setaddressIntex(
                          address.findIndex((f) => f._id === e.target.value)
                        );
                      }}
                      className={classes.root}
                    >
                      {address.map((adr) => (
                        <MenuItem
                          key={adr._id}
                          value={adr._id}
                          className={classes.root}
                        >
                          {adr.address}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    size="small"
                    color="success"
                    href="/UserPanel/4"
                    target="_blank"
                    className={classes.root}
                  >
                    Add New Address
                  </Button>
                  <Alert severity="info" size="small" className={classes.root}>
                    Kindly Reload Page If Updated Address but isn't Visible
                  </Alert>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ width: "100%", maxWidth: 800 }}
                  >
                    <Button
                      endIcon={<NextIcon />}
                      variant="contained"
                      className={classes.root}
                      sx={{ letterSpacing: "1px" }}
                      onClick={NextPanel}
                      size="small"
                    >
                      Go to Payments
                    </Button>
                  </Stack>
                </Stack>
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
                        <Typography className={classes.root} variant="caption">
                          {checkout.item.title}
                        </Typography>
                        <Typography
                          className={classes.root}
                          align="right"
                          variant="caption"
                        >
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
                          <Typography
                            className={classes.root}
                            variant="caption"
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            className={classes.root}
                            align="right"
                            variant="caption"
                          >
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
                      <Typography className={classes.root} variant="caption">
                        Items Subtotal
                      </Typography>
                      <Chip
                        icon={<RupeeIcon />}
                        label={checkout.itemsSubtotal}
                        size="small"
                        className={classes.root}
                        color="secondary"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={5}
                    >
                      <Typography className={classes.root} variant="caption">
                        Shipping Charges
                      </Typography>
                      <Chip
                        icon={<RupeeIcon />}
                        label={checkout.shippingCharges}
                        size="small"
                        className={classes.root}
                        color="info"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={5}
                    >
                      <Typography className={classes.root} variant="caption">
                        Order Total
                      </Typography>
                      <Chip
                        icon={<RupeeIcon />}
                        label={checkout.orderTotal}
                        size="small"
                        className={classes.root}
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
                      className={classes.root}
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
                      className={classes.root}
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
                    <Typography variant="body2" className={classes.root}>
                      {address[addressIndex].label + " : "}
                      <Typography variant="caption" className={classes.root}>
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
                    <Typography variant="body2" className={classes.root}>
                      Contact Number :
                    </Typography>
                    <Chip
                      icon={<CallIcon />}
                      label={address[addressIndex].phoneNo}
                      size="small"
                      className={classes.root}
                      color="primary"
                    />
                    {address[addressIndex].AltPhoneNo ? (
                      <Chip
                        icon={<CallIcon />}
                        label={address[addressIndex].AltPhoneNo}
                        size="small"
                        className={classes.root}
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
                    <Typography variant="body2" className={classes.root}>
                      Total Items :
                    </Typography>
                    <Chip
                      label={checkout.totalItems}
                      size="small"
                      className={classes.root}
                    />
                    <Typography variant="body2" className={classes.root}>
                      Order Total :
                    </Typography>
                    <Chip
                      icon={<RupeeIcon />}
                      label={checkout.orderTotal}
                      size="small"
                      className={classes.root}
                    />
                  </Stack>
                  {stopCheckout ? (
                    <Alert severity="warning" className={classes.root}>
                      <AlertTitle className={classes.root}>
                        Out of Stock!
                      </AlertTitle>
                      <Typography variant="caption" className={classes.root}>
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
                      className={classes.root}
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
                      className={classes.root}
                      sx={{ letterSpacing: "1px", fontSize: "12px" }}
                      onClick={NextPanel}
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
            </Grid>
          </Grid>
        )
      ) : (
        <Alert severity="error" className={classes.root}>
          <AlertTitle className={classes.root}>
            Authorization Failed!
          </AlertTitle>
          You are not Logged In.
        </Alert>
      )}
    </>
  );
};

export default Payment;
