import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./Slider-animations.css";
import "./Carousel.css";
import {useHistory} from "react-router-dom";

function Carousel() {
  const history = useHistory();
  const content = [
    {
      title: "Your Online bOOk Store",
      description: "READ WHAT YOU LOVE. LOVE WHAT YOU READ!",
      button: "Explore Now",
      image: "/images/carousel_bg1.jpg",
    },
    {
      title: "Sell Your Old Books",
      description: "Sell your old books with best possible prices",
      button: "Sell Now",
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
        <Slider className="slider-wrapper" autoplay="6000">
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
                <button onClick={() =>{
                  if(item.button === "Sell Now"){
                    history.push("/SellerPanel");
                  }else{
                    history.push("/SearchResult")
                  }
                }}>{item.button}</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carousel;
