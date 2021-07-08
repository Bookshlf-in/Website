import {RepeatOneSharp} from "@material-ui/icons";
import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "../../axios";

const Verified = {
  user: "verified-user",
  tag: "Verified",
};
const nonVerified = {
  user: "non-verified-user",
  tag: "Not Verified",
};
const style = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 30px",
};

function AccountDetails() {
  // all seller profile details here
  const [sellerDetails, setsellerDetails] = useState({
    Name: "",
    Intro: "",
    Photo: "https://image.flaticon.com/icons/png/512/2922/2922510.png",
    NoOfBooksSold: 0,
    Rating: 0,
    NoOfRatings: 0,
    NoOfReviews: 0,
    IsVerified: false,
    ID: "",
    CreatedAt: "",
    UpdatedAt: "",
  });

  const [load, setload] = useState(false);

  useEffect(() => {
    axios
      .get("/getSellerProfile")
      .then((response) => {
        setsellerDetails({
          Name: response.data.name,
          Intro: response.data.intro,
          Photo: response.data.photo,
          NoOfBooksSold: response.data.noOfBooksSold,
          Rating: response.data.rating,
          NoOfRatings: response.data.noOfRatings,
          NoOfReviews: response.data.noOfReviews,
          IsVerified: response.data.isVerified,
          ID: response.data._id,
          CreatedAt: response.data.createdAt,
          UpdatedAt: response.data.updatedAt,
        });
        setload(true);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }, [load]);
  return (
    <div style={style} id="seller-account-details">
      <div className="card">
        <img src={sellerDetails.Photo} alt={sellerDetails.Name} width="200px" />
        <h1>{sellerDetails.Name}</h1>
        <div className="verify-tag">
          <p
            className={
              sellerDetails.IsVerified ? Verified.user : nonVerified.user
            }
          >
            {sellerDetails.IsVerified ? Verified.tag : nonVerified.tag}
          </p>
        </div>
        <p className="title"> {sellerDetails.Intro} </p>
        <p className="seller-rating">
          Rating&nbsp;:&nbsp;
          {[...Array(parseInt(sellerDetails.Rating))].map(() => {
            return <i className="fas fa-star"></i>;
          })}
          {[...Array(1)].map(() => {
            if (Number.isInteger(sellerDetails.Rating)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })}
          ( {sellerDetails.Rating} )
        </p>
        <p className="books-sold">
          Total Books Sold&nbsp;:&nbsp;<b>{sellerDetails.NoOfBooksSold}</b>
          &nbsp;
        </p>
      </div>
    </div>
  );
}
export default AccountDetails;
