import {React, useState, useEffect} from "react";
import "./AddReviews.css";
import {useParams} from "react-router-dom";
import {FaStar} from "react-icons/fa";
import axios from "../../axios";

const Reviews = () => {
  const params = useParams();
  const [desc, setdesc] = useState("");
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);
  const [order, setorder] = useState(null);
  const [rate, setrate] = useState("Rating Required");
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getOrderDetails", {
          params: {orderId: params.orderId},
        })
        .then((response) => {
          // console.log(response.data);
          setorder(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    fetchData();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(rating, " ", desc);
    // axios
    //   .post("/addReview", {
    //     orderId: params.orderId,
    //     review: desc,
    //     rating: rating,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //   });
  };

  return (
    <div className="addreviews">
      <div className="review-by">
        <p>
          <i className="fas fa-comment-dots"></i>&nbsp;Add Your Review
        </p>
      </div>
      <div className="addreview">
        <div className="review-header">
          <p>
            <i className="fas fa-info-circle"></i>&nbsp;Reviews are Public and
            Editable. Everyone can see your Account name.
          </p>
        </div>
        <div className="review-main">
          <div className="main-book">
            <img
              src={
                order ? order.photo : "/images/book-of-black-cover-closed.png"
              }
              alt={order ? order.title : "book-name"}
            />
            <p>{order ? order.title : "..."}</p>
            <p>{order ? order.price + "/-" : "..."}</p>
          </div>
          <div className="main-rating">
            <div className="desc">
              <form className="desc-form">
                <label htmlFor="desc" className="desc-label"></label>
                <textarea
                  type="text"
                  value={desc}
                  onChange={(e) => {
                    setdesc(e.target.value);
                  }}
                  className="desc-input"
                  id="desc"
                  placeholder="Tell others what you think about this book. Would you recommened it, and why?"
                />
                <p>
                  <i className="fas fa-lightbulb"></i> Most helpful reviews have
                  100 words or more.
                </p>
              </form>
            </div>
            <div className="rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      id="ratingValue"
                      onClick={() => {
                        setrating(ratingValue);
                        sethover(ratingValue);
                        // console.log(ratingValue);
                        if (ratingValue === 1) {
                          setrate("Hated it");
                        }
                        if (ratingValue === 2) {
                          setrate("Don't like it");
                        }
                        if (ratingValue === 3) {
                          setrate("Just OK");
                        }
                        if (ratingValue === 4) {
                          setrate("Liked it");
                        }
                        if (ratingValue === 5) {
                          setrate("Loved it");
                        }
                      }}
                      onChange={(e) => {
                        setrating(e.target.value);
                      }}
                    />
                    <FaStar
                      className="star"
                      size={55}
                      color={
                        ratingValue <= (hover || rating)
                          ? hover <= 2
                            ? "red"
                            : hover <= 4
                            ? "yellowgreen"
                            : "#66ff00"
                          : "#eee"
                      }
                      style={{padding: "0px", paddingLeft: "25px"}}
                      onMouseEnter={() => sethover(ratingValue)}
                      onMouseLeave={() => sethover(ratingValue)}
                    />
                  </label>
                );
              })}
              <p
                style={{
                  color:
                    rating <= 2
                      ? "red"
                      : rating <= 4
                      ? "yellowgreen"
                      : "#66ff00",
                }}
              >
                {rate}&nbsp;
                {rating <= 2 && rating >= 1 ? (
                  <>&#128545;</>
                ) : rating <= 4 ? (
                  <>&#128522;</>
                ) : (
                  <>&#128525;</>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="btn">
          <form>
            <button
              type="submit"
              className="btn-submit"
              onClick={(e) => {
                submit(e);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
