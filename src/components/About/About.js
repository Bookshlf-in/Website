import React from "react";
import "./About.css";
import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>About | Bookshlf</title>
        <meta
          name="description"
          content="We are a team of students who are enthusiastic developers. We are trying to create a platform for students who cannot afford to buy books due to financial problems."
        />
      </Helmet>

      <div className="About-bg">
        <div className="night">
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
          <div className="shooting_star"></div>
        </div>
        <div className="About-textbox">
          <p>
            We are a small team of students who are enthusiastic developers. We
            are trying to create a better viable platform for students who want
            to learn but due to financial issues can't afford new books. We also
            want to help those who want to sell thier books which they don't
            need. We hope that you will find this platform usefull. We are
            always trying to make this platform better and better.
          </p>
        </div>
      </div>
    </>
  );
}
export default About;
