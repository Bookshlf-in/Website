import { React, useState, useEffect, useContext } from "react";
import "./Reviews.css";
import { FaStar } from "react-icons/fa";
import axios from "../../axios";
import { UserContext } from "../../Context/userContext";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";

const Reviews = () => {
  const [user, setUser] = useContext(UserContext);
  const [Reviews, setReviews] = useState(null);

  const [desc, setdesc] = useState("");
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);
  const [rate, setrate] = useState("Rating Required");
  const [showreview, setshowreview] = useState(false);
  const [load, setload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getTopWebsiteReviews")
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          // console.log(error.response);
        });
      axios
        .get("/getWebsiteReview")
        .then((response) => {
          setdesc(response.data.review);
          setrating(response.data.rating);
          sethover(response.data.rating);
          if (response.data.rating === 1) {
            setrate("Hated it");
          }
          if (response.data.rating === 2) {
            setrate("Don't like it");
          }
          if (response.data.rating === 3) {
            setrate("Just OK");
          }
          if (response.data.rating === 4) {
            setrate("Liked it");
          }
          if (response.data.rating === 5) {
            setrate("Loved it");
          }
        })
        .catch((error) => {
          console.log(error?.response?.data);
        });
    };
    fetchData();
  }, []);

  const handelAddReview = () => {
    setload(true);
    axios
      .post("/updateWebsiteReview", {
        rating: rating,
        review: desc,
      })
      .then((response) => {})
      .catch((error) => {});
  };
  return (
    <div>
      <div className="reviews">
        <p className="reviewed_by">What readers say about us?</p>

        <p className="book_desc">
          This book is concerned with creating typography and is essential for
          professionals who regularly work for clients.
        </p>
        <Grid container>
          <Grid item xs={12}>
            <div className="reviews_wrapper">
              {Reviews && Reviews.length > 0 ? (
                <>
                  {Reviews.map((TopReview, i) => (
                    <div className="reviews_item" key={i}>
                      <p className="rating_desc">{TopReview.review}</p>

                      <h3 className="rating_value">
                        - {TopReview.userName}
                        {TopReview.rating <= 2 && TopReview.rating >= 1 ? (
                          <>&#128545;</>
                        ) : TopReview.rating <= 4 ? (
                          <>&#128522;</>
                        ) : (
                          <>&#128525;</>
                        )}
                      </h3>

                      <div className="ratings">
                        {[...Array(TopReview.rating)].map((e, i) => {
                          return <FaStar size={20} color="#FDCC0D" key={i} />;
                        })}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              className="Add-Rvw-btn"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (user) {
                    setshowreview(!showreview);
                  } else {
                    e.target.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Please Login <i class="fas fa-exclamation"></i>`;
                    setTimeout(() => {
                      e.target.innerHTML = "Add Your Reviews";
                    }, 3000);
                  }
                }}
              >
                Add Your Reviews&nbsp;
                <i
                  className={
                    showreview ? "fas fa-chevron-up" : "fas fa-chevron-down"
                  }
                />
              </button>
            </div>
            <Collapse
              in={showreview}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="addreview"
                style={{
                  maxWidth: "600px",
                  border: "1px solid #fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="main-rating">
                  <div className="desc">
                    <div className="rating">
                      <div className="stars">
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
                                color={
                                  ratingValue <= (hover || rating)
                                    ? hover <= 2
                                      ? "red"
                                      : hover <= 4
                                      ? "yellowgreen"
                                      : "#66ff00"
                                    : "#ffffff"
                                }
                                onMouseEnter={() => sethover(ratingValue)}
                                onMouseLeave={() => sethover(ratingValue)}
                              />
                            </label>
                          );
                        })}
                      </div>
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
                    <form className="desc-form">
                      <textarea
                        type="text"
                        value={desc}
                        onChange={(e) => {
                          setdesc(e.target.value);
                        }}
                        className="desc-input"
                        id="desc"
                        placeholder="Your Reviews on Website..."
                      />
                      <p>
                        <i className="fas fa-lightbulb"></i> Most helpful
                        reviews have 100 words or more.
                      </p>
                    </form>
                  </div>
                </div>

                <div className="btn">
                  <i
                    className="fas fa-circle-notch"
                    style={{
                      display: load ? "inline-block" : "none",
                      animation: "spin 2s linear infinite",
                    }}
                  />
                  &nbsp;
                  <button
                    type="submit"
                    className="btn-submit"
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handelAddReview();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Collapse>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Reviews;
