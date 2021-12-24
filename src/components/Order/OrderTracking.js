import { React, useState, useEffect } from "react";
import "./OrderTracking.css";
import { useParams, useHistory } from "react-router-dom";
import axios from "../../axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import DownloadReciept from "./DownloadReciept";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@mui/x-data-grid";

var orderID = {
  color: "rgb(72, 72, 245)",
  fontWeight: "bold",
};

function getSteps() {
  return ["Order Placed", "Order Shipped", "Order En Route", "Order Delivered"];
}

const COL = [
  {
    field: "bookDetails",
    headerName: "Book Details",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "customerDetails",
    headerName: "Customer Details",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "orderDetails",
    headerName: "Order Details",
    minWidth: 200,
    flex: 1,
  },
];
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

  const [downloadpdf, setDownloadpdf] = useState(false);
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
          setDownloadpdf(true);
        })
        .catch((error) => {});
    };
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelCancelOrder = (ORDERID) => {
    setcls({
      Cls: "fas fa-spinner",
      msg: "Cancelling...",
    });
    axios
      .delete("/cancelOrder", {
        data: { orderId: ORDERID },
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
  // const handleReceipt = () => {
  //   setDownloadpdf(true);
  // };

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

          <DataGrid
            style={{ width: "100%", minHeight: "350px", fontFamily: "PT sans" }}
            columns={COL}
            rows={[
              {
                id: 1,
                bookDetails: order.title,
                customerDetails: order.customerName,
                orderDetails: order.price + " /-",
              },
              {
                id: 2,
                bookDetails: order.author,
                customerDetails: `${
                  order.customerAddress.address +
                  ", " +
                  order.customerAddress.city +
                  ", " +
                  order.customerAddress.state +
                  " " +
                  order.customerAddress.zipCode
                }`,
                orderDetails: order.shippingCharges + " /-",
              },
              {
                id: 3,
                bookDetails: order.sellerName,
                customerDetails: order.customerAddress.phoneNo,
                orderDetails: order.purchaseQty,
              },
              {
                id: 4,
                bookDetails: "",
                customerDetails: "",
                orderDetails:
                  order.price +
                  " x " +
                  order.purchaseQty +
                  " = " +
                  order.orderTotal +
                  " /-",
              },
            ]}
          />

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
                style={{ fontSize: "16px", color: "white" }}
              />
              &nbsp;&nbsp;&nbsp;{cls.msg}
            </div>
            {/* <div className="download-receipt-button" onClick={handleReceipt}>
              <i className="fas fa-download" />
              &nbsp;&nbsp;Receipt
            </div> */}
            {downloadpdf ? (
              <DownloadReciept orderDetails={order} />
            ) : (
              <Button
                className="download-receipt-button"
                // onClick={handleReceipt}
                variant="contained"
                color="primary"
              >
                Generating Invoice...
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="page-loader"
          style={{ display: "flex", width: "calc(100% - 40px)" }}
        >
          <CircularProgress
            style={{
              height: "50px",
              width: "50px",
              color: "rgb(47, 218, 47)",
            }}
          />
        </div>
      )}
    </div>
  );
}
export default OrderTracking;
