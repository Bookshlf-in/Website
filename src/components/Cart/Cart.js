import React from "react";
import "./Cart.css";
import {Link} from "react-router-dom";

function Cart() {
  return (
    <div className="cart-main">
      <div className="cart-container-left">
        <h1><i class="fas fa-cart-arrow-down"></i>&nbsp;Cart (3 item)</h1>
        {/* Cart item starts */}
        <div className="cart-item">
          <div className="cart-item-img">
            <img
              src="./images/book-of-black-cover-closed.png"
              alt="book"
              height="150px"
              width="150px"
            />
          </div>
          <div className="cart-item-details">
            <h2>Book Name</h2>
            <h3>Edition : 11</h3>
            <h3>Author : lauda sur</h3>
            <h5>Details : lavda ki kitaab hai</h5>
            <h4>
              <i className="fas fa-trash-alt"></i>&nbsp;Remove Item
            </h4>
          </div>
          <div className="cart-item-price">
            <table className="book-quantity">
              <tr>
                <td>
                  <i className="fas fa-minus-square"></i>
                </td>
                <td>1</td>
                <td>
                  <i className="fas fa-plus-square"></i>
                </td>
              </tr>
            </table>
            <h3>
              <i className="fas fa-rupee-sign"></i> 540/-
            </h3>
          </div>
          <p className="alert-cart-item">
            <i className="fas fa-info-circle"></i> Do not delay the purchase, adding
            items to your cart does not mean booking them.
          </p>
        </div>
        {/* Cart Item Ends */}
        {/* Another Cart Item starts */}
        <div className="cart-item">
          <div className="cart-item-img">
            <img
              src="./images/book-of-black-cover-closed.png"
              alt="book"
              height="150px"
              width="150px"
            />
          </div>
          <div className="cart-item-details">
            <h2>Book Name</h2>
            <h3>Edition : 11</h3>
            <h3>Author : lauda sur</h3>
            <h5>Details : lavda ki kitaab hai</h5>
            <h4>
              <i className="fas fa-trash-alt"></i>&nbsp;Remove Item
            </h4>
          </div>
          <div className="cart-item-price">
            <table className="book-quantity">
              <tr>
                <td>
                  <i className="fas fa-minus-square"></i>
                </td>
                <td>1</td>
                <td>
                  <i className="fas fa-plus-square"></i>
                </td>
              </tr>
            </table>
            <h3>
              <i className="fas fa-rupee-sign"></i> 540/-
            </h3>
          </div>
          <p className="alert-cart-item">
            <i className="fas fa-info-circle"></i> Do not delay the purchase, adding
            items to your cart does not mean booking them.
          </p>
        </div>
        {/* Another Cart Item starts */}
        <div className="cart-item">
          <div className="cart-item-img">
            <img
              src="./images/book-of-black-cover-closed.png"
              alt="book"
              height="150px"
              width="150px"
            />
          </div>
          <div className="cart-item-details">
            <h2>Book Name</h2>
            <h3>Edition : 11</h3>
            <h3>Author : lauda sur</h3>
            <h5>Details : lavda ki kitaab hai</h5>
            <h4>
              <i className="fas fa-trash-alt"></i>&nbsp;Remove Item
            </h4>
          </div>
          <div className="cart-item-price">
            <table className="book-quantity">
              <tr>
                <td>
                  <i className="fas fa-minus-square"></i>
                </td>
                <td>1</td>
                <td>
                  <i className="fas fa-plus-square"></i>
                </td>
              </tr>
            </table>
            <h3>
              <i className="fas fa-rupee-sign"></i> 540/-
            </h3>
          </div>
          <p className="alert-cart-item">
            <i className="fas fa-info-circle"></i> Do not delay the purchase, adding
            items to your cart does not mean booking them.
          </p>
        </div>
        {/* Cart Item Ends */}
      </div>
      <div className="cart-container-right">
        <h2>Total Amount Payable</h2>
        <div className="cart-net-amount">
          <h3> Net Amount </h3>
          <h3>
            <i className="fas fa-rupee-sign"></i>&nbsp;1080/-
          </h3>
        </div>
        <div className="cart-net-shipping">
          <h3> Shipping Amount</h3>
          <h3>
            <i className="fas fa-rupee-sign"></i>&nbsp;40/-
          </h3>
        </div>
        <div className="cart-total">
          <p>
            Amount <br />
            <i>(including GST and shipping charges)</i>
          </p>
          <h3>
            <i className="fas fa-rupee-sign"></i>&nbsp;1120/-
          </h3>
        </div>
        <div className="cart-checkout">
        <Link to="/Checkout"><i class="fas fa-money-check-alt"></i>&nbsp;Checkout</Link>
        </div>
      </div>
    </div>
  );
}
export default Cart;
