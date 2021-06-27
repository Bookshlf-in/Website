import React from "react";
import {Link} from "react-router-dom";

function AccountDetails(props) {
  // all seller profile details here
  var sellerDetails = {
    sellerName: "John Smith",
    verified: true,
    state: "UttarPradesh",
    description: "Student at IIT KGP",
    rating: 4.5,
    booksold: 11,
  };
  var Verified = {
    user: "verified-user",
    tag: "Verified",
  };
  var nonVerified = {
    user: "non-verified-user",
    tag: "Not Verified",
  };
  var style = {
    display: props.visible,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 30px",
  };
  return (
    <div style={style} id="seller-account-details">
      <div className="card">
        <img
          src="https://image.flaticon.com/icons/png/512/2922/2922510.png"
          alt={sellerDetails.sellerName}
          width="200px"
        />
        <h1>{sellerDetails.sellerName}</h1>
        <div className="verify-tag">
          {/* change className to nonverified.user to make it nonverified */}
          <p
            className={(function () {
              if (sellerDetails.verified) return Verified.user;
              return nonVerified.user;
            })()}
          >
            {(function () {
              if (sellerDetails.verified) return Verified.tag;
              return nonVerified.tag;
            })()}
          </p>
        </div>
        <p className="title"> {sellerDetails.description} </p>
        <p>{sellerDetails.state}&nbsp;India</p>
        <p className="seller-social-links">
          <Link>
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link>
            <i className="fab fa-instagram"></i>
          </Link>
          <Link>
            <i className="fab fa-twitter"></i>
          </Link>
          <Link>
            <i className="fab fa-linkedin"></i>
          </Link>
          <Link>
            <i className="fab fa-youtube"></i>
          </Link>
        </p>
        <p className="seller-rating">
          Rating&nbsp;:&nbsp;
          {[...Array(parseInt(sellerDetails.rating))].map(() => {
            return <i className="fas fa-star"></i>;
          })}
          {[...Array(1)].map(() => {
            if (Number.isInteger(sellerDetails.rating)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })}
          ( {sellerDetails.rating} )
        </p>
        <p className="books-sold">
          Total Books Sold&nbsp;:&nbsp;<b>{sellerDetails.booksold}</b>&nbsp;
        </p>
      </div>
    </div>
  );
}
export default AccountDetails;
