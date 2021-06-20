import React from "react";
import {Link} from "react-router-dom";

function SellerReviews() {
  return (
    <div className="seller-reviews-container" id="seller-reviews">
      {/* Reviews */}
      <div className="customer-review-container">
        <Link to="/UserProfile">
          <img src="./images/user.svg" alt="user-review" height="50px" />
        </Link>
        <p>Very good product and excellent service.</p>
        <h3>
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star-half-alt" />
        </h3>
      </div>
      {/* another review */}
      <div className="customer-review-container">
        <Link to="/UserProfile">
          <img src="./images/user.svg" alt="user-review" height="50px" />
        </Link>
        <p>Very good product and excellent service.</p>
        <h3>
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star-half-alt" />
        </h3>
      </div>
      {/* another review */}
      <div className="customer-review-container">
        <Link to="/UserProfile">
          <img src="./images/user.svg" alt="user-review" height="50px" />
        </Link>
        <p>Very good product and excellent service.</p>
        <h3>
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star-half-alt" />
        </h3>
      </div>
    </div>
  );
}
export default SellerReviews;
