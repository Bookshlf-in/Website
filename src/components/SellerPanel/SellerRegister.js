import { React, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import axios from "../../axios";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import { CircularProgress } from "@material-ui/core";

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
  const [PhoneNo, setPhoneNo] = useState("");
  const [AltPhoneNo, setAltPhoneNo] = useState("");

  const handelUpload = (e) => {
    setPhoto(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handelRegister = () => {
    setload(true);
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
          <form action="" className="seller-register-form">
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
                  fontSize: "12px",
                  height: "40px",
                  cursor: "pointer",
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
                  cursor: "pointer",
                }}
              />
            </div>
            <TextField
              id="SellerName"
              label="Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />

            <label htmlFor="phone-no" id="mobile-label">
              Mobile Phone
            </label>
            <InputMask
              id="phone-no"
              mask="9999999999"
              autoComplete="true"
              alwaysShowMask={true}
              onChange={(e) => setPhoneNo(e.target.value)}
            />

            <label htmlFor="alt-phone-no" id="mobile-label">
              Alt Mobile Phone
            </label>
            <InputMask
              id="alt-phone-no"
              mask="9999999999"
              autoComplete="true"
              alwaysShowMask={true}
              onChange={(e) => setAltPhoneNo(e.target.value)}
            />

            <TextField
              id="SellerAbout"
              label="About Yourself"
              multiline
              rows={4}
              onChange={(e) => setIntro(e.target.value)}
              value={Intro}
              style={{
                width: "200px",
                marginBottom: "10px",
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
              <CircularProgress
                style={{
                  display: load ? "inline-block" : "none",
                  height: "15px",
                  width: "15px",
                  color: " white",
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
