import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
// Components
import { Stack, Avatar, Typography } from "@mui/material";
const CategoryItem = (props) => {
  return (
    <Link to={props.url} className="item">
      <Avatar
        src={props.imgUrl}
        alt={props.label}
        sx={{
          width: 100,
          height: 100,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: -10,
        }}
      />
      <Stack sx={{ height: "100%" }}>
        <h6 className="item-h6">{props.label}</h6>
      </Stack>
      <Typography
        variant="caption"
        align="center"
        sx={{
          width: 100,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          bottom: 10,
          padding: "10px 16px",
          borderRadius: "5px",
          border: "1px solid rgba(255,255,255,0.5)",
          color: "rgba(255,255,255,0.5)",
          "&:hover": {
            backgroundColor: "#fff",
            color: "darkcyan",
            transition: "0.3s",
          },
        }}
      >
        Shop Now
      </Typography>
    </Link>
  );
};
const Categories = () => {
  return (
    <Stack className="categories">
      <Stack justifyContent="center" alignItems="center" direction="row">
        <Typography
          variant="h4"
          sx={{ fontFamily: "Staatliches" }}
          align="center"
        >
          Featured Categories
        </Typography>
      </Stack>
      <Stack sx={{ padding: "10px" }} spacing={2}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-evenly"
          sx={{ width: "100%" }}
        >
          <CategoryItem
            url="/SearchResult/tag:JEE Mains"
            imgUrl="/images/Categories/jeemains-logo.png"
            label="JEE Mains"
          />
          <CategoryItem
            url="/SearchResult/tag:JEE Advanced"
            imgUrl="/images/Categories/JEE-Advance-Logo.png"
            label="JEE Advanced"
          />
          <CategoryItem
            url="/SearchResult/tag:NEET"
            imgUrl="/images/Categories/neet-ug-logo.png"
            label="NEET UG"
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-evenly"
          sx={{ width: "100%" }}
        >
          <CategoryItem
            url="/SearchResult/tag:CBSE"
            imgUrl="/images/Categories/cbse-logo.png"
            label="CBSE"
          />
          <CategoryItem
            url="/SearchResult/tag:NOVEL"
            imgUrl="/images/Categories/novel-logo.jpg"
            label="Novels"
          />
          <CategoryItem
            url="/SearchResult/tag:School"
            imgUrl="/images/Categories/school.png"
            label="High School"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Categories;
