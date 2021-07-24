import {React, useState} from "react";
import {Link} from "react-router-dom";

const PreviousOrders = (props) => {
  const [pastOrders, setpastOrders] = useState(props.orders);
  // console.log(pastOrders);
  return (
    <div className="user-previous-orders" id="user-previous-orders">
      <table>
        <thead>
          <tr>
            <th> Order ID </th>
            <th> Seller </th>
            <th> Book Details </th>
            <th> Order Total </th>
            <th> Status</th>
            <th> Reviews</th>
          </tr>
        </thead>
        {pastOrders && pastOrders.length > 0 ? (
          <tbody>
            {pastOrders.map((order, idx) => (
              <tr key={idx}>
                <td> {order._id} </td>
                <td>{order.sellerName}</td>
                <td>
                  <ul style={{listStyle: "none"}}>
                    <li>
                      <b>Book</b> : {order.title}
                    </li>
                    <li>
                      <b>QTY</b> : {order.purchaseQty}
                    </li>
                    <li>
                      <b>Author</b> : {order.author}
                    </li>
                    <li>
                      <b>Price</b> : <i className="fas fa-rupee-sign" />
                      {" " + order.price + " /-"}
                    </li>
                  </ul>
                </td>
                <td>
                  <i className="fas fa-rupee-sign" />
                  {" " + order.orderTotal + " /-"}
                </td>
                <td
                  style={{
                    backgroundColor:
                      order.status[order.status.length - 1] === "Delivered"
                        ? "yellowgreen"
                        : order.status[order.status.length - 1] === "Cancelled"
                        ? "red"
                        : "rgb(255, 176, 48)",
                    color: "white",
                  }}
                >
                  {order.status[order.status.length - 1] === "Delivered" ? (
                    <>
                      <i className="fas fa-check-circle" />
                      {order.status[order.status.length - 1]}
                    </>
                  ) : order.status[order.status.length - 1] === "Cancelled" ? (
                    <>
                      <i className="fas fa-times-circle" />
                      {order.status[order.status.length - 1]}
                    </>
                  ) : (
                    order.status[order.status.length - 1]
                  )}
                </td>
                <td>
                  {order.status[order.status.length - 1] === "Delivered" ? (
                    <Link
                      className="tracking-order-link"
                      to={`/AddReview/${order._id}`}
                    >
                      Review&nbsp;this&nbsp;Order
                    </Link>
                  ) : (
                    "---"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td>No Orders...</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};
export default PreviousOrders;
