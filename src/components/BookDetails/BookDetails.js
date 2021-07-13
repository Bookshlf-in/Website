import {React, useState, useEffect} from "react";
import "./BookDetails.css";
import {Link, useParams} from "react-router-dom";
import Booksnaps from "./Booksnaps";
import Bookfullsnap from "./Bookfullsnap";
import BookDesc from "./BookDesc";

const BookDetails = () => {
  const params = useParams();
  const bookId = params.bookId;
  console.log(bookId);
  return (
    <div className="book-details-bg">
      <div className="book-main-container">
        <Booksnaps />
        <Bookfullsnap />
        <BookDesc />
      </div>
      <div className="book-purchase-container">
        <div className="wish-list">
          <span>
            <i className="far fa-heart"></i>
          </span>
          <input type="submit" value="Add to Wish List" />
        </div>
        <div className="add-to-cart">
          <span>
            <i className="fas fa-cart-arrow-down" />
          </span>
          <input type="submit" value="Add to Cart" />
        </div>
        <div className="buy-now-button">
          <span>
            <i className="fas fa-shopping-basket" />
          </span>
          <input type="submit" value="Buy Now" />
        </div>
        <div className="recommened-tags">
          <h3>Recommended Tags</h3>
          <Link to="" className="tag">
            Physcis
          </Link>
          <Link to="" className="tag">
            JEE Advanced
          </Link>
          <Link to="" className="tag">
            Best Seller
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BookDetails;
