import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../../axios";

// components
import { Stack, Chip, Avatar, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import { LinearProgress, CircularProgress } from "@mui/material";
import { TextField, Button, Alert, AlertTitle } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// icons
import NextIcon from "@mui/icons-material/NavigateNextRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";
import WeightIcon from "@mui/icons-material/FitnessCenter";

// Micro Components
import SendMail from "../../MicroComponents/Mail";
import CopyableText from "../../MicroComponents/customCopyText";

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
  const params = useParams();
  const steps = getSteps();

  // functional Components
  const [next, setnext] = useState(false);
  const [load, setload] = useState(false);
  const [cancelLoad, setcancelLoad] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [payload, setpayload] = useState(false);
  const [trackLoad, setTrackLoad] = useState(false);
  const [orderstatusLoad, setorderstatusLoad] = useState(false);

  // Data States
  const [order, setorder] = useState({});
  const [paid, setpaid] = useState(false);
  const [paidAmt, setPaidAmt] = useState(0);
  const [trackLink, settrackLink] = useState("");
  const [trackDetails, settrackDetails] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(40);
  const [sellerMail, setSellerMail] = useState("");
  const [orderstatus, setOrderStatus] = useState("");

  // ================= Mail Template ==============================
  const SellerTemplate = `<html> <head> <meta name="viewport" content="width=device-width, initial-scale=1"/> <style type="text/css"> html, body{margin: 0; padding: 0; font-family: "Roboto", sans-serif; box-sizing: border-box;}.container{padding: 10px 15px;}.row{display: flex; flex-direction: row; gap: 20px; align-items: center; margin-bottom: 5px;}small{display: block; color: #616161;}.img-title{height: 50px; margin: 10px 0px; border-radius: 5px;}.img-check{height: 30px; margin: 10px 0px; border-radius: 5px;}.order-track-btn{outline: none; border: none; padding: 10px 24px; background-color: rgb(255, 184, 54); color: white; font-size: 20px; min-width: 200px; border-radius: 5px; font-weight: bold; letter-spacing: 1px;}.table{margin-top: 10px; min-width: 300px; overflow-x: auto;}table, td{border-collapse: collapse; border-spacing: 0; border: 1px solid black;}td{padding: 10px;}.th{background-color: #616161;color:white;}</style> </head> <body> <div class="container"> <div class="row"> <div class="col-sm"> <center> <img src="https://i.ibb.co/B3Kdb9v/image-6.png" alt="bookshlf.in" class="img-title shadowed"/> </center> </div></div><div class="row"> <div class="col-sm-10 col-md-10 col-lg-11"> <h2>Your Shippment Has Been Confirmed.</h2> </div><div class="col-sm"> <center> <img src="https://i.postimg.cc/W3Rt0mwH/1538471.png" alt="bookshlf.in" class="img-check"/> </center> </div></div><div class="row"> <div class="col-sm"> <h2> Order Tracking Number <small class="tracking-number"> ${trackLink
    ?.split("=")
    ?.at(
      1
    )}</small> </h2> </div></div><div class="row"> <div class="col-sm"> <a href="${trackLink}" target="_blank"> <button class="inverse large order-track-btn shadowed"> Track </button> </a> </div></div><div class="row"> <div class="table"> <table> <tbody> <tr> <td class="th">Order ID</td><td data-label="Order Id">${
    params.orderId
  }</td></tr><tr> <td class="th">Shipping Details</td><td data-label="Shipping Details">${trackDetails}</td></tr><tr> <td class="th">Order Total</td><td data-label="Order Total">${
    order.orderTotal
  }/-</td></tr><tr> <td class="th">Current Order Status</td><td data-label="Order Status">${
    steps[activeStep]
  }</td></tr></tbody> </table> </div></div></div><hr/> <footer> <div class="container"> <div class="row"> <div class="col-sm"> <h4>For any queries related to your order</h4> </div></div><div class="row"> <div class="col-sm"> <ul> <li> <a href="https://bookshlf.in/Contact" class="contact-btn" target="_blank" > Contact Us </a> </li><li> <a href="tel:9792666122" class="contact-btn" target="_blank"> +91 97926 66122 </a> </li><li> <a href="mailto:bookshlf.in@gmail.com" class="contact-btn" target="_blank" > bookshlf.in@gmail.com </a> </li></ul> </div></div><p style="color: #616161"> Regards <br/> <b>Team Bookshlf</b> </p></div></footer> </body></html>`;

  // =============================================================
  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/admin-getOrderDetails", {
          params: { orderId: params.orderId },
        })
        .then((response) => {
          setorder(response.data);
          console.log(response.data);
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
              setPaidAmt(earnings.data.sellerEarning);
              axios
                .get("/admin-getSellerProfile", {
                  params: { sellerId: response.data.sellerId },
                })
                .then((seller) => {
                  axios
                    .get("/admin-getUserProfile", {
                      params: { userId: seller.data.userId },
                    })
                    .then((user) => {
                      setSellerMail(user.data.email);
                      setload(true);
                    })
                    .catch(() => {
                      setload(true);
                    });
                })
                .catch(() => {
                  setload(true);
                });
            })
            .catch(() => {
              setload(true);
            });
        })
        .catch((error) => {
          setload(true);
        });
    };
    fetchdata();
  }, []);

  const handelCancelOrder = () => {
    setcancelLoad(true);
    axios
      .post("/admin-markOrderAsCancelled", {
        orderId: order._id,
      })
      .then((response) => {
        setcancelLoad(false);
        setorder({ ...order, status: order.status.concat("Cancelled") });
      })
      .catch((error) => {
        setcancelLoad(false);
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

  const updateOrderStatus = (e) => {
    setorderstatusLoad(true);
    setOrderStatus(e.target.value);
    axios
      .post("/admin-updateOrder", {
        orderId: params.orderId,
        status: [...order.status, e.target.value],
      })
      .then((response) => {
        setorderstatusLoad(false);
        setorder({ ...order, status: [...order.status, e.target.value] });
      })
      .catch((error) => {
        setTrackLoad(false);
      });
  };

  const isValidStatus = (status) => {
    if (status !== "Cancelled" && status !== "RTO" && status !== "Returned")
      return true;
    return false;
  };

  // Custom List Component
  const ListItem = (props) => {
    return (
      <Stack
        spacing={1}
        // alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          minWidth: 200,
          padding: "10px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            borderBottom: "1px solid rgba(0,0,0,0.5)",
            transition: "0.3s",
          },
        }}
      >
        <div>{props.title}</div>
        <div>{props.body}</div>
      </Stack>
    );
  };

  const ListTitle = (props) => {
    return (
      <Typography
        variant="h6"
        sx={{ fontWeight: "bolder", padding: "0px 16px" }}
      >
        {props.content}
      </Typography>
    );
  };

  const ListHead = (props) => {
    return (
      <Typography sx={{ fontSize: "13px", fontFamily: "PT sans" }}>
        {props.content}
      </Typography>
    );
  };

  const ListBody = (props) => {
    return (
      <Typography sx={{ fontSize: "11px", fontWeight: "bolder" }}>
        {props.content}
      </Typography>
    );
  };

  return (
    <>
      {load ? (
        <Stack
          direction="column"
          spacing={1}
          sx={{ width: "100%", padding: "10px" }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <ListTitle content="ORDER ID : " />
            <CopyableText text={order._id} />
          </Stack>
          {/* ================= Book Details ===================== */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <Avatar
              alt={order.title}
              src={order.photo}
              sx={{
                height: 350,
                width: 280,
              }}
              variant="rounded"
            />
            <Stack
              spacing={0}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <ListTitle content="Book Details" />
              <ListItem
                title={<ListHead content="Book ID" />}
                body={<CopyableText text={order.bookId} />}
              />
              <ListItem
                title={<ListHead content="Book Name" />}
                body={<ListBody content={order.title} />}
              />
              <ListItem
                title={<ListHead content="Book Author" />}
                body={<ListBody content={order.author} />}
              />
              <ListItem
                title={<ListHead content="Book Selling Price" />}
                body={
                  <Chip
                    icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                    label={order.price}
                    size="small"
                    color="default"
                  />
                }
              />
            </Stack>
            {/* ================================================= */}
            <Stack
              spacing={0}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <ListTitle content="Customer Details" />
              <ListItem
                title={<ListHead content="Customer ID" />}
                body={<CopyableText text={order.customerId} />}
              />
              <ListItem
                title={<ListHead content="Customer Name" />}
                body={<ListBody content={order.customerName} />}
              />
              <ListItem
                body={
                  <Button
                    variant="outlined"
                    href={`https://web.whatsapp.com/send?phone=91${
                      order.customerAddress.phoneNo
                    }&text=Hi+${
                      order.customerName
                    }%0A%0AThis+is+Aman+Verma+from+Bookshlf.in%0A%0AYou+ordered+%E2%80%9C${order.title?.replace(
                      "&",
                      "and"
                    )}%E2%80%9D+book+from+Bookshlf.in%0AOrder+Id+%3D+${
                      order._id
                    }%0A%0AYour+books+will+be+delivered+within+2+weeks+if+you+want+to+confirm+the+order+then+just+type+%E2%80%9CYES%E2%80%9D&type=phone_number&app_absent=0`}
                    target="_blank"
                  >
                    Whatsapp
                  </Button>
                }
              />
            </Stack>
            {/* ================================================= */}
            <Stack
              spacing={0}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <ListTitle content="Seller Details" />
              <ListItem
                title={<ListHead content="Seller ID" />}
                body={<CopyableText text={order.sellerId} />}
              />
              <ListItem
                title={<ListHead content="Seller Name" />}
                body={<ListBody content={order.sellerName} />}
              />
              <ListItem
                title={
                  <ListHead content="Send Mail to Seller (Mail will be sent with External Tracking Details, Order Status etc.)" />
                }
                body={
                  <SendMail
                    type="button"
                    variant="outlined"
                    color="error"
                    label="Send Mail"
                    size="small"
                    to={[sellerMail]}
                    cc="vaman5629@gmail.com"
                    subject="Your Book Is Ready For Pickup. You Can Track Your Order Now."
                    template={SellerTemplate}
                  />
                }
              />
              <ListItem
                body={
                  <Button
                    variant="outlined"
                    href={`https://web.whatsapp.com/send?phone=91${
                      order.sellerAddress.phoneNo
                    }&text=Hi+${
                      order.sellerName
                    }%0A%0AThis+is+Aman+Verma+from+Bookshlf.in%0A%0AYour+book+%22${order.title?.replace(
                      "&",
                      "and"
                    )}%22+got+sold+out+and+now+here%E2%80%99s+the+further+process+to+send+your+books+to+the+buyer%0A%0APlease+watch+this+video+for+complete+information%0Ahttps%3A%2F%2Fyoutu.be%2FZ-H8aQhg3yM%0A%0A%28If+link+is+not+showing+up+then+just+save+our+contact+as+Bookshlf%2C+then+it+will+work%29%0A%0AYou+can+call+us+anytime+for+further+queries.&type=phone_number&app_absent=0`}
                    target="_blank"
                  >
                    Whatsapp
                  </Button>
                }
              />
            </Stack>
          </Stack>
          {/* ==================================================================================== */}
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{
              width: "100%",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <Stack
              spacing={0}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <ListTitle content="Customer Address" />
              <ListItem
                title={<ListHead content="Address" />}
                body={<ListBody content={order.customerAddress.address} />}
              />
              <ListItem
                title={<ListHead content="State" />}
                body={<ListBody content={order.customerAddress.state} />}
              />
              <ListItem
                title={<ListHead content="City" />}
                body={<ListBody content={order.customerAddress.city} />}
              />
              <ListItem
                title={<ListHead content="Zip Code" />}
                body={<ListBody content={order.customerAddress.zipCode} />}
              />
              <ListItem
                title={<ListHead content="Contact" />}
                body={
                  <Stack direction="row" spacing={1}>
                    <CopyableText text={order.customerAddress.phoneNo} />
                    {order.customerAddress?.altPhoneNo ? (
                      <CopyableText text={order.customerAddress.altPhoneNo} />
                    ) : null}
                  </Stack>
                }
              />
            </Stack>
            <Stack
              spacing={0}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <ListTitle content="Seller Address" />
              <ListItem
                title={<ListHead content="Address" />}
                body={<ListBody content={order.sellerAddress.address} />}
              />
              <ListItem
                title={<ListHead content="State" />}
                body={<ListBody content={order.sellerAddress.state} />}
              />
              <ListItem
                title={<ListHead content="City" />}
                body={<ListBody content={order.sellerAddress.city} />}
              />
              <ListItem
                title={<ListHead content="Zip Code" />}
                body={<ListBody content={order.sellerAddress.zipCode} />}
              />
              <ListItem
                title={<ListHead content="Contact" />}
                body={
                  <Stack direction="row" spacing={1}>
                    <CopyableText text={order.sellerAddress.phoneNo} />
                    {order.sellerAddress?.altPhoneNo ? (
                      <CopyableText text={order.sellerAddress.altPhoneNo} />
                    ) : null}
                  </Stack>
                }
              />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Stack
              spacing={0}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <ListTitle content="Order Details" />
              <ListItem
                title={<ListHead content="Item Price" />}
                body={
                  <Chip
                    icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                    label={order.price}
                    size="small"
                    color="info"
                  />
                }
              />
              <ListItem
                title={<ListHead content="Weight In Grams" />}
                body={
                  <Chip
                    icon={<WeightIcon sx={{ height: 16, width: 16 }} />}
                    label={order.weightInGrams}
                    size="small"
                    color="default"
                  />
                }
              />
              <ListItem
                title={<ListHead content="Purchase Quantity" />}
                body={
                  <Chip
                    label={order.purchaseQty}
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                }
              />
              <ListItem
                title={<ListHead content="Shipping Charges" />}
                body={
                  <Chip
                    icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                    label={order.shippingCharges}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                }
              />
              <ListItem
                title={<ListHead content="Order Total" />}
                body={
                  <Chip
                    icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                    label={order.orderTotal}
                    size="small"
                    color="secondary"
                  />
                }
              />
            </Stack>
            {/* ============================================================= */}
            <Stack
              spacing={0}
              sx={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <ListTitle content="Payment Details" />
              <ListItem
                title={<ListHead content="Payment Mode" />}
                body={
                  <Chip
                    label={order.paymentMode}
                    size="small"
                    color="default"
                  />
                }
              />
              <ListItem
                title={<ListHead content="Payment Status" />}
                body={
                  <Chip
                    label={order.paymentStatus}
                    color={
                      order.paymentStatus === "Pending" ? "warning" : "success"
                    }
                    size="small"
                  />
                }
              />
              <ListItem
                title={<ListHead content="Paid To Seller" />}
                body={
                  <Chip
                    label={order.isSellerPaid ? "YES" : "NO"}
                    color={order.isSellerPaid ? "success" : "error"}
                    size="small"
                  />
                }
              />
              <ListItem
                title={<ListHead content="Total Earnings in This Order" />}
                body={
                  <Chip
                    icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                    label={
                      Math.round(
                        (order.orderTotal - paidAmt - deliveryCharge) * 10
                      ) / 10
                    }
                    size="small"
                    color="success"
                  />
                }
              />
            </Stack>
          </Stack>
          {/* Enternal Courier Integrations */}
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              border: "1px solid rgba(0,0,0,0.2)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6"> External Courier Integrations</Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Link
                to={`/AdminCourier/Nimbuspost/${params.orderId}`}
                target="_blank"
              >
                <Button variant="contained" sx={{ minWidth: 200 }}>
                  Nimbuspost
                </Button>
              </Link>
              <Link
                to={`/AdminCourier/iCarry/${params.orderId}`}
                target="_blank"
              >
                <Button variant="contained" sx={{ minWidth: 200 }}>
                  iCarry
                </Button>
              </Link>
              <Link
                to={`/AdminCourier/EnviaShipping/${params.orderId}`}
                target="_blank"
              >
                <Button variant="contained" sx={{ minWidth: 200 }}>
                  Envia
                </Button>
              </Link>
            </Stack>
          </Stack>

          {/* ============================= */}
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              border: "1px solid rgba(0,0,0,0.2)",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <ListTitle content="External Tracking" />
            <TextField
              label="External Order Tracking Link"
              variant="filled"
              size="small"
              fullWidth
              sx={{ maxWidth: 600 }}
              onChange={(e) => settrackLink(e.target.value)}
              value={trackLink}
            />
            <TextField
              label="External Order Tracking Details"
              variant="filled"
              size="small"
              fullWidth
              sx={{ maxWidth: 600 }}
              onChange={(e) => settrackDetails(e.target.value)}
              value={trackDetails}
            />
            <TextField
              label="Real Delivery Expense for this Order"
              variant="filled"
              size="small"
              fullWidth
              sx={{ maxWidth: 600 }}
              onChange={(e) => setDeliveryCharge(e.target.value)}
              value={deliveryCharge}
            />
            <label htmlFor="admin-expected-delivery-date">
              <Typography color="primary" variant="body2">
                Expected Delivery date
              </Typography>
              <input
                type="date"
                id="admin-expected-delivery-date"
                name="expected-delivery-date"
                value={deliveryDate}
                min="2022-01-01"
                max="2025-12-31"
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </label>
            <LoadingButton
              loading={trackLoad}
              loadingPosition="end"
              endIcon={<NextIcon />}
              variant="contained"
              color="warning"
              onClick={updateOrder}
            >
              Update Details
            </LoadingButton>
          </Stack>
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              border: "1px solid rgba(0,0,0,0.2)",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <ListTitle content="Order Status" />
            <ListItem
              title={<ListHead content="Current Order Status" />}
              body={
                <Chip
                  label={order.status[order.status.length - 1]}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              }
            />
            <ListItem
              title={<ListHead content="Update Order Status" />}
              body={
                <Stack spacing={2} direction="row" alignItems="center">
                  <FormControl
                    variant="filled"
                    sx={{ m: 1, minWidth: 250 }}
                    size="small"
                  >
                    <InputLabel id="order-status">
                      Update Order Status
                    </InputLabel>
                    <Select
                      labelId="order-status"
                      value={orderstatus}
                      onChange={(e) => {
                        updateOrderStatus(e);
                      }}
                      label="Update Order Status"
                      size="small"
                    >
                      <MenuItem value="Order Confirmed">
                        Order Confirmed
                      </MenuItem>
                      <MenuItem value="Packed">Packed</MenuItem>
                      <MenuItem value="RTO">RTO</MenuItem>
                      <MenuItem value="Returned">Returned</MenuItem>
                    </Select>
                  </FormControl>
                  {orderstatusLoad ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null}
                </Stack>
              }
            />

            {isValidStatus(order.status[order.status.length - 1]) ? (
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{ width: "100%" }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            ) : null}
            {!isValidStatus(order.status[order.status.length - 1]) ||
            activeStep === steps.length ? null : (
              <ListBody content={getStepContent(activeStep)} />
            )}
            {isValidStatus(order.status[order.status.length - 1]) ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleNextStep(order._id)}
                disabled={activeStep === 4}
                endIcon={
                  next ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : activeStep === 4 ? (
                    <CheckIcon />
                  ) : (
                    <NextIcon />
                  )
                }
              >
                {activeStep === steps.length - 1
                  ? "Finish"
                  : activeStep === 4
                  ? "Order Completed"
                  : "Next Step"}
              </Button>
            ) : null}
            {order.status[order.status.length - 1] === "Cancelled" ? (
              <Alert severity="error">
                <AlertTitle>
                  <strong>Order Cancelled</strong>
                </AlertTitle>
                <Typography variant="caption">
                  Order has been cancelled.
                </Typography>
              </Alert>
            ) : null}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <LoadingButton
                loading={cancelLoad}
                loadingPosition="end"
                endIcon={<CancelIcon />}
                variant="outlined"
                color="error"
                onClick={handelCancelOrder}
                disabled={!isValidStatus(order.status[order.status.length - 1])}
              >
                Cancel Order
              </LoadingButton>

              {!paid ? (
                <LoadingButton
                  loading={payload}
                  loadingPosition="end"
                  startIcon={<RupeeIcon />}
                  endIcon={paid ? <CheckIcon /> : <NextIcon />}
                  variant="outlined"
                  color="success"
                  onClick={sendSellerPay}
                  disabled={
                    paid ||
                    !isValidStatus(order.status[order.status.length - 1]) ||
                    activeStep < 4
                  }
                >
                  {paidAmt + " (Send Payment to Seller)"}
                </LoadingButton>
              ) : null}
              {paid ? (
                <Alert>
                  <AlertTitle>{paidAmt} (Paid To Seller)</AlertTitle>
                  <Typography variant="caption">
                    Successfully Paid to Seller. Amount Transfered to Seller
                    Wallet.
                  </Typography>
                </Alert>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <LinearProgress sx={{ width: "100%" }} />
      )}
    </>
  );
};
export default OrderTracking;
