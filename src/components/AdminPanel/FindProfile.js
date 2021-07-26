import {React, useState} from "react";
import axios from "../../axios";
const FindProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [load, setload] = useState(false);
  const [email, setemail] = useState("");

  const getUserProfile = (e) => {
    e.preventDefault();
    setload(true);
    const fetch = async () => {
      axios
        .get("/admin-getUserProfile", {
          params: {email: email},
        })
        .then((response) => {
          console.log(response.data);
          setUserProfile(response.data);
          setSellerProfile(null);
          setload(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setUserProfile("notFound");
          setSellerProfile(null);
          setload(false);
        });
    };
    fetch();
  };

  const getSellerProfile = (e) => {
    e.preventDefault();
    setload(true);
    const fetch = async () => {
      axios
        .get("/admin-getSellerProfile", {
          params: {email: email},
        })
        .then((response) => {
          console.log(response.data);
          setSellerProfile(response.data);
          setUserProfile(null);
          setload(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setSellerProfile("notFound");
          setUserProfile(null);
          setload(false);
        });
    };
    fetch();
  };

  return (
    <div className="findprofile-cont">
      <div className="findprofile-email">
        <form action="">
          <input
            className="findprofile-email-input"
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <button
            type="submit"
            className="findprofile-email-button"
            onClick={(e) => {
              getUserProfile(e);
            }}
          >
            Find User Profile
          </button>
          <span>OR</span>
          <button
            type="submit"
            className="findprofile-email-button"
            onClick={(e) => {
              getSellerProfile(e);
            }}
          >
            Find Seller Profile
          </button>
        </form>
      </div>
      {load ? (
        <i
          className="fas fa-circle-notch"
          style={{
            display: load ? "inline-block" : "none",
            animation: "spin 2s linear infinite",
            fontSize: "64px",
          }}
        />
      ) : (
        <div className="findprofile-profile">
          <div className="findprofile-profile-box">
            {sellerProfile === null ? (
              <>
                {userProfile === "notFound" ? (
                  <h1>Not Found!</h1>
                ) : (
                  <>
                    <h1>{userProfile ? userProfile.name : ""}</h1>
                    <h2>{userProfile ? userProfile.email : ""}</h2>
                    <h2>
                      {userProfile
                        ? userProfile.emailVerified
                          ? "Verified"
                          : "Not Verified"
                        : ""}
                    </h2>
                    <p style={{display: userProfile ? "block" : "none"}}>
                      <b>Roles</b> :{" "}
                      {userProfile
                        ? userProfile.roles.map((role) => <i>{role + " "}</i>)
                        : ""}
                    </p>
                    <h3>{userProfile ? "ID : " + userProfile._id : ""}</h3>
                  </>
                )}
              </>
            ) : userProfile === null ? (
              <>
                {sellerProfile === "notFound" ? (
                  <h1>Not Found!</h1>
                ) : (
                  <>
                    <img
                      src={sellerProfile ? sellerProfile.photo : ""}
                      alt={sellerProfile ? sellerProfile.name : ""}
                      height="100px"
                      width="100px"
                    />
                    <h1>{sellerProfile ? sellerProfile.name : ""}</h1>
                    <h2>{sellerProfile ? sellerProfile.email : ""}</h2>
                    <h2>
                      {sellerProfile
                        ? sellerProfile.isVerified
                          ? "Verified"
                          : "Not Verified"
                        : ""}
                    </h2>
                    <p>{sellerProfile ? sellerProfile.intro : ""}</p>
                    <ul>
                      <li>
                        {sellerProfile ? "Rating " + sellerProfile.rating : ""}
                      </li>
                      <li>
                        {sellerProfile
                          ? "Total Ratings " + sellerProfile.noOfRatings
                          : ""}
                      </li>
                      <li>
                        {sellerProfile
                          ? "Total Reviews " + sellerProfile.noOfReviews
                          : ""}
                      </li>
                    </ul>
                    <h3>
                      {sellerProfile ? "Seller ID : " + sellerProfile._id : ""}
                    </h3>
                    <h3>
                      {sellerProfile ? "User ID : " + sellerProfile.userId : ""}
                    </h3>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindProfile;
