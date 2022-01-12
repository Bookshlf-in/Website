import { React, useState, useEffect, useCallback } from "react";
import "./Home.css";

// Components
import { Typography, Button, IconButton } from "@mui/material";

// Icons
import ActiveIcon from "@mui/icons-material/FiberManualRecordRounded";
import NotActiveIcon from "@mui/icons-material/FiberManualRecordOutlined";
import LeftIcon from "@mui/icons-material/ChevronLeftRounded";
import RightIcon from "@mui/icons-material/ChevronRightRounded";

const images = [
  {
    url: "/images/CarouselBg/carousel_bg1.jpg",
  },
  {
    url: "/images/CarouselBg/carousel_bg2.jpg",
  },
  {
    url: "/images/CarouselBg/carousel_bg3.jpg",
  },
  {
    url: "/images/CarouselBg/carousel_bg4.jpg",
  },
  {
    url: "/images/CarouselBg/carousel_bg5.png",
  },
  {
    url: "/images/CarouselBg/carousel_bg6.png",
  },
];

const totalImages = images.length;

const slideLabel = [
  {
    title: "BUY USED BOOKS",
    body: "Buy Used Books at Discounted Price at Bookshlf",
    btn: "BUY NOW",
    link: "/SearchResult/tag:ALL",
  },
  {
    title: "SELL USED BOOKS",
    body: "Sell Used Books on Bookshlf and get best Price for your Book",
    btn: "SELL NOW",
    link: "/SellerPanel/5",
  },
  {
    title: "OLD BOOKS ARE LIKE OLD FRIENDS.",
    body: "Full of memories and Emotions",
    btn: "JOIN NOW",
    link: "/Login",
  },
  {
    title: "BEST JEE MAINS & ADVANCED BOOKS",
    body: "Get Best Jee Mains, Advanced, Neet UG etc Books for discounted Prices",
    btn: "BUY NOW",
    link: "/SearchResult/tag:JEE",
  },
  { title: "", body: "", btn: "" },
  { title: "", body: "", btn: "" },
];

const Slider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const slideLeft = () => {
    setImageIndex((imageIndex + totalImages - 1) % totalImages);
  };

  const slideRight = useCallback(() => {
    setImageIndex((imageIndex + 1) % totalImages);
  }, [imageIndex]);

  useEffect(() => {
    const myTimeout = setTimeout(slideRight, 5000);
    return () => {
      clearTimeout(myTimeout);
    };
  }, [slideRight]);

  return (
    <div className="slider">
      <div className="slider__imageContainer">
        <a href={images[imageIndex].url}>
          <div
            className="slider__image"
            style={{
              backgroundImage: `url("${images[imageIndex].url}")`,
            }}
          ></div>
        </a>
      </div>
      <div className="slider__bulletContainer">
        {images.map((image, i) => (
          <IconButton onClick={() => setImageIndex(i)} key={i}>
            {imageIndex === i ? (
              <ActiveIcon style={{ height: "25px", width: "25px" }} />
            ) : (
              <NotActiveIcon />
            )}
          </IconButton>
        ))}
      </div>
      <div className="slider__title">
        {slideLabel[imageIndex].title}
        <div className="slider__body">{slideLabel[imageIndex].body}</div>
      </div>

      {imageIndex < 4 ? (
        <div className="slider__btn">
          <Button variant="contained" href={slideLabel[imageIndex].link}>
            {slideLabel[imageIndex].btn}
          </Button>
        </div>
      ) : null}
      <div className="slider__navigationButtons">
        <div className="slider__leftNavigation">
          <IconButton onClick={slideLeft}>
            <LeftIcon />
          </IconButton>
        </div>
        <div className="slider__rightNavigation">
          <IconButton onClick={slideRight}>
            <RightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Slider;
