import { React, useState, useEffect } from "react";
import axios from "../../axios";

// Mui Components
import { Stack, Typography } from "@mui/material";
import BestBook from "../SearchResult/SearchBook";

const Styles = {
  Container: {
    padding: "10px 16px",
  },
  Heading: {
    fontSize: "32px",
    fontWeight: "bolder",
  },
};

const Best = () => {
  const [books, setbooks] = useState([]);
  useEffect(() => {
    axios
      .get("/getBestSellingBooks")
      .then((res) => {
        console.log(res.data);
        setbooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Stack sx={Styles.Container} spacing={2}>
      <Typography sx={Styles.Heading} align="center">
        Best Selling Books
      </Typography>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
      >
        {books.map((book) => (
          <BestBook book={book} />
        ))}
      </Stack>
    </Stack>
  );
};
export default Best;
