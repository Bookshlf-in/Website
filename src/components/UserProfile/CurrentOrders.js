import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";
function CurrentOrders(props) {
  console.log(props.orders);
  const [activeOrders, setactiveOrders] = useState([]);
  if (props.orders && activeOrders.length === 0) {
    setactiveOrders(
      props.orders.filter(
        (status) =>
          status[status.length - 1] !== "Delivered" ||
          status[status.length - 1] !== "Cancelled"
      )
    );
  }
  return (
    <div className="user-current-orders" id="user-current-orders">
      <table>
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
          <tbody>
            {activeOrders ? (
              <>
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
                      >
                        Track You Order
                      </Link>
                    </td>
                    <td>
                      <i
                        className="fas fa-window-close"
                        id={order._id}
                        title="Remove Address"
                      />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <></>
            )}
          </tbody>
        }
      </table>
    </div>
  );
}
export default CurrentOrders;
