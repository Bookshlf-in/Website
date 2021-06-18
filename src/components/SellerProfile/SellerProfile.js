import React from "react";
import "./SellerProfile.css";
import {Link} from "react-router-dom";

function SellerProfile() {
  return (
    <div className="SellerProfile-container">
      <div className="card">
        <img
          src="https://image.flaticon.com/icons/png/512/2922/2922510.png"
          alt="John"
          width="100%"
        />
        <h1>John Doe</h1>
        <div className="verify-tag">
          {/* change className to verified user to make it verified */}
          <p className="verified-user">Verified</p>
        </div>
        <p className="title">CEO & Founder, Example</p>
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
        <p>
          <button>Contact</button>
        </p>
      </div>
    </div>
  );
}
export default SellerProfile;
