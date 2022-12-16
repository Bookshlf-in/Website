import { React, useState, useEffect, createContext } from "react";

const booksperpage =
  window.innerWidth <= 400
    ? 5
    : window.innerWidth <= 800
    ? 9
    : window.innerWidth <= 1200
    ? 12
    : 18;

const localSearch = {
  books: [],
  page: 1,
  totalPages: 0,
  filter: 0,
  filterParams: {
    q: "",
    noOfBooksInOnePage: booksperpage,
    page: 1,
  },
};

export const SearchContext = createContext();

export const CurrentSearchProvider = (props) => {
  const [search, setSearch] = useState(
    JSON.parse(localStorage.getItem("bookshlf_search")) || localSearch
  );

  useEffect(() => {
    localStorage.setItem("bookshlf_search", JSON.stringify(search));
  }, [search]);

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {props.children}
    </SearchContext.Provider>
  );
};
