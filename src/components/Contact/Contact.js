import {React, useState} from "react";
import "./Contact.css";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

// alert Styles
const alertStyle = {
  color: {
    success: "#4caf50",
    error: "#f44336",
  },
};

// Alert Messages
const alertMessage = {
  success: "We have recieved your request. Kindly wait for 2-3 working days.",
  error: {
    default: "Please fill all fields!",
    mail: "Your Email Address is Incorrect!",
    sub: "Subject is too short (should have atleast 10 letters)",
    msg: "Message is too short (should have atleast 30 letters)",
  },
};

function Contact() {
  const classes = useStyles();
  // form states
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  // alert states
  const [Alerttype, setAlerttype] = useState("success");
  const [showAlert, setshowAlert] = useState("none");
  const [loader, setloader] = useState("none");
  const [alertColor, setalertColor] = useState(alertStyle.color.success);
  const [alertText, setalertText] = useState(alertMessage.success);

  // Handeling the submit button
  const handelSubmit = () => {
    setAlerttype("error");
    if (
      (Name !== null) &
      (Email !== null) &
      (Subject !== null) &
      (Message !== null)
    ) {
      if (Email.includes("@") & Email.includes(".") ? true : false) {
        if (Subject.length > 10 ? true : false) {
          if (Message.length > 30 ? true : false) {
            setloader("block");
            axios
              .post("/sendMessage", {
                name: Name,
                email: Email,
                subject: Subject,
                message: Message,
              })
              .then(function (response) {
                setalertColor(alertStyle.color.success);
                setalertText(alertMessage.success);
                setAlerttype("success");
                setshowAlert("block");
                setloader("none");
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
              })
              .catch(function (error) {
                //   Bad Request or Already subscribed
                if (error.response) {
                  setalertColor(alertStyle.color.error);
                  setalertText(alertMessage.error.mail);
                  setshowAlert("block");
                }
                setloader("none");
              });
          } else {
            setalertColor(alertStyle.color.error);
            setalertText(alertMessage.error.msg);
            setshowAlert("block");
          }
        } else {
          setalertColor(alertStyle.color.error);
          setalertText(alertMessage.error.sub);
          setshowAlert("block");
        }
      } else {
        setalertColor(alertStyle.color.error);
        setalertText(alertMessage.error.mail);
        setshowAlert("block");
      }
    } else {
      setalertColor(alertStyle.color.error);
      setalertText(alertMessage.error.default);
      setshowAlert("block");
    }
    setTimeout(() => {
      setshowAlert("none");
    }, 10000);
  };

  // default export component
  return (
    <div className="contact-main">
      <h1> Contact Us</h1>
      <div className="contact-map">
        <iframe
          title="google-map"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.227819806201!2d81.02184131441342!3d26.800873671349063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be37eb0826741%3A0x34d9dd79cdeac7d8!2sIIIT%20Lucknow%20(Indian%20Institute%20of%20Information%20Technology)!5e0!3m2!1sen!2sin!4v1623751175733!5m2!1sen!2sin`}
        />
      </div>
      <div className="contact-form">
        <h1>Contact Information</h1>
        <h3>
          We will try our best to answer your questions as soon as possible.
        </h3>
        <br />
        <h2>Social Media</h2>
        <div className="social-icons">
          <Link to="">
            <i className="fab fa-facebook-f" />
          </Link>
          <Link to="https://www.instagram.com/_bookshlf/">
            <i className="fab fa-instagram" />
          </Link>
          <Link to="">
            <i className="fab fa-twitter" />
          </Link>
          <Link to="">
            <i className="fab fa-linkedin" />
          </Link>
          <Link
            to="https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ"
            target="_blank"
          >
            <i className="fab fa-youtube" />
          </Link>
        </div>
        <h1 style={{fontSize: "3em"}}> Get In Touch</h1>
        <div className="contactForm">
          <form action="">
            <input
              type="text"
              id="contactName"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handelSubmit();
                }
              }}
            />
            <input
              type="mail"
              id="contactEmail"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handelSubmit();
                }
              }}
            />
            <br />
            <input
              type="text"
              id="contactSubject"
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
              value={Subject}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handelSubmit();
                }
              }}
            />
            <br />
            <textarea
              id="contactReview"
              placeholder="Details please! Your review helps other shoppers."
              onChange={(e) => setMessage(e.target.value)}
              value={Message}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handelSubmit();
                }
              }}
            />
            <br />
            <input
              type="button"
              id="contactSubmit"
              value="Submit Message"
              onClick={handelSubmit}
            />
            {/* Loader starts*/}
            <div
              id="loading"
              style={{
                display: loader,
                width: "8rem",
                height: "8rem",
                animation: "spin 1s infinite linear",
                border: "6px solid transparent",
                borderTop: "6px solid #3ab800",
              }}
            ></div>
            {/* Loader ends */}
          </form>
        </div>
        <div className={classes.root} style={{display: showAlert}}>
          <Alert
            variant="outlined"
            severity={Alerttype}
            style={{
              fontFamily: "PT Sans",
              fontWeight: "bold",
              color: alertColor,
            }}
          >
            {alertText}
          </Alert>
        </div>
      </div>
      <hr />
    </div>
  );
}
export default Contact;
