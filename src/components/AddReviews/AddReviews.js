import React, { useState } from "react";
import "./AddReviews.css";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Star } from "@material-ui/icons";
function Reviews(props) {
  const [desc, setdesc] = useState("");
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);
  let rate = "Rating Required";
  if (rating === 1) {
    rate = "Hated it";
  }
  if (rating === 2) {
    rate = "Don't like it";
  }
  if (rating === 3) {
    rate = "Just OK";
  }
  if (rating === 4) {
    rate = "Liked it";
  }
  if (rating === 5) {
    rate = "Loved it";
  }

  const submit=(e)=>{
      e.preventDefault();
      if(!rating||!desc){
          alert("Rating and description can not be blanked");
      }
      props.addrating(rating,desc);
      setrating("");
      setdesc("");
  }

  return (
    <div className="addreviews">
        <div className="review-by">
              <p>Review by Rahul yadav</p>
          </div>
      <div className="addreview">
          
        <div className="review-header">
            
          <p>
            Reviews are public and editable. Everyone can see your Google
            Account name and photo. Developers can also see your country and
            device information (such as language, model and OS version) and may
            use this information to respond to you.
          </p>
        </div>
        <div className="review-main">
          <div className="main-book">
            <img src="/images/book1.jpg" alt="" />
            <p>Easy Learning English Vocabulary</p>
          </div>
          <div className="main-rating">
            <div className="desc">
              <form className="desc-form">
                <label htmlFor="desc" className="desc-label"></label>
                <input
                  type="text"
                    value={desc}
                    onChange={(e) => {
                      setdesc(e.target.value);
                    }}
                  className="desc-input"
                  id="desc"
                  placeholder="Tell others what you think about this book."
                />
                <p>Most helpful reviews have 100 words or more.</p>
              </form>
            </div>
            <div className="rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      id="ratingValue"
                      onClick={() => setrating(ratingValue)}
                      onChange={(e)=>{setrating(e.target.value)}}
                    />
                    <FaStar
                      className="star"
                      size={55}
                      color={
                        ratingValue <= (hover || rating)
                          ? "#3498db"
                          : "#e4e5e9"
                      }
                      onMouseEnter={() => sethover(ratingValue)}
                      onMouseLeave={() => sethover(null)}
                    />
                  </label>
                );
              })}
              <p>{rate}</p>
            </div>
          </div>
        </div>
        <div className="btn">
          <form onSubmit={submit}>
            <button type="submit" className="btn-submit">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Reviews;
