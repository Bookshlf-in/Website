import {React, useState} from "react";
import {Link} from "react-router-dom";
import axios from "../../axios";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import "./CurrentOrders.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
  },
}));

function CurrentOrders(props) {
  // console.log(props.orders);
  const classes = useStyles();
  const [alert, setalert] = useState({
    Display: false,
    Type: "success",
    Color: "",
    msg: "",
  });
  const [activeOrders, setactiveOrders] = useState(props.orders);
  const handelCancelOrder = (ORDERID) => {
    axios
      .delete("/cancelOrder", {
        data: {orderId: ORDERID},
      })
      .then((response) => {
        // console.log(response.data);
        setalert({
          Display: true,
          Type: "success",
          Color: "yellowgreen",
          msg: "Order Cancelled Successfully",
        });
        axios
          .get("/getOrderList")
          .then((response) => {
            if (response.data) {
              setactiveOrders(
                response.data.filter(
                  (order) =>
                    order.status[order.status.length - 1] !== "Cancelled" &&
                    order.status[order.status.length - 1] !== "Delivered"
                )
              );
            }
          })
          .catch((error) => {});
        setTimeout(() => {
          setalert({
            Display: false,
            Type: "",
            Color: "",
            msg: "",
          });
        }, 3000);
      })
      .catch((error) => {
        setalert({
          Display: true,
          Type: "error",
          Color: "red",
          msg: "Some Error Occured Try Again!",
        });
        setTimeout(() => {
          setalert({
            Display: false,
            Type: "",
            Color: "",
            msg: "",
          });
        }, 3000);
      });
  };

  return (
    <div className="user-current-orders" id="user-current-orders">
      <div
        className={classes.root}
        style={{display: alert.Display ? "flex" : "none"}}
      >
        <Alert
          variant="outlined"
          severity={alert.Type}
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
            color: alert.Color,
            width: "500px",
          }}
        >
          {alert.msg}
        </Alert>
      </div>
      <table className="active-orders-table">
        <thead>
          <tr>
            <th> Order ID </th>
            <th> Details </th>
            <th> Price </th>
            <th> Tracking </th>
            <th> Cancel </th>
          </tr>
        </thead>
        {
          <>
            {activeOrders && activeOrders.length ? (
              <tbody>
                {activeOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order._id}</td>
                    <td>
                      <ul style={{listStyle: "none"}}>
                        <li>Book : {order.title}</li>
                      </ul>
                    </td>
                    <td>
                      <i className="fas fa-rupee-sign" />
                      {" " + order.orderTotal + " "}/-
                    </td>
                    <td>
                      <Link
                        className="tracking-order-link"
                        to={`/Track/${order._id}`}
                        title="Track Order"
                      >
                        Track&nbsp;You&nbsp;Order
                      </Link>
                    </td>
                    <td>
                      <i
                        className="fas fa-window-close"
                        id={order._id}
                        title="Cancel Order"
                        onClick={(e) => {
                          handelCancelOrder(e.target.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tfoot>
                <tr>
                  <td>No Active Orders</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
              </tfoot>
            )}
          </>
        }
      </table>
    </div>
  );
}
export default CurrentOrders;
