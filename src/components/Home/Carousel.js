import { React, useState } from "react";
import "./Home.css";

// Components
import Carousel from "react-material-ui-carousel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Images
import BG_1 from "./CarouselBg/carousel_bg1.jpg";
import BG_2 from "./CarouselBg/carousel_bg2.jpg";
import BG_3 from "./CarouselBg/carousel_bg3.jpg";
import BG_4 from "./CarouselBg/carousel_bg4.jpg";
import BG_5 from "./CarouselBg/carousel_bg5.png";
import BG_6 from "./CarouselBg/carousel_bg6.png";

const CarouselComponent = (props) => {
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      className="carousel-bg"
      sx={{ backgroundImage: `url(${props.src})` }}
    >
      <Typography className="carousel-label-title" align="center">
        {props.label}
      </Typography>
      <Typography className="carousel-label-body" align="center">
        {props.txt}
      </Typography>
      {props.slideNo !== 4 && props.slideNo !== 5 ? (
        <Button variant="contained" color="warning" className="carousel-button">
          {props.btn}
        </Button>
      ) : null}
    </Stack>
  );
};

const HomeCarousel = () => {
  const BG = [
    {
      src: BG_1,
      label: "Purchase Used Books",
      txt: "Bookshlf is the best place to Buy your Used Books",
      btn: "Buy Now",
    },
    {
      src: BG_2,
      label: "Sell Your Books",
      txt: "In Bookshlf You can decide the Price of Your book to be sold.",
      btn: "Sell Now",
    },
    {
      src: BG_3,
      label: "Books Are Like Old Friends. Full Of Memories.",
      txt: "Get Used Books At Discounted Prices. Make a Step Towards saving Environment",
      btn: "ALL Books",
    },
    {
      src: BG_4,
      label: "Buy & Sell Best JEE Mains & Advanced Books",
      txt: "buy and sell books of any competitive exams all over india.",
      btn: "Buy Now",
    },
    { src: BG_5, label: "", txt: "", btn: "" },
    { src: BG_6, label: "", txt: "", btn: "" },
  ];
  return (
    <Carousel animation="slide" duration="1000" interval="5000" autoPlay={true}>
      {BG.map((item, i) => (
        <CarouselComponent
          key={i}
          slideNo={i}
          src={item.src}
          label={item.label}
          txt={item.txt}
          btn={item.btn}
        />
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
