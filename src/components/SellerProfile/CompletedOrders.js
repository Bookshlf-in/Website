import React from "react";
import {Link} from "react-router-dom";

function CompletedOrders() {
  return (
    <div className="seller-complete-orders" id="seller-complete-orders">
      <table>
        <tr>
          <th> Order ID </th>
          <th> Dated </th>
          <th> Details </th>
          <th> Price </th>
          <th> Payment Method</th>
        </tr>
        {/* item order details */}
        <tr>
          <td> #BJSAOSAJS </td>
          <td>Dated : 15 June, 2021</td>
          <td>
            <ul style={{listStyle: "none"}}>
              <li>Address : Bhopal Madhyapradesh 200781</li>
              <li>Book : HC Verma Physcis Vol1 </li>
              <li>ISBN:##########</li>
            </ul>
          </td>
          <td>
            <i className="fas fa-rupee-sign"></i> 540/-
          </td>
          <td>Cash</td>
        </tr>
        {/* item order details */}
        <tr>
          <td> #BJSAOSAJS </td>
          <td>Dated : 15 June, 2021</td>
          <td>
            <ul style={{listStyle: "none"}}>
              <li>Address : Bhopal Madhyapradesh 200781</li>
              <li>Book : HC Verma Physcis Vol1 </li>
              <li>ISBN:##########</li>
            </ul>
          </td>
          <td>
            <i className="fas fa-rupee-sign"></i> 540/-
          </td>
          <td>Cash</td>
        </tr>
      </table>
    </div>
  );
}
export default CompletedOrders;
