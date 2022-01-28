import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// components
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

// icons
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CallIcon from "@mui/icons-material/CallRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/FileCopy";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& span": {
      fontFamily: "PT sans !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
    },
    "& label": {
      fontFamily: "PT sans !important",
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

  // functional Components
  const [next, setnext] = useState(false);
  const [load, setload] = useState(false);
  const [cancelLoad, setcancelLoad] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [payload, setpayload] = useState(false);
  const [trackLoad, setTrackLoad] = useState(false);

  // Data States
  const [order, setorder] = useState({});
  const [paid, setpaid] = useState(false);
  const [paidAmt, setPaidAmt] = useState(0);
  const [trackLink, settrackLink] = useState("");
  const [trackDetails, settrackDetails] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(40);

  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/admin-getOrderDetails", {
          params: { orderId: params.orderId },
        })
        .then((response) => {
          setorder(response.data);
          setpaid(response.data.isSellerPaid);
          settrackLink(response.data?.externalTrackingLink);
          settrackDetails(response.data?.externalTrackingDetails);
          setDeliveryDate(response.data?.expectedDeliveryDate.substr(0, 10));
          setDeliveryCharge(
            !isNaN(response.data?.adminDeliveryExpense)
              ? response.data?.adminDeliveryExpense
              : 0
          );
          setActiveStep(Math.round(response.data.progress / 25));
          axios
            .get(
              `/getSellerEarning?price=${Number(
                response.data.price * response.data.purchaseQty
              )}`
            )
            .then((earnings) => {
              setload(true);
              setPaidAmt(earnings.data.sellerEarning);
            });
        })
        .catch((error) => {});
    };
    fetchdata();
  }, []);

  const handelCancelOrder = () => {
    setcancelLoad(true);
    axios
      .delete("/admin-markOrderAsCancelled", {
        data: { orderId: order._id },
      })
      .then((response) => {
        setcancelLoad(false);
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  const handleNextStep = (OrderId) => {
    setnext(true);
    if (activeStep === 0) {
      axios
        .post("/admin-markOrderAsPacked", { orderId: OrderId })
        .then((response) => {
          axios
            .post("/admin-changeOrderProgress", {
              orderId: OrderId,
              progress: 25,
            })
            .then(() => {
              setActiveStep(1);
              setnext(false);
            })
            .catch(() => {
              setnext(false);
            });
        })
        .catch((error) => {
          // console.log(error.response.data);
          if (error.response.data.error === "Order already marked as packed") {
            setActiveStep(1);
            setnext(false);
          }
        });
    } else if (activeStep === 1) {
      axios
        .post("/admin-markOrderAsShipped", { orderId: OrderId })
        .then((response) => {
          axios
            .post("/admin-changeOrderProgress", {
              orderId: OrderId,
              progress: 50,
            })
            .then(() => {
              setActiveStep(2);
              setnext(false);
            })
            .catch(() => {
              setnext(false);
            });
        })
        .catch();
    } else if (activeStep === 2) {
      axios
        .post("/admin-changeOrderProgress", {
          orderId: OrderId,
          progress: 75,
        })
        .then(() => {
          setActiveStep(3);
          setnext(false);
        })
        .catch(() => {
          setnext(false);
        });
    } else if (activeStep === 3) {
      axios
        .post("/admin-markOrderAsCompleted", { orderId: OrderId })
        .then((response) => {
          axios
            .post("/admin-changeOrderProgress", {
              orderId: OrderId,
              progress: 100,
            })
            .then(() => {
              setActiveStep(4);
              setnext(false);
            })
            .catch(() => {
              setnext(false);
            });
        })
        .catch();
    }
  };

  const sendSellerPay = () => {
    setpayload(true);
    axios
      .post("/admin-sendSellerPayment", {
        orderId: params.orderId,
      })
      .then((response) => {
        setpayload(false);
        setpaid(true);
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  const updateOrder = () => {
    setTrackLoad(true);
    axios
      .post("/admin-updateOrder", {
        orderId: params.orderId,
        externalTrackingLink: trackLink,
        externalTrackingDetails: trackDetails,
        expectedDeliveryDate: deliveryDate,
        adminDeliveryExpense: deliveryCharge,
      })
      .then((response) => {
        setTrackLoad(false);
      })
      .catch((error) => {
        setTrackLoad(false);
      });
  };

  // Custom Copy Component
  const CopyableText = (props) => {
    const [copied, setcopied] = useState(false);

    const CopyText = () => {
      navigator.clipboard.writeText(props.text);
      setcopied(true);
      setTimeout(() => {
        setcopied(false);
      }, 3000);
    };

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{ cursor: "pointer" }}
        alignItems="center"
      >
        <Typography
          variant="caption"
          className={classes.root}
          color={copied ? "primary" : "default"}
        >
          {props.text}
        </Typography>
        <Tooltip
          arrow
          title="Click to Copy"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" onClick={CopyText}>
            {!copied ? (
              <CopyIcon color="inhert" sx={{ height: 12, width: 12 }} />
            ) : (
              <CopiedIcon color="inhert" sx={{ height: 12, width: 12 }} />
            )}
          </Typography>
        </Tooltip>

        {copied ? (
          <Typography
            sx={{ fontSize: "9px" }}
            className={classes.root}
            color="primary"
          >
            Copied!
          </Typography>
        ) : null}
      </Stack>
    );
  };

  return (
    <>
      {load ? (
        <Stack
          direction="column"
          spacing={3}
          sx={{ width: "100%", padding: "10px" }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1" className={classes.root}>
              ORDER ID :
            </Typography>
            <CopyableText text={order._id} />
          </Stack>
          {/* ================= Book Details ===================== */}
          <Stack direction="row" spacing={5}>
            <Avatar
              alt={order.title}
              src={order.photo}
              sx={{ height: 500, width: 300 }}
              variant="rounded"
            />
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Book Details
                </ListSubheader>
              }
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Book ID"
                  secondary={<CopyableText text={order.bookId} />}
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
                  secondary={
                    <Chip
                      icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                      label={order.price}
                      size="small"
                      color="default"
                    />
                  }
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
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Customer ID"
                  secondary={<CopyableText text={order.customerId} />}
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
              <List
                subheader={
                  <ListSubheader className={classes.root}>
                    Customer Address
                  </ListSubheader>
                }
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
                        <Chip
                          label={
                            <CopyableText
                              text={order.customerAddress.phoneNo}
                            />
                          }
                          size="small"
                          icon={<CallIcon />}
                          color="primary"
                          variant="outlined"
                        />{" "}
                        {order.customerAddress.altPhoneNo ? (
                          <Chip
                            label={
                              <CopyableText
                                text={order.customerAddress.altPhoneNo}
                              />
                            }
                            size="small"
                            icon={<CallIcon />}
                            color="secondary"
                            variant="outlined"
                          />
                        ) : null}
                      </>
                    }
                  />
                </ListItem>
              </List>
            </List>
            {/* ================================================= */}
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Seller Details
                </ListSubheader>
              }
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Seller ID"
                  secondary={<CopyableText text={order.sellerId} />}
                />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemIcon>
                  <NextIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Seller Name"
                  secondary={order.sellerName}
                />
              </ListItem>
              <Divider />
              <List
                subheader={
                  <ListSubheader className={classes.root}>
                    Seller Address
                  </ListSubheader>
                }
              >
                <ListItem disablePadding>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Address"
                    secondary={order.sellerAddress.address}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="State"
                    secondary={order.sellerAddress.state}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="City"
                    secondary={order.sellerAddress.city}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Zip Code"
                    secondary={order.sellerAddress.zipCode}
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
                        <Chip
                          label={
                            <CopyableText text={order.sellerAddress.phoneNo} />
                          }
                          size="small"
                          icon={<CallIcon />}
                          color="primary"
                          variant="outlined"
                        />{" "}
                        {order.sellerAddress.altPhoneNo ? (
                          <Chip
                            label={
                              <CopyableText
                                text={order.sellerAddress.altPhoneNo}
                              />
                            }
                            size="small"
                            icon={<CallIcon />}
                            color="secondary"
                            variant="outlined"
                          />
                        ) : null}
                      </>
                    }
                  />
                </ListItem>
              </List>
            </List>
          </Stack>
          {/* ==================================================================================== */}
          <Stack direction="row" spacing={5} justifyContent="center">
            <List
              subheader={
                <ListSubheader className={classes.root}>
                  Order Details
                </ListSubheader>
              }
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Item Price"
                    secondary={
                      <Chip
                        icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                        label={order.price}
                        size="small"
                        color="default"
                      />
                    }
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
                    secondary={
                      <Chip
                        label={order.purchaseQty}
                        size="small"
                        color="default"
                      />
                    }
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
                    secondary={
                      <Chip
                        icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                        label={order.shippingCharges}
                        size="small"
                        color="default"
                      />
                    }
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
                    secondary={
                      <Chip
                        icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                        label={order.orderTotal}
                        size="small"
                        color="default"
                      />
                    }
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
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Payment Mode"
                    secondary={
                      <Chip
                        label={order.paymentMode}
                        size="small"
                        color="default"
                      />
                    }
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
                    secondary={
                      <Chip
                        label={order.paymentStatus}
                        color={
                          order.paymentStatus === "Pending"
                            ? "warning"
                            : "success"
                        }
                        size="small"
                      />
                    }
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
                    primary="Paid To Seller"
                    secondary={
                      <Chip
                        label={order.isSellerPaid ? "YES" : "NO"}
                        color={order.isSellerPaid ? "success" : "error"}
                        size="small"
                      />
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <List
              subheader={
                <ListSubheader className={classes.root}>Earnings</ListSubheader>
              }
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NextIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.root}
                    primary="Total Earnings in This Order"
                    secondary={
                      <Chip
                        icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                        label={order.orderTotal - paidAmt - deliveryCharge}
                        size="small"
                        color="success"
                      />
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>

          <Typography variant="h4" align="center">
            <strong>External Tracking Details</strong>
          </Typography>
          <Stack justifyContent="center" alignItems="center">
            <TextField
              className={classes.root}
              label="External Order Tracking Link"
              variant="filled"
              sx={{ width: 400 }}
              onChange={(e) => settrackLink(e.target.value)}
              value={trackLink}
              size="small"
            />
          </Stack>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <TextField
              className={classes.root}
              label="External Order Tracking Details"
              variant="filled"
              sx={{ width: 400 }}
              onChange={(e) => settrackDetails(e.target.value)}
              value={trackDetails}
              size="small"
            />
            <label htmlFor="admin-expected-delivery-date">
              <Typography className={classes.root} color="primary">
                Expected Delivery date
              </Typography>
            </label>
            <input
              type="date"
              id="admin-expected-delivery-date"
              name="expected-delivery-date"
              value={deliveryDate}
              min="2022-01-01"
              max="2025-12-31"
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
            <TextField
              className={classes.root}
              label="Real Delivery Expense for this Order"
              variant="filled"
              sx={{ width: 400 }}
              onChange={(e) => setDeliveryCharge(e.target.value)}
              value={deliveryCharge}
              size="small"
            />
            <LoadingButton
              loading={trackLoad}
              loadingPosition="end"
              endIcon={<NextIcon />}
              variant="contained"
              color="primary"
              className={classes.root}
              onClick={updateOrder}
              size="small"
            >
              Update Details
            </LoadingButton>
          </Stack>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={classes.root}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div></div>
            ) : (
              <div
                style={{
                  padding: "10px",
                  textAlign: "center",
                  color: "#1dff02",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {getStepContent(activeStep)}
              </div>
            )}
          </div>
          <div
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button
              className={classes.root}
              variant="contained"
              color="primary"
              onClick={() => handleNextStep(order._id)}
              disabled={activeStep === 4}
              size="small"
            >
              {next ? (
                <>
                  <CircularProgress size={16} color="inherit" />
                  &nbsp;&nbsp;
                </>
              ) : (
                <></>
              )}
              {activeStep === steps.length - 1 ? "Finish" : "Next Step"}
            </Button>
          </div>

          <Stack
            direction="row"
            spacing={5}
            justifyContent="center"
            alignItems="center"
          >
            {activeStep < 4 ? (
              <LoadingButton
                loading={cancelLoad}
                loadingPosition="end"
                endIcon={<CancelIcon />}
                variant="contained"
                color="error"
                className={classes.root}
                onClick={handelCancelOrder}
                disabled={order.status === "Cancelled"}
                size="small"
              >
                Cancel Order
              </LoadingButton>
            ) : null}
            <LoadingButton
              loading={payload}
              loadingPosition="end"
              endIcon={paid ? <CheckIcon /> : <NextIcon />}
              variant="outlined"
              color="success"
              className={classes.root}
              onClick={sendSellerPay}
              disabled={paid}
              size="small"
            >
              {paid ? "Paid To Seller" : "Send Payment to Seller"} ({paidAmt})
            </LoadingButton>
            {paid ? (
              <Typography variant="body2" className={classes.root}>
                Successfully Paid to Seller. Amount Transfered to Seller Wallet.
              </Typography>
            ) : null}
          </Stack>
        </Stack>
      ) : (
        <LinearProgress sx={{ width: "100%" }} />
      )}
    </>
  );
};
export default OrderTracking;
