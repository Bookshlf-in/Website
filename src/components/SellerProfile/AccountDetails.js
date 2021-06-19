import React from "react";
import {Link} from "react-router-dom";
import SellerReview from "./SellerReviews";

function AccountDetails() {
  function handleClick() {
    var show = document.getElementById("seller-reviews").style.display;
    if (show === "none") {
      show = "flex";
    } else {
      show = "none";
    }
    document.getElementById("seller-reviews").style.display = show;
  }
  var verified = {
    user: "verified-user",
    tag: "Verified",
  };
  var nonverified = {
    user: "non-verified-user",
    tag: "Not Verified",
  };
  var style = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "0px 30px",
  };
  return (
    <div style={style} id="seller-account-details">
      <div className="card">
        <img
          src="https://image.flaticon.com/icons/png/512/2922/2922510.png"
          alt="John"
          width="200px"
        />
        <h1>Manish Kumar</h1>
        <div className="verify-tag">
          {/* change className to nonverified.user to make it nonverified */}
          <p className={verified.user}>{verified.tag}</p>
        </div>
        <p className="title"> Student at IIT KGP </p>
        <p>UttarPradesh India</p>
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
        <p className="seller-rating">
          Rating&nbsp;:&nbsp;
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star-half-alt" />
        </p>
        <p className="books-sold">Total Books Sold&nbsp;:&nbsp;11</p>
        <br />
        <p className="seller-reviews" onClick={handleClick}>
          <i class="fas fa-comments" />
          &nbsp;Reviews
        </p>
      </div>
      <SellerReview />
    </div>
  );
}
export default AccountDetails;
