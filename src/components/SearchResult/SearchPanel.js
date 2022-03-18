import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import { Grid, Stack, Typography, Select } from "@mui/material";
import { Alert, AlertTitle, Pagination } from "@mui/material";
import { InputLabel, MenuItem, FormControl } from "@mui/material";

// Custom Components
import SearchBar from "./Searchbar";
import BookshlfLoader from "../MicroComponents/BookshlfLoader";
import SearchBook from "./SearchBook";

// Use Styles
const useStyles = makeStyles(() => ({
  root: {
    fontSize: "12px",
    "& li": {
      marginLeft: "3px",
      "& button": {
        fontFamily: "PT sans !important",
      },
    },
    "& div": {
      fontSize: "12px !important",
    },
    "& label": {
      fontSize: "12px !important",
    },
  },
}));

const booksperpage =
  window.innerWidth <= 400
    ? 5
    : window.innerWidth <= 800
    ? 9
    : window.innerWidth <= 1200
    ? 12
    : 18;

const Search = () => {
  // Calling Hooks
  const classes = useStyles();
  const params = useParams();

  // Functionality States
  const [Loading, setLoading] = useState(false);

  // Data states
  const [books, setbooks] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [filter, setFilter] = useState(0);
  const [filterParams, setFilterParams] = useState({
    q: params.query,
    noOfBooksInOnePage: booksperpage,
    page: page,
  });

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      setpage(1);
      const newQuery = { ...filterParams, q: params.query, page: 1 };
      delete newQuery?.sortByDate;
      delete newQuery?.sortByPrice;
      makeRequest(newQuery);
    };
    fetchdata();
  }, [params.query]);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      makeRequest(filterParams);
    };
    fetchdata();
  }, [filterParams]);

  const makeRequest = (params) => {
    setFilterParams(params);
    axios
      .get("/search", {
        params: params,
      })
      .then((response) => {
        setbooks(response.data.data);
        settotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // changing Page
  const changePage = (pageNo) => {
    setpage(pageNo);
    setFilterParams({ ...filterParams, page: pageNo });
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
        <FormControl
          fullWidth
          className={classes.root}
          color="success"
          variant="standard"
          size="small"
        >
          <InputLabel id="demo-simple-select-label">Filter Books</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filter}
            label="Filter Books"
            onChange={handelFilterChange}
          >
            <MenuItem value={0} className={classes.root}>
              Default
            </MenuItem>
            <MenuItem value={1} className={classes.root}>
              Price Low to High
            </MenuItem>
            <MenuItem value={2} className={classes.root}>
              Newest
            </MenuItem>
            <MenuItem value={3} className={classes.root}>
              Price High to Low
            </MenuItem>
            <MenuItem value={4} className={classes.root}>
              Oldest
            </MenuItem>
          </Select>
        </FormControl>
        {!Loading ? (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ paddingRight: "16px" }}
          >
            {books.length
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
                {books.length ? (
                  <Pagination
                    variant="outlined"
                    color="warning"
                    size="small"
                    page={page}
                    count={totalPages}
                    className={classes.root}
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
