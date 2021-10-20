import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import "./SellerProfile.css";
import { Helmet } from "react-helmet";

const Verified = {
  user: "verified-user",
  tag: "Verified",
};
const nonVerified = {
  user: "non-verified-user",
  tag: "Not Verified",
};

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
    <>
      <Helmet>
        <title>{sellerName} | Bookshlf</title>
        <meta name="description" content={sellerIntro} />
      </Helmet>

      <div className="sellerContainer">
        <div className="verify-tag">
          <p className={isVerified ? Verified.user : nonVerified.user}>
            <b>{isVerified ? Verified.tag : nonVerified.tag}</b>
          </p>
        </div>

        <div className="seller">
          <span>
            <i className="fas fa-user"></i>
            {sellerName}
          </span>

          <span>
            <i className="fas fa-info-circle" />
            {sellerIntro}
          </span>
          <span className="rating-span">
            <Rating name="read-only" value={sellerRating} readOnly />(
            {sellerRating > 5 ? 5 : sellerRating})
          </span>
          <span>
            <span className="books-sold">
              {`${noOfBooksSold === 1 ? "Book" : "Books"}`}
              Sold -
            </span>
            <span style={{ color: "rgb(44, 185, 25)", fontWeight: "600" }}>
              {noOfBooksSold}
            </span>
          </span>
        </div>
        <div className="avatar-style">
          <Avatar
            alt="Profile"
            src={sellerPhoto}
            style={{ height: "150px", width: "150px" }}
          />
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
