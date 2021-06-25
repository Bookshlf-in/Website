import React from "react";
import {Link} from "react-router-dom";
function BookDesc() {
  return (
    <div className="book-description">
      <div className="book-fullname">
        <h1>Book Full Name</h1>
      </div>
      <div className="book-subheading">
        <span className="book-isbn">
          <i class="fas fa-atlas" />
          &nbsp;ISBN&nbsp;:&nbsp;<b>978-3-16-148410-0</b>
        </span>
        <span className="book-edition">
          <i class="fas fa-i-cursor" />
          &nbsp;<b>11.3</b>&nbsp;Reprint
        </span>
      </div>
      <div className="about-book">
        <span className="book-rating">
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star-half-alt" />
        </span>
        <span className="book-cutomer-reviews">Customer Reviews</span>
      </div>
      <div className="book-selling">
        <div className="book-mrp">
          MRP :{" "}
          <b>
            <i className="fas fa-rupee-sign" /> 450/-
          </b>
        </div>
        <div className="book-selling-price">
          Original price :{" "}
          <b>
            <i className="fas fa-rupee-sign" /> 900/-
          </b>
        </div>
        <div className="book-savings">Total Discount : 50%</div>
      </div>
      <div className="book-other-details">
        <h2> Book Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, explicabo
          aliquam. A maiores, dolorem ad provident pariatur quas odio impedit.
        </p>
      </div>
      <div className="book-tags">
        <div className="book-tag"> JEE Mains</div>
        <div className="book-tag"> Maths</div>
        <div className="book-tag"> Best Seller</div>
      </div>
      <div className="book-seller">
        <div className="book-seller-name">
          <Link to="/SellerProfile">AKD Verma</Link>
        </div>
        <div className="book-seller-rating">
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star" />
          <i class="fas fa-star-half-alt" />
        </div>
      </div>
    </div>
  );
}
export default BookDesc;
