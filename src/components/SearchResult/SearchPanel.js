import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// User Context
import { UserContext } from "../../Context/userContext";

// API
import axios from "../../axios";

// Components
import { Grid, Stack, Typography, Select } from "@mui/material";
import { Alert, AlertTitle, Pagination } from "@mui/material";
import { InputLabel, MenuItem, FormControl } from "@mui/material";

// Custom Components
import SearchBar from "./Searchbar";
import BookshlfLoader from "../MicroComponents/BookshlfLoader";
import SearchBook from "./SearchBook";

const booksperpage =
  window.innerWidth <= 400
    ? 5
    : window.innerWidth <= 800
    ? 9
    : window.innerWidth <= 1200
    ? 12
    : 18;

const Search = () => {
  // user
  const [user, setUser] = useContext(UserContext);

  // Calling Hooks
  const params = useParams();

  // Functionality States
  const [Loading, setLoading] = useState(false);

  // Data states
  const [books, setbooks] = useState(user?.Search?.data);
  const [page, setpage] = useState(user?.Search?.page);
  const [totalPages, settotalPages] = useState(user?.Search?.totalPages);
  const [filter, setFilter] = useState(0);
  const [filterParams, setFilterParams] = useState({
    q: params.query,
    noOfBooksInOnePage: booksperpage,
    page: user?.Search?.page ? user?.Search?.page : 1,
  });

  useEffect(() => {
    makeRequest();
  }, [params.query, filterParams]);

  const makeRequest = () => {
    setLoading(true);
    setpage(user?.Search?.page ? user?.Search?.page : 1);
    axios
      .get("/search", {
        params: filterParams,
      })
      .then((response) => {
        setbooks(response.data.data);
        settotalPages(response.data.totalPages);
        setLoading(false);
        setUser({
          ...user,
          Search: {
            ...user.Search,
            data: response.data.data,
            page: user?.Search?.page ? user?.Search?.page : 1,
            totalPages: response.data.totalPages,
          },
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // changing Page
  const changePage = (pageNo) => {
    setpage(pageNo);
    setFilterParams({ ...filterParams, page: pageNo });
    setUser({ ...user, Search: { ...user.Search, page: pageNo } });
  };

  // changing Filter
  const handelFilterChange = (e) => {
    setFilter(e.target.value);
    switch (e.target.value) {
      case 0:
        setFilterParams((prev) => {
          const Filter = { ...prev };
          delete Filter?.sortByDate;
          delete Filter?.sortByPrice;
          return Filter;
        });
        break;
      case 1:
        setFilterParams((prev) => {
          const Filter = { ...prev, sortByPrice: "asc" };
          delete Filter?.sortByDate;
          return Filter;
        });
        break;
      case 2:
        setFilterParams((prev) => {
          const Filter = { ...prev, sortByDate: "desc" };
          delete Filter?.sortByPrice;
          return Filter;
        });
        break;
      case 3:
        setFilterParams((prev) => {
          const Filter = { ...prev, sortByPrice: "desc" };
          delete Filter?.sortByDate;
          return Filter;
        });
        break;
      case 4:
        setFilterParams((prev) => {
          const Filter = { ...prev, sortByDate: "asc" };
          delete Filter?.sortByPrice;
          return Filter;
        });
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>Search | Bookshlf</title>
      </Helmet>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          width: "100%",
          padding: "10px",
        }}
        justifyContent="center"
        alignItems="center"
        className="search-book-container"
      >
        <SearchBar />
        <FormControl fullWidth color="success" variant="standard" size="small">
          <InputLabel id="search-filter">Filter Books</InputLabel>
          <Select
            labelId="search-filter"
            value={filter}
            label="Filter Books"
            onChange={handelFilterChange}
          >
            <MenuItem value={0}>Default</MenuItem>
            <MenuItem value={1}>Price Low to High</MenuItem>
            <MenuItem value={2}>Newest</MenuItem>
            <MenuItem value={3}>Price High to Low</MenuItem>
            <MenuItem value={4}>Oldest</MenuItem>
          </Select>
        </FormControl>
        {!Loading ? (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ paddingRight: "16px" }}
          >
            {books && books.length
              ? books.map((book) => (
                  <Grid item xs={12} sm={4} md={3} lg={2} key={book._id}>
                    <SearchBook book={book} />
                  </Grid>
                ))
              : null}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack
                sx={{ width: "100%" }}
                justifyContent="center"
                alignItems="center"
              >
                {books && books.length ? (
                  <Pagination
                    variant="outlined"
                    color="warning"
                    size="small"
                    page={page}
                    count={totalPages}
                    showFirstButton
                    showLastButton
                    onChange={(e, pageNo) => changePage(pageNo)}
                  />
                ) : (
                  <Alert severity="info">
                    <AlertTitle>
                      <strong>No Results Found</strong>
                    </AlertTitle>
                    <Stack>
                      <Typography variant="caption">
                        If you are not able to find the book you want, then mail
                        us at -
                      </Typography>
                      <Link
                        to={{
                          pathname: "mailto:bookshlf.in@gmail.com",
                        }}
                        target="_blank"
                      >
                        <strong>bookshlf.in@gmail.com</strong>
                      </Link>
                      <Typography variant="caption">OR</Typography>
                      <Link to="/Contact">
                        <strong>Contact Us</strong>
                      </Link>
                    </Stack>
                  </Alert>
                )}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <BookshlfLoader sx={{ height: 56, width: "auto" }} />
        )}
      </Stack>
    </>
  );
};

export default Search;
