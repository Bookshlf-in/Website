import React from "react";
import "./BookDetails.css";
import {Link} from "react-router-dom";
import Booksnaps from "./Booksnaps";
import Bookfullsnap from "./Bookfullsnap";
import BookDesc from "./BookDesc";

function BookDetails() {
  return (
    <div className="book-details-bg">
      <div className="book-main-container">
        <Booksnaps />
        <Bookfullsnap />
        <BookDesc />
      </div>
      <div className="book-purchase-container">
        <div className="wish-list">
          <i class="far fa-heart"></i>
          <input type="button" value="Add to Wish List" />
        </div>
        <div className="add-to-cart">
          <i class="fas fa-cart-arrow-down" />
          <input type="button" value="Add to Cart" />
        </div>
        <div className="buy-now-button">
          <i class="fas fa-shopping-basket" />
          <input type="button" value="Buy Now" />
        </div>
        <div className="recommened-tags">
          <h3>Recommended Tags</h3>
          <div className="book-tag"> JEE Mains</div>
          <div className="book-tag"> Maths</div>
          <div className="book-tag"> Best Seller</div>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
