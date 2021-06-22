import React from "react";
import "./OrderTracking.css";
import {Link} from "react-router-dom";

function OrderTracking() {
  var orderID = {
    color: "rgb(72, 72, 245)",
    fontWeight: "bold",
  };
  var ArrivalDate = {
    color: "rgb(45, 223, 45)",
    fontWeight: "bold",
  };
  return (
    <div className="order-tracking-container-body">
      <div className="order-tracking-container">
        <div className="order-description">
          <div>
            ORDER <span style={orderID}>#Y34XDHR</span>
          </div>
          <div>
            Expected Arrival <span style={ArrivalDate}>22/06/2021</span>
          </div>
        </div>
        <div className="order-status">
          <span className="checkpoint">
            {/* change className to = "far fa-circle for empty circle" */}
            <i className="fas fa-check-circle" />
            {/* change className to = "fas fa-check-circle" for filled circle */}
          </span>
          <span className="progress-bar">
            {/* className = "filled-0" for 0% filled bar
                className = "filled-25" for 25% filled bar
                className = "filled-50" for 50% filled bar
                className = "filled-75" for 75% filled bar
                className = "filled-100" for 100% filled bar
            */}
            <div className="filled-75"></div>
          </span>
          <span className="checkpoint">
            <i className="far fa-circle" />
          </span>
          <span className="progress-bar">
            <div className="filled-0"></div>
          </span>
          <span className="checkpoint">
            <i className="far fa-circle" />
          </span>
          <span className="progress-bar">
            <div className="filled-0"></div>
          </span>
          <span className="checkpoint">
            <i className="far fa-circle" />
          </span>
        </div>
        <div className="order-status-icons">
          <p>
            <i class="fas fa-clipboard-check"></i>&nbsp;
            <b>
              Order
              <br />
              Confirmed
            </b>
          </p>
          <p>
            <i class="fas fa-dolly-flatbed"></i>&nbsp;
            <b>
              Order
              <br />
              Shipped
            </b>
          </p>
          <p>
            <i class="fas fa-shipping-fast"></i>&nbsp;
            <b>
              Order
              <br />
              En&nbsp;Route
            </b>
          </p>
          <p>
            <i class="fas fa-check-double"></i>&nbsp;
            <b>
              Order
              <br />
              Delivered
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}
export default OrderTracking;
