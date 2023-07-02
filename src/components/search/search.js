import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./search.css";

// Components
import { Stack } from "@mui/material";

// Custom Components
import Container from "../../assets/components/container";
import SearchFilter from "./searchfilter";
import SearchResult from "./searchresults";
import Pagination from "./pagination";
import BookshlfLoader from "../MicroComponents/BookshlfLoader";

// Services
import { StringtoObject } from "../../assets/utils/commons";
import { BookSearch, BooksPerPage } from "../../service/search/booksearch";

const Search = () => {
  // Calling Hooks
  const { query, filters, page = 1 } = useParams();

  // Functionality States
  const [loading, setLoading] = useState(false);

  // Data states
  const [books, setbooks] = useState([]);
  const [totalPages, settotalPages] = useState(1);

  useEffect(() => {
    const makeRequest = async () => {
      setLoading(true);
      const response = await BookSearch({
        ...StringtoObject(filters),
        q: query,
        noOfBooksInOnePage: BooksPerPage(),
        page: Number(page),
      });
      if (response.success) {
        setbooks(response.data.data);
        settotalPages(response.data.totalPages);
      }
      setLoading(false);
    };
    makeRequest();
  }, [query, page, filters]);

  return (
    <Container title="Search | Bookshlf">
      <Stack className="search-container">
        <SearchFilter page={Number(page)} totalPages={totalPages} />
        {loading && <BookshlfLoader />}
        {!loading && <SearchResult books={books} />}
        {!loading && <Pagination page={Number(page)} totalPages={totalPages} />}
      </Stack>
    </Container>
  );
};

export default Search;
