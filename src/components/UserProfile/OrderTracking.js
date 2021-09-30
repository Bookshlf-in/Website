import {React, useState, useEffect} from "react";
import "./OrderTracking.css";
import {useParams, useHistory} from "react-router-dom";
import axios from "../../axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

var orderID = {
  color: "rgb(72, 72, 245)",
  fontWeight: "bold",
};
var ArrivalDate = {
  color: "rgb(45, 223, 45)",
  fontWeight: "bold",
};

function getSteps() {
  return ["Order Placed", "Order Shipped", "Order En Route", "Order Delivered"];
}

function getStepContent(stepIndex) {
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
}
function OrderTracking() {
  const params = useParams();
  const orderId = params.orderId;
  const history = useHistory();
  const [order, setorder] = useState({});
  const [load, setload] = useState(false);
  const [cls, setcls] = useState({
    Cls: "fas fa-window-close",
    msg: "Cancel Order",
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get(`/getOrderDetails?orderId=${orderId}`)
        .then((response) => {
          setorder(response.data);
          // console.log(response.data);
          setActiveStep(Math.round(response.data.progress / 25));
          setload(true);
        })
        .catch((error) => {});
    };
    fetchdata();
  }, []);

  const handelCancelOrder = (ORDERID) => {
    setcls({
      Cls: "fas fa-spinner",
      msg: "Cancelling...",
    });
    axios
      .delete("/cancelOrder", {
        data: {orderId: ORDERID},
      })
      .then((response) => {
        setcls({
          Cls: "fas fa-check-circle",
          msg: "Cancelled",
        });
        // console.log(response.data);
        setTimeout(() => {
          history.push("/UserProfile/2");
        }, 3000);
      });
  };
  const handelReceipt = () => {};

  return (
    <div className="order-tracking-container-body">
      {load ? (
        <div className="order-tracking-container">
          <div className="order-description">
            <div>
              ORDER ID : <span style={orderID}>{order._id}</span>
            </div>
            {/* <div>
              Expected Arrival :{" "}
              <span style={ArrivalDate}>
                {order.expectedDeliveryDate.substr(0, 10)}
              </span>
            </div> */}
          </div>
          <div className="order-details">
            <img src={order.photo} alt="" height="250px" />
          </div>
          <div className="order-details">
            <h1>Book Details</h1>
            <ul style={{listStyle: "none"}}>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;<b>Book Name</b>
                </span>
                {order.title}
              </li>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;<b>Book Author</b>
                </span>
                {order.author}
              </li>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;<b>Seller Name</b>
                </span>
                {order.sellerName}
              </li>
            </ul>
          </div>
          <div className="order-details">
            <h1>Customer Details</h1>
            <ul style={{listStyle: "none"}}>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;
                  <b>Customer Name</b>
                </span>
                {order.customerName}
              </li>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;
                  <b>Delivery Address</b>
                </span>
                {order.customerAddress.address +
                  ", " +
                  order.customerAddress.city +
                  ", " +
                  order.customerAddress.state +
                  " " +
                  order.customerAddress.zipCode}
              </li>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;
                  <b>Contact Number</b>
                </span>
                {order.customerAddress.phoneNo}
              </li>
            </ul>
          </div>
          <div className="order-details">
            <h1>Order Details</h1>
            <ul style={{listStyle: "none"}}>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;<b>Item Price</b>
                </span>
                <span className="price-tag">
                  <i className="fas fa-rupee-sign" />
                  &nbsp;{order.price + " /-"}
                </span>
              </li>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;
                  <b>Item Quantity</b>
                </span>
                {order.purchaseQty + ".0"}
              </li>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;
                  <b>Shipping Charges</b>
                </span>
                <i className="fas fa-rupee-sign" />
                {order.shippingCharges + " /-"}
              </li>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;<b>Order Total</b>
                </span>
                <span className="price-tag">
                  <i className="fas fa-rupee-sign" />
                  {order.orderTotal + " /-"}
                </span>
              </li>
            </ul>
          </div>
          <div className="order-progress">
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              style={{backgroundColor: "aliceblue", width: "100%"}}
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
          </div>
          <div className="order-tracking-buttons">
            <div
              className="cancel-order-button"
              id={order._id}
              onClick={(e) => {
                if (order.progress < 100) handelCancelOrder(e.target.id);
              }}
            >
              <i
                className={cls.Cls}
                style={{fontSize: "16px", color: "white"}}
              />
              &nbsp;&nbsp;{cls.msg}
            </div>
            <div className="download-receipt-button">
              <i className="fas fa-download" />
              &nbsp;&nbsp;Receipt
            </div>
          </div>
        </div>
      ) : (
        <div
          className="page-loader"
          style={{display: "flex", width: "calc(100% - 40px)"}}
        >
          <CircularProgress
            style={{height: "50px", width: "50px", color: "rgb(47, 218, 47)"}}
          />
        </div>
      )}
    </div>
  );
}
export default OrderTracking;
