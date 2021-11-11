import React from "react";
import "./About.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const GITHUB_URL = "https://github.com/Bookshlf-in";
const WEBSITE_URL = "https://bookshlf.in";

function About() {
  const openWebsite = () => window.open(WEBSITE_URL, "_blank").focus();
  const openGithub = () => window.open(GITHUB_URL, "_blank").focus();

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src="/images/smallLogo.svg" alt="bookhlf.in" height="60px" />

          <div className="About-title">
            <p>Bookshlf</p>
          </div>

          <div className="About-description">
            <p>E-commerce platform to buy and sell used books</p>
          </div>

          <div className="About-textbox">
            <p>
              We are a small team of students who are enthusiastic developers.
              We are trying to create a better viable platform for students who
              want to learn but due to financial issues can't afford new books.
              We also want to help those who want to sell thier books which they
              don't need. We hope that you will find this platform usefull. We
              are always trying to make this platform better and better.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "150px",
              alignItems: "center",
            }}
          >
            <button className="About-button" onClick={openWebsite}>
              <p>Website</p>
            </button>
            <button className="About-button" onClick={openGithub}>
              Github
            </button>
          </div>

          <section className="about-social-media">
            <div className="social-media-wrap">
              <div className="social-icons">
                <Link
                  className="social-icon-link facebook"
                  to={{
                    pathname:
                      "https://www.facebook.com/Bookshlf-109479771200918",
                  }}
                  target="_blank"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  className="social-icon-link instagram"
                  to={{
                    pathname: "https://instagram.com/_bookshlf",
                  }}
                  target="_blank"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link
                  className="social-icon-link twitter"
                  to={{
                    pathname: "https://twitter.com/BookshlfA",
                  }}
                  target="_blank"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  className="social-icon-link linkedin"
                  to={{
                    pathname:
                      "https://www.linkedin.com/in/bookshlf-by-aman-861073223/",
                  }}
                  target="_blank"
                  aria-label="Linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>
                <Link
                  className="social-icon-link youtube"
                  to={{
                    pathname:
                      "https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ",
                  }}
                  target="_blank"
                  aria-label="Youtube"
                >
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default About;
