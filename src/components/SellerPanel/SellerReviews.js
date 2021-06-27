import React from "react";
import {Link} from "react-router-dom";
import {FaStar} from "react-icons/fa";
function SellerReviews(props) {
  var rating = 4.5;
  return (
    <div style={{display: props.visible}}>
      <div className="your-rating-as-seller">
        <h1>
          Overall Rating :{" "}
          {[...Array(parseInt(rating))].map(() => {
            return <i className="fas fa-star"></i>;
          })}
          {[...Array(1)].map(() => {
            if (Number.isInteger(rating)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })}
          ({rating})
        </h1>
      </div>
      <div className="seller-reviews">
        <p className="reviewed-title">Reviews from Your Customers</p>
        <div className="reviews_wrapper">
          <div className="reviews_item">
            <div className="ratings">
              {[...Array(5)].map((star) => {
                return <FaStar size={20} color="#FDCC0D" />;
              })}
            </div>

            <h3 className="rating_value">Very Effective</h3>
            <p className="rating_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              explicabo aliquam. A maiores, dolorem ad provident pariatur quas
              odio impedit.
            </p>
            <div className="Customerprofile"> lavda sur </div>
          </div>
          <div className="reviews_item">
            <div className="ratings">
              {[...Array(5)].map((star) => {
                return <FaStar size={20} color="#FDCC0D" />;
              })}
            </div>

            <h3 className="rating_value">Very Effective</h3>
            <p className="rating_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              explicabo aliquam. A maiores, dolorem ad provident pariatur quas
              odio impedit.
            </p>
            <div className="Customerprofile"></div>
          </div>
          <div className="reviews_item">
            <div className="ratings">
              {[...Array(5)].map((star) => {
                return <FaStar size={20} color="#FDCC0D" />;
              })}
            </div>

            <h3 className="rating_value">Very Effective</h3>
            <p className="rating_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              explicabo aliquam. A maiores, dolorem ad provident pariatur quas
              odio impedit.
            </p>
            <div className="Customerprofile"></div>
          </div>
          <div className="reviews_item">
            <div className="ratings">
              {[...Array(5)].map((star) => {
                return <FaStar size={20} color="#FDCC0D" />;
              })}
            </div>

            <h3 className="rating_value">Very Effective</h3>
            <p className="rating_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              explicabo aliquam. A maiores, dolorem ad provident pariatur quas
              odio impedit.
            </p>
            <div className="Customerprofile"></div>
          </div>
          <div className="reviews_item">
            <div className="ratings">
              {[...Array(5)].map((star) => {
                return <FaStar size={20} color="#FDCC0D" />;
              })}
            </div>

            <h3 className="rating_value">Very Effective</h3>
            <p className="rating_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              explicabo aliquam. A maiores, dolorem ad provident pariatur quas
              odio impedit.
            </p>
            <div className="Customerprofile"></div>
          </div>
          <div className="reviews_item">
            <div className="ratings">
              {[...Array(5)].map((star) => {
                return <FaStar size={20} color="#FDCC0D" />;
              })}
            </div>

            <h3 className="rating_value">Very Effective</h3>
            <p className="rating_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              explicabo aliquam. A maiores, dolorem ad provident pariatur quas
              odio impedit.
            </p>
            <div className="Customerprofile"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellerReviews;
