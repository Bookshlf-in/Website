import {React, useState} from "react";
import "./AdminPanel.css";
import BookVerification from "./BookVerification";
import OrderDetails from "./OrderDetails";
import SellerBooks from "./SellerBooks";
import UpdateOrder from "./UpdateOrder";

const active = {
  color: " black",
  backgroundColor: "rgb(233, 232, 232)",
  border: "1px solid black",
  borderBottom: "none",
};
const Orders = () => {
  const [panel, setpanel] = useState("1");
  return (
    <div className="panel-orders-container">
      <ul className="panel-orders-ul">
        <li
          className="panel-orders-book-verification"
          onClick={() => {
            setpanel("1");
          }}
          style={panel === "1" ? active : {}}
        >
          Book Verification
        </li>
        <li
          className="panel-orders-seller-orders"
          onClick={() => {
            setpanel("2");
          }}
          style={panel === "2" ? active : {}}
        >
          Seller Books
        </li>
        <li
          className="panel-orders-get-order-details"
          onClick={() => {
            setpanel("3");
          }}
          style={panel === "3" ? active : {}}
        >
          Get Orders List
        </li>
        <li
          className="panel-orders-get-order-details"
          onClick={() => {
            setpanel("4");
          }}
          style={panel === "4" ? active : {}}
        >
          Get Order Details
        </li>
      </ul>
      {panel === "1" ? (
        <BookVerification />
      ) : panel === "2" ? (
        <SellerBooks />
      ) : panel === "3" ? (
        <OrderDetails />
      ) : panel === "4" ? (
        <UpdateOrder />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Orders;
