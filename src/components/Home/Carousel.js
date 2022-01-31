import { React, useState, useEffect, useRef, useCallback } from "react";
import "./Home.css";

// Components
import { Button, IconButton, Fade } from "@mui/material";

// Icons
import ActiveIcon from "@mui/icons-material/FiberManualRecordRounded";
import NotActiveIcon from "@mui/icons-material/FiberManualRecordOutlined";
import LeftIcon from "@mui/icons-material/ChevronLeftRounded";
import RightIcon from "@mui/icons-material/ChevronRightRounded";

const images = [
  {
    url: {
      mobile: "/images/Carousel/CarouselMobile/Carousel_bg1.png",
      desktop: "/images/Carousel/CarouselDesktop/Carousel_bg1.png",
    },
  },
  {
    url: {
      mobile: "/images/Carousel/CarouselMobile/Carousel_bg2.png",
      desktop: "/images/Carousel/CarouselDesktop/Carousel_bg2.png",
    },
  },
  {
    url: {
      mobile: "/images/Carousel/CarouselMobile/Carousel_bg3.png",
      desktop: "/images/Carousel/CarouselDesktop/Carousel_bg3.png",
    },
  },
  {
    url: {
      mobile: "/images/Carousel/CarouselMobile/Carousel_bg4.png",
      desktop: "/images/Carousel/CarouselDesktop/Carousel_bg4.png",
    },
  },
  {
    url: {
      mobile: "/images/Carousel/CarouselMobile/Carousel_bg5.png",
      desktop: "/images/Carousel/CarouselDesktop/Carousel_bg5.png",
    },
  },
  {
    url: {
      mobile: "/images/Carousel/CarouselMobile/Carousel_bg6.png",
      desktop: "/images/Carousel/CarouselDesktop/Carousel_bg6.png",
    },
  },
];

const totalImages = images.length;

const slideLabel = [
  {},
  {},
  {},
  {},
  {},
  {
    title: "",
    body: "",
    btn: "SELL Now",
    link: "/SellerPanel/5",
  },
];

const Slider = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [dir, setDir] = useState("left");
  const containerRef = useRef(null);
  const [frameWidth, setFrameWidth] = useState(window.innerWidth);

  useEffect(() => {
    setFrameWidth(window.innerWidth);
  }, [window.innerWidth]);

  // Custom Image Slider
  const ImageSlider = (props) => {
    return (
      <Fade in={true} container={props.Ref} timeout={0}>
        <div
          className="slider__image"
          style={{
            backgroundImage:
              frameWidth <= 600
                ? `url("${images[props.index].url.mobile}")`
                : `url("${images[props.index].url.desktop}")`,
          }}
        ></div>
      </Fade>
    );
  };

  // Custom Image Slider
  const TitleSlider = (props) => {
    return (
      <Fade in={true} container={props.Ref}>
        <div>
          {slideLabel[props.index].title}
          <div className="slider__body">{slideLabel[props.index].body}</div>
        </div>
      </Fade>
    );
  };

  // slidingLeft
  const slideLeft = () => {
    setImageIndex((imageIndex + totalImages - 1) % totalImages);
    setDir("right");
  };

  // Sliding Right
  const slideRight = useCallback(() => {
    setImageIndex((imageIndex + 1) % totalImages);
    setDir("left");
  }, [imageIndex]);

  useEffect(() => {
    const myTimeout = setTimeout(slideRight, 5000);
    return () => {
      clearTimeout(myTimeout);
    };
  }, [slideRight]);

  return (
    <div className="slider">
      <div className="slider__imageContainer" ref={containerRef}>
        <ImageSlider dir={dir} index={imageIndex} Ref={containerRef.current} />
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
      <div className="slider__title" ref={containerRef}>
        <TitleSlider dir="down" index={imageIndex} Ref={containerRef.current} />
      </div>

      {imageIndex === 5 ? (
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
