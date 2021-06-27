import React from "react";
import {Link} from "react-router-dom";

function PendingOrders() {
  
  return (
    <div className="seller-complete-orders" id="seller-pending-orders">
       <table>
        <tr>
          <th> Order ID </th>
          <th> Details </th>
          <th> Price </th>
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
        </tr>
      </table>
    </div>
  );
}
export default PendingOrders;
