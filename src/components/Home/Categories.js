import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

// Components
import { Stack, Avatar, Typography } from "@mui/material";

const Categories = () => {
  return (
    <Stack className="categories">
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ padding: "10px" }}
      >
        <Typography variant="h4">Featured Categories</Typography>
        <Typography variant="h6">
          <Link to="/SearchResult/tag:ALL">
            All Categories&nbsp;
            <i className="fas fa-angle-right" />
          </Link>
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        className="item-wrapper"
        spacing={1}
        flexWrap="wrap"
      >
        <Link to="/SearchResult/tag:JEE Mains">
          <div className="item i1 ">
            <Avatar
              src="/images/Categories/jeemains-logo.png"
              alt=""
              sx={{ width: 56, height: 56 }}
            />
            <h6 className="item-h6">JEE MAINS</h6>
            <Typography variant="body2">
              <Link to="/SearchResult/tag:JEE Mains">
                <strong>Shop Now</strong>
              </Link>
            </Typography>
          </div>
        </Link>
        <Link to="/SearchResult/tag:JEE Advanced">
          <div className="item i2">
            <Avatar
              src="/images/Categories/JEE-Advance-Logo.png"
              alt=""
              sx={{ width: 56, height: 56 }}
            />
            <h6 className="item-h6">JEE ADVANCED</h6>
            <Typography variant="body2">
              <Link to="/SearchResult/tag:JEE Advanced">
                <strong>Shop Now</strong>
              </Link>
            </Typography>
          </div>
        </Link>
        <Link to="/SearchResult/tag:CSBE">
          <div className="item i3">
            <Avatar
              src="/images/Categories/cbse-logo.png"
              alt=""
              sx={{ width: 56, height: 56 }}
            />
            <h6 className="item-h6">CBSE</h6>
            <Typography variant="body2">
              <Link to="/SearchResult/tag:CBSE">
                <strong>Shop Now</strong>
              </Link>
            </Typography>
          </div>
        </Link>
        <Link to="/SearchResult/tag:NEET">
          <div className="item i4">
            <Avatar
              src="/images/Categories/neet-ug-logo.png"
              sx={{ width: 56, height: 56 }}
              alt=""
            />
            <h6 className="item-h6">NEET UG</h6>
            <Typography variant="body2">
              <Link to="/SearchResult/tag:NEET">
                <strong>Shop Now</strong>
              </Link>
            </Typography>
          </div>
        </Link>
        <Link to="/SearchResult/tag:NOVELS">
          <div className="item i5">
            <Avatar
              src="/images/Categories/novel-logo.jpg"
              sx={{ width: 56, height: 56 }}
              alt=""
            />
            <h6 className="item-h6">NOVELS</h6>
            <Typography variant="body2">
              <Link to="/SearchResult/tag:Novel">
                <strong>Shop Now</strong>
              </Link>
            </Typography>
          </div>
        </Link>
      </Stack>
    </Stack>
  );
};
export default Categories;
