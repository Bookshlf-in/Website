import { React, useState, useContext } from "react";
import { AdminContext } from "../../../../context/adminContext";
import axios from "../../../../api/axios";

// MUI Components
import { Grid, Stack, Button, Alert } from "@mui/material";
import { TextField, CircularProgress, Pagination } from "@mui/material";

// MUI Icons
import ReloadIcon from "@mui/icons-material/Replay";

// Custom Components
import FetchedBook from "./BookVerification/FetchedBook";

const SellerBooks = () => {
  // admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // States
  const [Loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState(admin?.Seller?.sellerId);
  const [books, setBooks] = useState(admin.Seller ? admin.Seller.books : []);
  const [page, setPage] = useState(admin?.Seller?.page);
  const [totalPages, setTotalPages] = useState(admin?.Seller?.totalPages);

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
        setAdmin({
          ...admin,
          Seller: {
            ...admin.Seller,
            sellerId: sellerId,
            page: page,
            totalPages: res.data.totalPages,
            books: res.data.data,
          },
        });
        localStorage.setItem(
          "bookshlf_admin",
          JSON.stringify({
            ...admin,
            Seller: {
              ...admin.Seller,
              sellerId: sellerId,
              page: page,
              totalPages: res.data.totalPages,
              books: res.data.data,
            },
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2} direction="row">
        <TextField
          color="primary"
          size="small"
          label="Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          sx={{ minWidth: 300 }}
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
          size="small"
        >
          Get Books
        </Button>
      </Stack>
      <Pagination
        count={totalPages}
        color="primary"
        page={page}
        onChange={(e, newPage) => {
          setPage(newPage);
          GetBooks(newPage);
        }}
        size="small"
        shape="rounded"
      />
      <Grid container spacing={2}>
        {books.length > 0 ? (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={book._id}>
              <FetchedBook book={book} />
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
