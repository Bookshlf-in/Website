import { React, useState } from "react";
import axios from "../../axios";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
const Verified = {
  user: "verified-user",
  tag: "Verified",
};
const nonVerified = {
  user: "non-verified-user",
  tag: "Not Verified",
};

const AccountDetails = (props) => {
  // all seller profile details here
  const [load, setload] = useState(0);
  const [Photo, setPhoto] = useState(null);
  const [Name, setName] = useState("");
  const [About, setAbout] = useState("");
  const [text, settext] = useState("Update");

  const [Image, setImage] = useState("/images/user.png");
  const [open, setopen] = useState(false);
  const [sellerDetails, setsellerDetails] = useState({
    Name: props.seller.name,
    Intro: props.seller.intro,
    Photo: props.seller.photo,
    NoOfBooksSold: props.seller.noOfBooksSold,
    Rating: props.seller.rating,
    NoOfRatings: props.seller.noOfRatings,
    NoOfReviews: props.seller.noOfReviews,
    IsVerified: props.seller.isVerified,
    ID: props.seller._id,
    CreatedAt: props.seller.createdAt,
    UpdatedAt: props.seller.updatedAt,
  });

  const handelUpload = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <div className="seller-profile-cont">
        <div className="seller-profile-details">
          <span>
            <i className="fas fa-user"></i>
            {sellerDetails.Name}
          </span>
          <span>
            <i className="fas fa-info-circle"></i>
            {sellerDetails.Intro}
          </span>
          <span className="seller-rating">
            <i class="fas fa-star"></i>
            {[...Array(parseInt(sellerDetails.Rating))].map(() => {
              return <i className="fas fa-star"></i>;
            })}
            {[...Array(1)].map(() => {
              if (Number.isInteger(sellerDetails.Rating)) {
                return <></>;
              }
              return <i className="fas fa-star-half-alt"></i>;
            })}
            ( {sellerDetails.Rating} )
          </span>
          <span className="books-sold">
            Books - Sold<b>{sellerDetails.NoOfBooksSold}</b>
          </span>
        </div>
        <div className="seller-profile-img ">
          <Avatar
            alt={sellerDetails.Name}
            src={
              sellerDetails.Photo && sellerDetails.Photo.search(".") !== -1
                ? sellerDetails.Photo
                : "images/user.ico"
            }
            style={{ height: "150px", width: "150px" }}
          />
        </div>

        <div className="verify-tag">
          <p
            className={
              sellerDetails.IsVerified ? Verified.user : nonVerified.user
            }
          >
            {sellerDetails.IsVerified ? Verified.tag : nonVerified.tag}
          </p>
        </div>
      </div>
      <div className="update-seller-profile">
        <button
          className="update"
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
            letterSpacing: "2px",
            width: "324px",
            borderTop: "2px solid white",
            borderLeft: "2px solid white",
            borderRight: "2px solid white",
            cursor: "pointer",
          }}
          onClick={() => setopen(!open)}
        >
          Update Profile&nbsp;&nbsp;
          <i className={open ? "fas fa-chevron-up" : "fas fa-chevron-down"} />
        </button>
        <Collapse in={open}>
          <form
            action=""
            style={{
              display: "flex",
              height: "auto",
              width: "324px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderBottom: "2px solid white",
              borderLeft: "2px solid white",
              borderRight: "2px solid white",
              transition: "2s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                flexDirection: "column",
              }}
            >
              <div className="uploaded-images">
                <img
                  src={Image}
                  alt="profile"
                  style={{
                    border: "none",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="upload-btn-wrapper">
                <button>Upload Image</button>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
                  onChange={(e) => {
                    handelUpload(e);
                  }}
                />
              </div>
            </div>
            <div className="signup-name">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={Name}
              />
            </div>
            <div className="signup-name">
              <input
                type="text"
                placeholder="About"
                onChange={(e) => setAbout(e.target.value)}
                value={About}
              />
            </div>
            <button
              style={{
                fontFamily: "PT Sans",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
              onClick={(e) => {
                e.preventDefault();
                if (Name.length > 0 && About.length > 0) {
                  settext("Updating...");
                  const imageName = nanoid(10) + Photo.name;

                  // uploading profile photo to firebase server with unique name
                  const uploadTask = storage
                    .ref(`profile/${imageName}`)
                    .put(Photo);
                  uploadTask.on(
                    "state_changed",
                    (snapshot) => {},
                    (error) => {
                      console.log(error);
                    },
                    () => {
                      storage
                        .ref("profile")
                        .child(imageName)
                        .getDownloadURL()
                        .then((imgUrl) => {
                          // console.log("imgURL: " + imgUrl);
                          axios
                            .post("/updateSellerProfile", {
                              name: Name,
                              intro: About,
                              photo: imgUrl,
                            })
                            .then((response) => {
                              settext("Successfully Updated!");
                              setTimeout(() => {
                                settext("Update");
                                setName("");
                                setAbout("");
                                setload(!load);
                                setopen(!open);
                              }, 3000);
                            })
                            .catch((error) => {
                              console.log(error.message.data);
                            });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  );
                } else {
                  settext("Name/About cannot be empty!");
                  setTimeout(() => {
                    settext("Update");
                  }, 3000);
                }
              }}
            >
              {text}
            </button>
          </form>
        </Collapse>
      </div>
    </div>
  );
};
export default AccountDetails;
