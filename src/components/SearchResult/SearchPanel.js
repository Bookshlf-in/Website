import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./search.css";

// User Context
import { SearchContext } from "../../context/searchContext";

// API
import axios from "../../api/axios";

// Components
import { Grid, Stack, Typography, Select } from "@mui/material";
import { Alert, AlertTitle, Pagination } from "@mui/material";
import { InputLabel, MenuItem, FormControl } from "@mui/material";

// Custom Components
// import SearchBar from "./Searchbar";
import BookshlfLoader from "../MicroComponents/BookshlfLoader";
import SearchBook from "./searchbook";

const Search = () => {
  // search
  const [search, setSearch] = useContext(SearchContext);

  // Calling Hooks
  const params = useParams();

  // Functionality States
  const [Loading, setLoading] = useState(false);

  // Data states
  const [books, setbooks] = useState(search.books);
  const [page, setpage] = useState(search.page);
  const [totalPages, settotalPages] = useState(search.totalPages);
  const [filter, setFilter] = useState(search.filter);
  const [filterParams, setFilterParams] = useState(search.filterParams);

  const makeRequest = () => {
    setLoading(true);
    axios
      .get("/search", {
        params: { ...filterParams, q: params.query },
      })
      .then((response) => {
        setbooks(response.data.data);
        settotalPages(response.data.totalPages);
        setSearch({
          books: response.data.data,
          page: page,
          totalPages: response.data.totalPages,
          filter: filter,
          filterParams: { ...filterParams, q: params.query },
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    makeRequest();
  }, [params.query, filterParams, page]);

  // changing Page
  const changePage = (pageNo) => {
    setpage(pageNo);
    setFilterParams({ ...filterParams, page: pageNo });
    setSearch({ ...search, page: pageNo });
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
      default:
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
        justifyContent="center"
        alignItems="center"
      >
        {/* <SearchBar /> */}
        <FormControl
          color="primary"
          variant="filled"
          size="small"
          sx={{ minWidth: 250 }}
        >
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
          <Grid container spacing={1} justifyContent="center">
            {books && books.length
              ? books.map((book) => (
                  <Grid item xs={12} sm={4} md={3} lg={3} key={book._id}>
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
