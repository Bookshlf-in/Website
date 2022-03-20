import { React, useState } from "react";
import axios from "../../axios";

// MUI Components
import { Stack, Box, Avatar, Typography, Button } from "@mui/material";
import { Grid, TextField, CircularProgress, Pagination } from "@mui/material";
import { Alert, Chip } from "@mui/material";

// MUI Icons
import ReloadIcon from "@mui/icons-material/Replay";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import NextIcon from "@mui/icons-material/NavigateNext";

const SellerBooks = () => {
  const [Loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const GetBooks = (page) => {
    setLoading(true);
    axios
      .get("/admin-getSellerBookList", {
        params: {
          sellerId: sellerId,
          page: page,
          noOfBooksInOnePage: 12,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBooks(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2}>
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          label="Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          sx={{ minWidth: 400 }}
        />
        <Button
          endIcon={
            Loading ? (
              <CircularProgress size={15} color="inherit" />
            ) : (
              <ReloadIcon />
            )
          }
          disabled={Loading}
          variant="outlined"
          onClick={() => GetBooks(page)}
        >
          Get Books
        </Button>
      </Stack>
      <Pagination
        count={totalPages}
        variant="outlined"
        page={page}
        onChange={(e, newPage) => {
          setPage(newPage);
          GetBooks(newPage);
        }}
      />
      <Grid container spacing={2}>
        {books.length > 0 ? (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={book._id}>
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  border: "2px solid rgba(99, 99, 99, 0.5)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <Stack
                  direction="column"
                  sx={{ width: "100%", padding: "10px", height: "100%" }}
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    alt={book.title}
                    src={book.photos[0]}
                    sx={{ height: 120, width: 100 }}
                    variant="rounded"
                  />
                  <Typography align="center" variant="caption">
                    {book.title.length <= 75
                      ? book.title
                      : book.title.substr(0, 75) + "..."}
                  </Typography>
                  <Stack
                    justifyContent="flex-end"
                    sx={{ height: "100%" }}
                    spacing={1}
                  >
                    <Chip
                      icon={<RupeeIcon />}
                      label={book.price}
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      endIcon={<NextIcon />}
                      color="primary"
                      href={`/AdminBook/${book._id}`}
                      target="_blank"
                      size="small"
                      sx={{ fontSize: "9px" }}
                    >
                      More Details
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item sm={12} md={12} lg={12} xs={12}>
            <Alert severity="error" color="warning">
              No Books in this Page
            </Alert>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};
export default SellerBooks;
