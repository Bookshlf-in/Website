import { React, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import axios from "../../axios";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "20px",
  },
}));

export default function SellerRegister() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  // states
  const [Name, setName] = useState("");
  const [Intro, setIntro] = useState("");
  const [Photo, setPhoto] = useState(null);
  const [load, setload] = useState(false);
  const [err, seterr] = useState(false);
  const [msg, setmsg] = useState("");
  const [alert, setalert] = useState(false);
  const [Image, setImage] = useState("/images/user.png");

  const handelUpload = (e) => {
    setPhoto(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handelRegister = () => {
    setload(true);
    const imageName = nanoid(10) + Photo.name;

    // uploading profile photo to firebase server with unique name
    const uploadTask = storage.ref(`profile/${imageName}`).put(Photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // console.log(error);
      },
      () => {
        storage
          .ref("profile")
          .child(imageName)
          .getDownloadURL()
          .then((imgUrl) => {
            axios
              .post("/sellerRegister", {
                name: Name,
                intro: Intro,
                photo: imgUrl,
              })
              .then((response) => {
                setload(false);
                seterr(false);
                setmsg("Successfully registered as Seller!");
                setalert(true);
                user.roles.push("seller");
                localStorage.setItem(
                  "bookshlf_user",
                  JSON.stringify({
                    authHeader: user.authHeader,
                    roles: user.roles,
                    email: user.email,
                    wishlist: user.wishlist,
                    cartitems: user.cartitems,
                  })
                );
                setUser({
                  authHeader: user.authHeader,
                  roles: user.roles,
                  email: user.email,
                  wishlist: user.wishlist,
                  cartitems: user.cartitems,
                });
                setTimeout(() => {
                  history.push("/SellerPanel/1");
                }, 2000);
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(user);
                  setload(false);
                  seterr(true);
                  setmsg(`Registration Failed! ${error.response.data.error}`);
                  setalert(true);
                }
              });
          });
      }
    );
  };
  return (
    <div>
      {user ? (
        <div className={classes.root}>
          <Alert
            variant="outlined"
            severity="error"
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "12px",
              color: "red",
              width: "250px",
            }}
          >
            Oops you are not registered. Please Register As Seller.
          </Alert>
          <div className="seller-register-btn">Register Now as Seller</div>
          <form action="" className="seller-register-form">
            <div>
              <div className="uploaded-images">
                <Avatar
                  alt="Profile"
                  src={Image}
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <div className="upload-btn-wrapper">
                <button
                  style={{
                    width: "200px",
                    marginLeft: "0px",
                    fontSize: "16px",
                    height: "40px",
                  }}
                >
                  Upload Image
                </button>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
                  onChange={(e) => {
                    handelUpload(e);
                  }}
                  style={{
                    width: "200px",
                    height: "40px",
                  }}
                />
              </div>
            </div>
            <input
              type="text"
              id="contactName"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              style={{
                width: "200px",
                marginTop: "10px",
              }}
            />
            <textarea
              id="contactReview"
              placeholder="About Yourself"
              onChange={(e) => setIntro(e.target.value)}
              value={Intro}
              style={{
                width: "200px",
                marginTop: "0px",
              }}
            />
            <button
              style={{
                fontFamily: "PT Sans",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
              onClick={(e) => {
                e.preventDefault();
                if (user !== null && user !== undefined) {
                  handelRegister();
                } else {
                  setload(false);
                  seterr(true);
                  setmsg(`Registration Failed! Please Login!`);
                  setalert(true);
                }
              }}
            >
              Register&nbsp;
              <i
                className="fas fa-circle-notch"
                style={{
                  display: load ? "inline-block" : "none",
                  animation: "spin 2s linear infinite",
                }}
              />
            </button>
            <Alert
              variant="outlined"
              severity={err ? "error" : "success"}
              style={{
                fontFamily: "PT Sans",
                fontWeight: "bold",
                color: err ? "red" : "green",
                width: "250px",
                marginTop: "10px",
                display: alert ? "" : "none",
              }}
            >
              {msg}
            </Alert>
          </form>
        </div>
      ) : (
        <div className={classes.root}>
          <Alert
            variant="outlined"
            severity="error"
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "16px",
              color: "red",
              width: "250px",
            }}
          >
            Please Login <i className="far fa-frown" />
          </Alert>
        </div>
      )}
    </div>
  );
}
