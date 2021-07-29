import {React, useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import axios from "../../axios";

var orderID = {
  color: "rgb(72, 72, 245)",
  fontWeight: "bold",
};
var ArrivalDate = {
  color: "rgb(45, 223, 45)",
  fontWeight: "bold",
};

function OrderTracking() {
  const params = useParams();
  const history = useHistory();
  const [order, setorder] = useState({});
  const [load, setload] = useState(false);
  const [cls, setcls] = useState({
    Cls: "fas fa-window-close",
    msg: "Cancel Order",
  });

  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/admin-getOrderDetails", {params: {orderId: params.orderId}})
        .then((response) => {
          setorder(response.data);
          console.log(response.data);
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
      .delete("/cancelOrder", {
        data: {orderId: ORDERID},
      })
      .then((response) => {
        setcls({
          Cls: "fas fa-check-circle",
          msg: "Order Cancelled",
        });
        // console.log(response.data);
        setTimeout(() => {
          history.push("/UserProfile");
        }, 5000);
      });
  };
  const handelReceipt = () => {};

  return (
    <div className="order-tracking-container-body">
      {load ? (
        <div className="order-tracking-container">
          <div className="order-description">
            <div>
              ORDER ID : <span style={orderID}>#{order._id}</span>
            </div>
            <div>
              Expected Arrival :{" "}
              <span style={ArrivalDate}>
                {order.expectedDeliveryDate.substr(0, 10)}
              </span>
            </div>
          </div>
          <div className="order-details">
            <img src={order.photo} alt="" height="250" />
          </div>
          <div className="order-details">
            <h1>Book Details</h1>
            <ul style={{listStyle: "none"}}>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;<b>Book Name</b> :{" "}
                {order.title}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;<b>Book Author</b>{" "}
                : {order.author}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;<b>Seller Name</b>{" "}
                : {order.sellerName}
              </li>
            </ul>
          </div>
          <div className="order-details">
            <h1>Customer Details</h1>
            <ul style={{listStyle: "none"}}>
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
            <ul style={{listStyle: "none"}}>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;<b>Item Price</b> :
                &#8377;
                {order.price + " /-"}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Item Quantity</b> : {order.purchaseQty + ".0"}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;
                <b>Shipping Charges</b> : &#8377;
                {order.shippingCharges + " /-"}
              </li>
              <li>
                <i className="fas fa-circle-notch"></i>&nbsp;<b>Order Total</b>{" "}
                : &#8377;
                {order.orderTotal + " /-"}
              </li>
            </ul>
          </div>
          <div className="order-status">
            <span className="checkpoint">
              {/* change className to = "far fa-circle for empty circle" */}
              <i className="fas fa-check-circle" />
              {/* add below two lines when checkpoint is reached for sonar effect */}
              {order.progress < 25 ? (
                <>
                  <i className="far fa-circle sonar-wave1 wave" />
                  <i className="far fa-circle sonar-wave2 wave" />
                </>
              ) : (
                <></>
              )}
              {/* change className to = "fas fa-check-circle" for filled circle */}
            </span>
            <span className="progress-bar">
              {/* className = "filled-0" for 0% filled bar
                className = "filled-25" for 25% filled bar
                className = "filled-50" for 50% filled bar
                className = "filled-75" for 75% filled bar
                className = "filled-100" for 100% filled bar
            */}
              <div
                className={`filled-${
                  order.progress <= 25 ? 50 : order.progress >= 50 ? 100 : 75
                } animated-filled`}
              ></div>
            </span>
            <span className="checkpoint">
              {/* change className to = "far fa-circle for empty circle" */}
              <i
                className={
                  order.progress >= 50 ? "fas fa-check-circle" : "far fa-circle"
                }
              />
              {/* add below two lines when checkpoint is reached for sonar effect */}
              {order.progress >= 50 && order.progress < 75 ? (
                <>
                  <i className="far fa-circle sonar-wave1 wave" />
                  <i className="far fa-circle sonar-wave2 wave" />
                </>
              ) : (
                <></>
              )}
            </span>
            <span className="progress-bar">
              <div
                className={`filled-${
                  order.progress <= 50
                    ? 0
                    : order.progress >= 50 && order.progress <= 75
                    ? 75
                    : 100
                } animated-filled`}
              ></div>
            </span>
            <span className="checkpoint">
              {/* change className to = "far fa-circle for empty circle" */}
              <i
                className={
                  order.progress >= 75 ? "fas fa-check-circle" : "far fa-circle"
                }
              />
              {/* add below two lines when checkpoint is reached for sonar effect */}
              {order.progress >= 75 && order.progress < 100 ? (
                <>
                  <i className="far fa-circle sonar-wave1 wave" />
                  <i className="far fa-circle sonar-wave2 wave" />
                </>
              ) : (
                <></>
              )}
            </span>
            <span className="progress-bar">
              <div
                className={`filled-${
                  order.progress < 75
                    ? 0
                    : order.progress >= 75 && order.progress < 100
                    ? 75
                    : 100
                } animated-filled`}
              ></div>
            </span>
            <span className="checkpoint">
              {/* change className to = "far fa-circle for empty circle" */}
              <i
                className={
                  order.progress >= 100
                    ? "fas fa-check-circle"
                    : "far fa-circle"
                }
              />
              {/* add below two lines when checkpoint is reached for sonar effect */}
              {order.progress === 100 ? (
                <>
                  <i className="far fa-circle sonar-wave1 wave" />
                  <i className="far fa-circle sonar-wave2 wave" />
                </>
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="order-status-icons">
            <p
              style={{
                color:
                  order.progress >= 0 ? "rgb(47, 218, 47)" : "rgb(110,110,110)",
              }}
            >
              <i
                className="fas fa-clipboard-check"
                style={{
                  color:
                    order.progress >= 0
                      ? "rgb(47, 218, 47)"
                      : "rgb(110,110,110)",
                }}
              />
              &nbsp;
              <b>
                Order
                <br />
                Confirmed
              </b>
            </p>
            <p
              style={{
                color:
                  order.progress >= 50
                    ? "rgb(47, 218, 47)"
                    : "rgb(110,110,110)",
              }}
            >
              <i
                className="fas fa-dolly-flatbed"
                style={{
                  color:
                    order.progress >= 50
                      ? "rgb(47, 218, 47)"
                      : "rgb(110,110,110)",
                }}
              />
              &nbsp;
              <b>
                Order
                <br />
                Shipped
              </b>
            </p>
            <p
              style={{
                color:
                  order.progress >= 75
                    ? "rgb(47, 218, 47)"
                    : "rgb(110,110,110)",
              }}
            >
              <i
                className="fas fa-shipping-fast"
                style={{
                  color:
                    order.progress >= 75
                      ? "rgb(47, 218, 47)"
                      : "rgb(110,110,110)",
                }}
              />
              &nbsp;
              <b>
                Order
                <br />
                En&nbsp;Route
              </b>
            </p>
            <p
              style={{
                color:
                  order.progress === 100
                    ? "rgb(47, 218, 47)"
                    : "rgb(110,110,110)",
              }}
            >
              <i
                className="fas fa-check-double"
                style={{
                  color:
                    order.progress === 100
                      ? "rgb(47, 218, 47)"
                      : "rgb(110,110,110)",
                }}
              />
              &nbsp;
              <b>
                Order
                <br />
                Delivered
              </b>
            </p>
          </div>
          <div className="order-tracking-buttons">
            <div
              className="cancel-order-button"
              id={order._id}
              onClick={(e) => {
                handelCancelOrder(e.target.id);
              }}
            >
              <i className={cls.Cls} />
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
          style={{display: "flex", width: "80%", height: "calc(100% - 200px)"}}
        >
          <div className="page-loading" style={{display: "block"}}></div>
        </div>
      )}
    </div>
  );
}
export default OrderTracking;
