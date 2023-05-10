import React from "react";
import "./MicroComponents.css";

// Mui Components
import { Stack } from "@mui/material";

const BookshlfLoader = (props) => {
  return (
    <Stack sx={props.sx} className="bookshlf-loader">
      <img
        src="/images/smallLogo.png"
        alt="bookshlf-custom-loader"
        height="100%"
        width="100%"
      />
    </Stack>
  );
};
export default BookshlfLoader;
