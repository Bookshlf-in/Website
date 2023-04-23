import { React, useState, useContext } from "react";
import { AdminContext } from "../../../../../context/adminContext";

// API
import axios from "../../../../../api/axios";

// MUI Components
import { Stack, Pagination } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// icons
import LoadIcon from "@mui/icons-material/AutorenewRounded";

const FetchBookBar = () => {
  // Admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // functionality States
  const [Load, setLoad] = useState(false);

  // data States
  const [, setbooks] = useState(admin.bookVerification.data);
  const [totalPages, settotalPages] = useState(
    admin.bookVerification.totalPages
  );
  const [page, setpage] = useState(admin.bookVerification.page);
  const [noOfBooksInOnePage, setnoOfBooksInOnePage] = useState(
    admin.bookVerification.noOfBooksInOnePage
  );

  const [isApproved, setisApproved] = useState(
    admin.bookVerification.isApproved
  );

  // fetchings book lists
  const getBooks = async (pageNo, isApproved, noOfBooksInOnePage) => {
    setLoad(true);
    axios
      .get("/admin-getBookList", {
        params: {
          page: pageNo,
          noOfBooksInOnePage: noOfBooksInOnePage,
          isApproved: isApproved,
        },
      })
      .then((response) => {
        updateData(response, pageNo, isApproved, noOfBooksInOnePage);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoad(false);
      });
  };

  // updating the data
  const updateData = (response, pageNo, isApproved, noOfBooksInOnePage) => {
    setpage(pageNo);
    setisApproved(isApproved);
    setnoOfBooksInOnePage(noOfBooksInOnePage);
    setAdmin({
      ...admin,
      bookVerification: {
        data: response.data.data.filter(
          (book) => book.status !== "Approval rejected"
        ),
        totalPages: response.data.totalPages,
        isApproved: isApproved,
        page: pageNo,
        noOfBooksInOnePage: noOfBooksInOnePage,
      },
    });
    localStorage.setItem(
      "bookshlf_admin",
      JSON.stringify({
        ...admin,
        bookVerification: {
          data: response.data.data.filter(
            (book) => book.status !== "Approval rejected"
          ),
          totalPages: response.data.totalPages,
          isApproved: isApproved,
          page: pageNo,
          noOfBooksInOnePage: noOfBooksInOnePage,
        },
      })
    );
    setbooks(
      response.data.data.filter((book) => book.status !== "Approval rejected")
    );
    settotalPages(response.data.totalPages);
    setLoad(false);
  };

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center">
      <Stack direction="row" spacing={2}>
        <LoadingButton
          loading={Load}
          loadingPosition="start"
          startIcon={<LoadIcon />}
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => getBooks(page, isApproved, noOfBooksInOnePage)}
        >
          Fetch Books
        </LoadingButton>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="book-status">Book Status</InputLabel>
          <Select
            labelId="book-status"
            value={isApproved}
            onChange={(e) => {
              getBooks(page, e.target.value, noOfBooksInOnePage);
            }}
            label="Book Status"
            size="small"
          >
            <MenuItem value={false}>Approval Pending</MenuItem>
            <MenuItem value={true}>Approved</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="booksInPage">Books Per Page</InputLabel>
          <Select
            labelId="booksInPage"
            value={noOfBooksInOnePage}
            onChange={(e) => {
              getBooks(page, isApproved, e.target.value);
            }}
            label="Books Per Page"
            size="small"
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {totalPages ? (
        <Pagination
          count={totalPages}
          page={page ? page : 1}
          onChange={(e, pageNo) => {
            getBooks(pageNo, isApproved, noOfBooksInOnePage);
          }}
          color="primary"
          size="small"
        />
      ) : null}
    </Stack>
  );
};

export default FetchBookBar;
