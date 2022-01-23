import React from "react";

// mui
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const NotFoundPage = () => {
  return (
    <div className="error-404">
      <h1>
        4
        <span>
          <img src="/images/ghost.png" height="200px" />
        </span>
        4
      </h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
      <br />
      <Button
        startIcon={<HomeIcon />}
        variant="contained"
        size="small"
        href="/"
      >
        Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
