import { React, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

// Components
import { Stack, Avatar, Typography, Button } from "@mui/material";
import { Grow } from "@mui/material";

const BACKGROUNDS = ["#8850FF", "#FFBA00", "#4054FF", "#00ff73", "#ffa724"];
const Labels = ["JEE MAINS", "JEE ADVANCED", "CBSE", "NEET UG", "NOVELS"];
const FOREGROUNDS = [
  { background: "linear-gradient(#f72648, #fccb3c)" },
  { background: "linear-gradient(#3ca3fc, #ffd300)" },
  { background: "linear-gradient(#26c9f7, #dffc3c)" },
  { background: "linear-gradient(#f7e926, #3cfc5c)" },
  { background: "linear-gradient(#26a3f7, #c63cfc)" },
];
const IMG_URL = [
  "/images/Categories/jeemains-logo.png",
  "/images/Categories/JEE-Advance-Logo.png",
  "/images/Categories/cbse-logo.png",
  "/images/Categories/neet-ug-logo.png",
  "/images/Categories/novel-logo.jpg",
];

const LINKS = [
  "/SearchResult/tag:JEE Mains",
  "/SearchResult/tag:JEE Advanced",
  "/SearchResult/tag:CBSE",
  "/SearchResult/tag:NEET",
  "/SearchResult/tag:NOVEL",
];
const Length = IMG_URL.length;
const Categories = () => {
  const [imageIndex, setImageIndex] = useState(0);

  // Sliding Right
  const Next = useCallback(() => {
    setImageIndex((imageIndex + 1) % Length);
  }, [imageIndex]);

  useEffect(() => {
    const myTimeout = setTimeout(Next, 8000);
    return () => {
      clearTimeout(myTimeout);
    };
  }, [Next]);

  const CategoryItem = () => {
    return (
      <Grow in={true} timeout={1500} style={{ transformOrigin: "0 0 0 0" }}>
        <Link to={LINKS[imageIndex]} className="card">
          <Stack
            spacing={2}
            className="card__header"
            alignItems="center"
            sx={FOREGROUNDS[imageIndex]}
          >
            <Stack
              sx={{ width: "100%" }}
              justifyContent="space-between"
              direction="row"
            >
              <Avatar
                src="/images/smallLogo.png"
                alt="bookshlf.in"
                sx={{ height: 26, width: "auto" }}
                variant="square"
              />
              <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
                {Labels[imageIndex]}
              </Typography>
            </Stack>
            <Avatar
              src={IMG_URL[imageIndex]}
              alt={Labels[imageIndex]}
              variant="circle"
              sx={{ height: 150, width: 150 }}
            />
          </Stack>
          <Stack
            sx={{ padding: "40px 20px 20px 20px", height: "100%" }}
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Button
              sx={{
                border: `2px solid ${BACKGROUNDS[imageIndex]}`,
                color: BACKGROUNDS[imageIndex],
                borderRadius: "10px",
                minWidth: 200,
              }}
            >
              Shop Now
            </Button>
            <span className="card__category">
              Used Books For {Labels[imageIndex]}
            </span>
          </Stack>
        </Link>
      </Grow>
    );
  };

  return (
    <Stack
      sx={{ backgroundColor: BACKGROUNDS[imageIndex], transition: "1s" }}
      className="categories"
    >
      <Stack justifyContent="center" alignItems="center" direction="row">
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Staatliches",
            color: "white",
            letterSpacing: "1px",
          }}
          align="center"
        >
          Featured Categories
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={1}
        flexWrap="wrap"
        sx={{ paddingBottom: "10px" }}
      >
        <CategoryItem />
      </Stack>
    </Stack>
  );
};
export default Categories;
