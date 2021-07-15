import React from "react";
import "./Reviews.css";
import {FaStar} from "react-icons/fa";

function Reviews() {
  return (
    <div>
      <div className="reviews">
        <p className="reviewed_by">Reviews from happy readers</p>

        <p className="book_desc">
          This book is concerned with creating typography and is essential for
          professionals who regularly work for clients.
        </p>

        <div className="reviews_wrapper">
          <div className="reviews_item">
            <div className="ratings">
              {[...Array(5)].map((e, i) => {
                return <FaStar size={20} color="#FDCC0D" key={i} />;
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
        </div>
      </div>
    </div>
  );
}
export default Reviews;
