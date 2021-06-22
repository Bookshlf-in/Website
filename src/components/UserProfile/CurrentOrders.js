import React from "react";
import {Link} from "react-router-dom";

function CurrentOrders() {
  return (
    <div className="user-current-orders" id="user-current-orders">
      <table>
        <tr>
          <th> Order ID </th>
          <th> Details </th>
          <th> Price </th>
          <th> Tracking </th>
        </tr>
        {/* item order details */}
        <tr>
          <td> #BJSAOSAJS </td>
          <td>
            <ul style={{listStyle: "none"}}>
              <li>Dated : 15 June, 2021</li>
              <li>Address : Bhopal Madhyapradesh 200781</li>
              <li>Book : HC Verma Physcis Vol1 </li>
              <li>ISBN:##########</li>
            </ul>
          </td>
          <td>
            <i className="fas fa-rupee-sign"></i> 540/-
          </td>
          <td>
            <Link className="tracking-order-link" to="/Track">Track You Order</Link>
          </td>
        </tr>
        {/* item order details */}
        <tr>
          <td> #BJSAOSAJS </td>
          <td>
            <ul style={{listStyle: "none"}}>
              <li>Dated : 15 June, 2021</li>
              <li>Address : Bhopal Madhyapradesh 200781</li>
              <li>Book : HC Verma Physcis Vol1 </li>
              <li>ISBN:##########</li>
            </ul>
          </td>
          <td>
            <i className="fas fa-rupee-sign"></i> 540/-
          </td>
          <td>
            <Link className="tracking-order-link" to="/Track">Track You Order</Link>
          </td>
        </tr>
      </table>
    </div>
  );
}
export default CurrentOrders;
