import React from "react";
import "./BookDetails.css";
import {Link} from "react-router-dom";
import Booksnaps from "./Booksnaps";
import Bookfullsnap from "./Bookfullsnap";

function BookDetails() {
  return (
    <div className="book-details-bg">
      <div className="book-main-container">
        <Booksnaps />
        <Bookfullsnap />
        <div className="book-description">
          <div className="book-fullname"></div>
          <div className="book-subheading">
            <span className="book-isbn"></span>
            <span className="book-edition"></span>
          </div>
          <div className="about-book">
            <span className="book-rating"></span>
            <span className="book-cutomer-reviews"></span>
          </div>
          <div className="book-selling">
            <div className="book-mrp">MRP : </div>
            <div className="book-selling-price"></div>
            <div className="book-savings"></div>
          </div>
          <div className="book-other-details"></div>
          <div className="book-tags">
            <div className="book-tag"></div>
          </div>
          <div className="book-seller"></div>
        </div>
      </div>
      <div className="book-purchase-container">
        <div className="wish-list"></div>
        <div className="add-to-cart"></div>
        <div className="buy-now-button"></div>
        <div className="recommened-tags">
          <div className="book-tag"></div>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
