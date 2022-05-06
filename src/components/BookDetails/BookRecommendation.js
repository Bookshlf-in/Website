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

const BookRecommendation = (props) => {
  const [books, setbooks] = useState([]);
  useEffect(() => {
    axios
      .get("/getRecommendedBooks", {
        params: {
          bookId: props.bookId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setbooks(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <Stack sx={Styles.Container} spacing={2}>
      <Typography sx={Styles.Heading} align="center">
        Recommended Books
      </Typography>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        sx={{ overflowX: "auto", overflowY: "hidden" }}
      >
        {books.map((book) => (
          <BestBook book={book} />
        ))}
      </Stack>
    </Stack>
  );
};
export default BookRecommendation;
