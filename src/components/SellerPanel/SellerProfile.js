import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";

const SellerProfile = (props) => {
  const params = useParams();

  const [sellerName, setSellerName] = useState("");
  const [sellerIntro, setSellerIntro] = useState("");
  const [sellerPhoto, setSellerPhoto] = useState("");
  const [noOfBooksSold, setNoOfBooksSold] = useState(0);
  const [sellerRating, setSellerRating] = useState(0);
  const [noOfRatings, setNoOfRatings] = useState(0);
  const [noOfReviews, setNoOfReviews] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/getSellerProfile?sellerId=${params.sellerId}`;
      axios.get(url).then((response) => {
        const responseData = response.data;
        setSellerName(responseData.name);
        setSellerIntro(responseData.intro);
        setSellerPhoto(responseData.photo);
        setNoOfBooksSold(responseData.noOfBooksSold);
        setSellerRating(responseData.rating);
        setNoOfRatings(responseData.noOfRatings);
        setNoOfReviews(responseData.noOfReviews);
        setIsVerified(responseData.isVerified);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="seller">
      <h2 className="seller-name">{sellerName}</h2>
      <div className="seller-info">
        <div className="seller-info-left">
          <Avatar
            alt="Profile"
            src={sellerPhoto}
            style={{ height: "100px", width: "100px" }}
          />

          <div className="book-seller-rating" id="book-seller-rating">
            <Rating name="read-only" value={sellerRating} readOnly />(
            {sellerRating > 5 ? 5 : sellerRating}
            )
            <br />
            Total Reviews : {noOfRatings}
          </div>
        </div>
        <div className="seller-info-right">
          <div className="seller-intro">
            <p>
              <b>
                <i>{sellerIntro}</i>
              </b>
            </p>
          </div>
          <div>
            <p>
              Sold {noOfBooksSold}
              <span> {`${noOfBooksSold === 1 ? "book" : "books"}`}</span>
            </p>
            <p>
              {`Wrote ${noOfReviews} ${
                noOfReviews === 1 ? "review" : "reviews"
              }`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
