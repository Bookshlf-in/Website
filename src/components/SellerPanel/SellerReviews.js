import { React } from "react";
import { FaStar } from "react-icons/fa";
const SellerReviews = (props) => {
  return (
    <div>
      <div className="your-rating-as-seller">
        <h1>
          <br />
          Overall Rating :{" "}
          {props.reviews.rating > 0 ? (
            [...Array(parseInt(props.reviews.rating))].map((e, i) => {
              return <i className="fas fa-star" key={i}></i>;
            })
          ) : (
            <></>
          )}
          {[...Array(1)].map(() => {
            if (Number.isInteger(props.reviews.rating)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })}
          ({props.reviews.rating})
        </h1>
        <h3>Total Ratings : {props.reviews.noOfRatings}</h3>
        <h3>Total Reviews : {props.reviews.noOfReviews}</h3>
      </div>
      <div className="seller-reviews">
        <p className="reviewed-title">Reviews from Your Customers</p>
        <div className="reviews_wrapper">
          {props.reviews.data ? (
            <>
              {props.reviews.data.length > 0 ? (
                <>
                  {props.reviews.data.map((review, i) => (
                    <div className="reviews_item" key={i}>
                      <div className="ratings">
                        {[...Array(parseInt(review.rating))].map(() => {
                          return <FaStar size={20} color="#FDCC0D" />;
                        })}
                      </div>

                      <h3 className="rating_value">{review.rating}</h3>
                      <p className="rating_desc">{review.review}</p>
                      <div className="Customerprofile"> lavda sur </div>
                    </div>
                  ))}
                </>
              ) : (
                <h3>No Reviews.</h3>
              )}
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};
export default SellerReviews;
