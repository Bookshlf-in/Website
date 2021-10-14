import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
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
  const [order, setorder] = useState({});
  const [load, setload] = useState(false);
  const [cls, setcls] = useState({
    Cls: "fas fa-window-close",
    msg: "Cancel Order",
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [next, setnext] = useState(false);
  const [back, setback] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/admin-getOrderDetails", {
          params: { orderId: params.orderId },
        })
        .then((response) => {
          setorder(response.data);
          console.log(response.data);
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
      msg: "Cancelling Order...",
    });
    axios
      .delete("/admin-markOrderAsCancelled", {
        data: { orderId: ORDERID },
      })
      .then((response) => {
        setcls({
          Cls: "fas fa-check-circle",
          msg: "Order Cancelled",
        });
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
  const handlePrevStep = (OrderId) => {
    setback(true);
    if (activeStep === 4) {
      axios
        .post("/admin-changeOrderProgress", {
          orderId: OrderId,
          progress: 75,
        })
        .then(() => {
          setActiveStep(3);
          setback(false);
        })
        .catch(() => {
          setback(false);
        });
    } else if (activeStep === 3) {
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
              setback(false);
            })
            .catch(() => {
              setback(false);
            });
        })
        .catch();
    } else if (activeStep === 2) {
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
              setback(false);
            })
            .catch(() => {
              setback(false);
            });
        })
        .catch();
    } else if (activeStep === 1) {
      axios
        .post("/admin-changeOrderProgress", {
          orderId: OrderId,
          progress: 0,
        })
        .then(() => {
          setActiveStep(0);
          setback(false);
        })
        .catch(() => {
          setback(false);
        });
    }
  };
  return (
    <div className="order-tracking-container-body">
      {load ? (
        <div className="order-tracking-container">
          <div className="order-description">
            <div>
              ORDER ID : <span style={orderID}>#{order._id}</span>
            </div>
            {/* <div>
              Expected Arrival :{" "}
              <span style={ArrivalDate}>
                {order.expectedDeliveryDate.substr(0, 10)}
              </span>
            </div> */}
          </div>
          <div className="order-details">
            <img src={order.photo} alt="" height="250" />
          </div>
          <div className="order-details">
            <h1>Book Details</h1>
            <ul style={{ listStyle: "none" }}>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Book Name</b> : {order.title}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Book Author</b> : {order.author}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Seller Name</b> : {order.sellerName}
              </li>
            </ul>
          </div>
          <div className="order-details">
            <h1>Customer Details</h1>
            <ul style={{ listStyle: "none" }}>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Customer Name</b> : {order.customerName}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Delivery Address</b> :{" "}
                {order.customerAddress.address +
                  ", " +
                  order.customerAddress.city +
                  ", " +
                  order.customerAddress.state +
                  " " +
                  order.customerAddress.zipCode}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Contact Number</b> : {order.customerAddress.phoneNo}
              </li>
            </ul>
          </div>
          <div className="order-details">
            <h1>Order Details</h1>
            <ul style={{ listStyle: "none" }}>
              <li>
                <span>
                  <i className="fas fa-circle"></i>&nbsp;
                  <b>Item Price</b>
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
                  <i className="fas fa-circle"></i>&nbsp;
                  <b>Order Total</b>
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
              style={{
                backgroundColor: "aliceblue",
                width: "100%",
              }}
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
                variant="contained"
                color="primary"
                onClick={() => handlePrevStep(order._id)}
                disabled={activeStep === 0}
              >
                {back ? (
                  <>
                    <CircularProgress
                      style={{
                        color: "white",
                        height: "15px",
                        width: "15px",
                        fontWeight: "bold",
                      }}
                    />
                    &nbsp;&nbsp;
                  </>
                ) : (
                  <></>
                )}
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNextStep(order._id)}
                disabled={activeStep === 4}
              >
                {next ? (
                  <>
                    <CircularProgress
                      style={{
                        color: "white",
                        height: "15px",
                        width: "15px",
                        fontWeight: "bold",
                      }}
                    />
                    &nbsp;&nbsp;
                  </>
                ) : (
                  <></>
                )}
                {activeStep === steps.length - 1 ? "Finish" : "Next Step"}
              </Button>
            </div>
          </div>
          <div className="order-tracking-buttons">
            <div
              className="cancel-order-button"
              id={order._id}
              onClick={(e) => {
                handelCancelOrder(e.target.id);
              }}
            >
              <i
                className={cls.Cls}
                style={{ fontSize: "16px", color: "white" }}
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
          style={{
            display: "flex",
            width: "100%",
            height: "calc(100% - 200px)",
          }}
        >
          <CircularProgress
            style={{
              height: "100px",
              width: "100px",
              color: "green",
            }}
          />
        </div>
      )}
    </div>
  );
}
export default OrderTracking;
