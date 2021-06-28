import React from "react";
function Orders() {
  var orderDetails = {
    id: "#JS213WQERQ12",
    date: "25/06/2021",
    bookname: "Book Name",
    bookisbn: "9087654376132",
    bookedition: "11.2",
    bookdesc:
      "very nice book for Jee mains maths. written by lauda singh of LLT",
    price: 485,
    buyer: "Gadha chand",
  };
  return (
    <div className="orders-bg">
      <div className="orders-filter">
        <form action="">
          <div className="select-wrapper">
            <select className="select">
              <option value="value1">Sold</option>
              <option value="value2">Cancelled</option>
              <option value="value3">Not Sold</option>
            </select>
          </div>
          <input type="submit" value="Go" />
        </form>
      </div>
      <div className="orders-details">
        <table>
          {/* Header of table */}
          <tr>
            <th>Order ID</th>
            <th>Dated</th>
            <th>Details</th>
            <th>Order Price</th>
            <th>Buyer</th>
          </tr>
          {/* particular order details */}
          <tr>
            <td>{orderDetails.id}</td>
            <td>{orderDetails.date}</td>
            <td>
              <ul style={{listStyle: "none"}}>
                <li>
                  <b>{orderDetails.bookname}</b>
                </li>
                <li>
                  ISBN : <b>{orderDetails.bookisbn}</b>
                </li>
                <li>
                  Edition : <b>{orderDetails.bookedition}</b>
                </li>
                <li>{orderDetails.bookdesc}</li>
              </ul>
            </td>
            <td>
              <i className="fas fa-rupee-sign" />
              {orderDetails.price}/-
            </td>
            <td>{orderDetails.buyer}</td>
          </tr>
          {/* details ends here*/}

          {/* particular order details */}
          <tr>
            <td>{orderDetails.id}</td>
            <td>{orderDetails.date}</td>
            <td>
              <ul style={{listStyle: "none"}}>
                <li>
                  <b>{orderDetails.bookname}</b>
                </li>
                <li>
                  ISBN : <b>{orderDetails.bookisbn}</b>
                </li>
                <li>
                  Edition : <b>{orderDetails.bookedition}</b>
                </li>
                <li>{orderDetails.bookdesc}</li>
              </ul>
            </td>
            <td>
              <i className="fas fa-rupee-sign" />
              {orderDetails.price}/-
            </td>
            <td>{orderDetails.buyer}</td>
          </tr>
          {/* details ends here*/}
        </table>
      </div>
    </div>
  );
}
export default Orders;
