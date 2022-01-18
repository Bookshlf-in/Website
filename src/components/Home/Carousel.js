import { React, useState, useEffect, useRef, useCallback } from "react";
import "./Home.css";

// Components
import { Button, IconButton, Slide } from "@mui/material";

// Icons
import ActiveIcon from "@mui/icons-material/FiberManualRecordRounded";
import NotActiveIcon from "@mui/icons-material/FiberManualRecordOutlined";
import LeftIcon from "@mui/icons-material/ChevronLeftRounded";
import RightIcon from "@mui/icons-material/ChevronRightRounded";

const images = ["", "", "", "", "", ""];

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
  const [dir, setDir] = useState("left");
  const containerRef = useRef(null);

  // Custom Image Slider
  const ImageSlider = (props) => {
    return (
      <Slide
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
        direction={props.dir}
        container={props.Ref}
      >
        <div
          className="slider__image"
          style={{
            backgroundImage: `url("https://storage.googleapis.com/bookshlf-in/static/carousel/${
              props.index + 1
            }.png")`,
          }}
        ></div>
      </Slide>
    );
  };

  // Custom Image Slider
  const TitleSlider = (props) => {
    return (
      <Slide
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
        direction={props.dir}
        container={props.Ref}
      >
        <div>
          {slideLabel[props.index].title}
          <div className="slider__body">{slideLabel[props.index].body}</div>
        </div>
      </Slide>
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
    const myTimeout = setTimeout(slideRight, 10000);
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
