import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet-async";
import axios from "../../axios";

// components
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";

// icons
import NextIcon from "@mui/icons-material/NavigateNextRounded";
// import CancelIcon from "@mui/icons-material/CancelRounded";
import SupportIcon from "@mui/icons-material/SupportAgent";

// Custom Component
import Reciept from "./Reciept";

const useStyles = makeStyles({
  root: {
    fontFamily: "Staatliches !important",
    "& span": {
      fontFamily: "Staatliches !important",
      fontSize: "14px",
    },
    "& p": {
      fontFamily: "Roboto !important",
      fontSize: "12px",
      fontWeight: "bolder !important",
    },
    "& input": {
      fontFamily: "Roboto !important",
    },
    "& label": {
      fontFamily: "Staatliches !important",
    },
  },
});

const getSteps = () => {
  return ["Order Placed", "Order Shipped", "Order En Route", "Order Delivered"];
};

const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return "Your Order Has Been Received and is Currently Being Processed";
    case 1:
      return "Your Order Has been Packed and Ready for Shipment";
    case 2:
      return "Your Order Has Been Shipped and Order is Currently on the Way";
    case 3:
      return "Your Order Has Been Delivered";
    default:
      return "Unknown stepIndex";
  }
};

const OrderTracking = () => {
  const classes = useStyles();
  const params = useParams();
  const steps = getSteps();

  const [order, setorder] = useState({});
  const [load, setload] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cancelLoad, setcancelLoad] = useState(false);
  const [cancelled, setcancelled] = useState(false);
  const [trackLink, settrackLink] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/getOrderDetails", {
          params: { orderId: params.orderId },
        })
        .then((response) => {
          setorder(response.data);
          settrackLink(response.data?.externalTrackingLink);
          // console.log(response.data);
          setActiveStep(Math.round(response.data.progress / 25));
          setload(true);
        })
        .catch((error) => {});
    };
    fetchdata();
  }, []);

  const handelCancelOrder = () => {
    setcancelLoad(true);
    axios
      .delete("/cancelOrder", {
        data: { orderId: order._id },
      })
      .then((response) => {
        setcancelLoad(false);
        setcancelled(true);
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  return (
    <>
      <Helmet>
        <title>Track | Bookshlf</title>
      </Helmet>
      {load ? (
        <Stack
          direction="column"
          spacing={3}
          sx={{ width: "100%", padding: "10px" }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1" className={classes.root}>
              ORDER ID :
            </Typography>
            <Chip label={order._id} color="primary" size="small" />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="body1"
              className={classes.root}
              sx={{ color: "green" }}
            >
              Expected Delivery Date :
            </Typography>
            <Chip
              label={order?.expectedDeliveryDate?.substr(0, 10)}
              color="success"
              size="small"
            />
          </Stack>
          {/* ================= Book Details ===================== */}
          <Stack direction="column" spacing={2} alignItems="center">
            <Avatar
              alt={order.title}
              src={order.photo}
              sx={{ height: 250, width: 200 }}
              variant="rounded"
            />
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Book Details
                </ListSubheader>
              }
              sx={{ width: "100%" }}
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Book ID"
                  secondary={order.bookId}
                />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Book Name"
                  secondary={order.title}
                />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Book Author"
                  secondary={order.author}
                />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Book Selling Price"
                  secondary={order.price + "/-"}
                />
              </ListItem>
            </List>
            {/* ================================================= */}
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Customer Details
                </ListSubheader>
              }
              sx={{ width: "100%" }}
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Customer ID"
                  secondary={order.customerId}
                />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Customer Name"
                  secondary={order.customerName}
                />
              </ListItem>
              <Divider />
            </List>
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Customer Address
                </ListSubheader>
              }
              sx={{ width: "100%" }}
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Address"
                  secondary={order.customerAddress.address}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="State"
                  secondary={order.customerAddress.state}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="City"
                  secondary={order.customerAddress.city}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Zip Code"
                  secondary={order.customerAddress.zipCode}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Contact"
                  secondary={
                    <>
                      {order.customerAddress.phoneNo}{" "}
                      {order.customerAddress.altPhoneNo
                        ? order.customerAddress.altPhoneNo
                        : null}
                    </>
                  }
                />
              </ListItem>
            </List>
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Order Details
                </ListSubheader>
              }
              sx={{ width: "100%" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Item Price"
                    secondary={order.price + "/-"}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Purchase Quantity"
                    secondary={order.purchaseQty}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Shipping Charges"
                    secondary={order.shippingCharges + "/-"}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Order Total"
                    secondary={order.orderTotal + "/-"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            {/* ============================================================= */}
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Payment Details
                </ListSubheader>
              }
              sx={{ width: "100%" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Payment Mode"
                    secondary={order.paymentMode}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Payment Status"
                    secondary={order.paymentStatus}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Order Total"
                    secondary={order.orderTotal + "/-"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
          {/* ==================================================================================== */}

          <Stack
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            spacing={2}
            justifyContent="center"
          >
            {order.status[order.status.length - 1] !== "Cancelled" ? (
              <Button
                endIcon={<NextIcon />}
                variant="outlined"
                color="primary"
                className={classes.root}
                href={trackLink}
                target="_blank"
                size="small"
                sx={{ maxWidth: 300 }}
              >
                Courier Track Link
              </Button>
            ) : null}
            {order.status[order.status.length - 1] !== "Cancelled" ? (
              <Reciept order={order} />
            ) : null}
          </Stack>
          {order?.externalTrackingDetails?.length ? (
            <Typography
              variant="caption"
              align="center"
              color="primary"
              className={classes.root}
            >
              {order.externalTrackingDetails}
            </Typography>
          ) : null}
          {!cancelled &&
          order.status[order.status.length - 1] !== "Cancelled" ? (
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className={classes.root}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography>{label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : null}

          {activeStep === steps.length ||
          order?.externalTrackingDetails?.length ? null : (
            <Typography
              variant="caption"
              align="center"
              className={classes.root}
              sx={{ color: "yellowgreen" }}
            >
              {getStepContent(activeStep)}
            </Typography>
          )}
          {cancelled ||
          order.status[order.status.length - 1] === "Cancelled" ? (
            <Alert
              severity="success"
              color="error"
              size="small"
              className={classes.root}
            >
              Order Cancelled!
            </Alert>
          ) : null}
          <Stack spacing={2} justifyContent="center" alignItems="center">
            {/* {activeStep < 4 ? (
              <LoadingButton
                loading={cancelLoad}
                loadingPosition="end"
                endIcon={<CancelIcon />}
                variant="contained"
                color="error"
                className={classes.root}
                onClick={handelCancelOrder}
                disabled={
                  order.status[order.status.length - 1] === "Cancelled" ||
                  cancelled
                }
                sx={{ maxWidth: 300 }}
              >
                Cancel Order
              </LoadingButton>
            ) : null} */}
            <Button
              color="primary"
              startIcon={<SupportIcon />}
              variant="outlined"
            >
              <Link to="/Contact">Contact for Help</Link>
            </Button>
          </Stack>
        </Stack>
      ) : (
        <LinearProgress sx={{ width: "100%" }} />
      )}
    </>
  );
};
export default OrderTracking;
