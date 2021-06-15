import React from "react";
import "./Contact.css";
import {Link} from "react-router-dom";

function Contact() {
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
        </div>
        <h1 style={{fontSize: "3em"}}> Get In Touch</h1>
        <div className="contactForm">
          <form action="put">
            <input type="text" id="contactName" placeholder="Name" required />
            <input type="mail" id="contactEmail" placeholder="Email" required />
            <br />
            <input
              type="text"
              id="contactSubject"
              placeholder="Subject"
              required
            />
            <br />
            <textarea
              id="contactReview"
              placeholder="Details please! Your review helps other shoppers."
              required
            />
            <br />
            <input type="submit" id="contactSubmit" value="Submit Message" />
          </form>
        </div>
      </div>
      <hr />
    </div>
  );
}
export default Contact;
