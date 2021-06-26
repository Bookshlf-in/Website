import React from "react";
import { render } from "react-dom";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./Slider-animations.css";
import "./Carousel.css";

function Carousel() {
  const content = [
    {
      title: "Your Online bOOk Store",
      description: "READ WHAT YOU LOVE. LOVE WHAT YOU READ!",
      button: "Explore Now",
      image: "/images/carousel_bg1.jpg",
    },
    {
      title: "Get 40% off on orders over 999",
      description: "India's Largest Online Book Store",
      button: "Explore Now",
      image: "/images/carousel_bg2.jpg",
    },
    {
      title: "JEE(Main + Advance), NEET Books By V & S Publisher",
      description: "UPTO 80% OFF ONLY THIS WEEK",
      button: "Shop Now",
      image: "/images/carousel_bg4.jpg",
    },
  ];

  return (
    <div className="carousel">
      <div className="corousel-container">
        <Slider className="slider-wrapper">
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{
                background: `url('${item.image}') no-repeat center center`,
              }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button>{item.button}</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carousel;
