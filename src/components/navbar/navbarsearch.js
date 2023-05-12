import { React, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../api/debounce";

// Components
import { InputBase, MenuItem, ClickAwayListener } from "@mui/material";
import { LinearProgress, Stack } from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Service
import { BookSearch } from "../../service/search/booksearch";

const NavProgress = () => {
  return (
    <div className="search-bar-progress">
      <LinearProgress color="inherit" sx={{ height: "1px" }} />
    </div>
  );
};

const NavIcon = ({ navigate, search }) => {
  return (
    <div
      className="navbar-search-icon"
      onClick={() => navigate(`/SearchResult/${search}`)}
    >
      <SearchIcon />
    </div>
  );
};

const Searchbar = () => {
  const navigate = useNavigate();

  // functionality states
  const [searchFieldChanges, setsearchFieldChanges] = useState(false);
  const [openTitleMenu, setOpenTitleMenu] = useState(false);

  // Data States
  const [Search, setSearch] = useState("");
  const [resultTitles, setresultTitles] = useState([]);

  // Search on Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOpenTitleMenu(false);
      navigate(`/SearchResult/${Search === "" ? "tag:ALL" : Search}`);
    }
  };

  // book title search on input
  const handelBookTitleSearch = async (title) => {
    const response = await BookSearch(title);
    if (response.success) {
      setresultTitles(response.data);
      setsearchFieldChanges(false);
    }
  };

  const DebounceSearch = useCallback(debounce(handelBookTitleSearch), []);

  // Searching Title
  const handelTitleAdd = (title) => {
    setOpenTitleMenu(false);
    setSearch(title);
    navigate(`/SearchResult/${title}`);
  };

  // Handle Change
  const handleChange = (e) => {
    setsearchFieldChanges(true);
    setSearch(e.target.value);
    setOpenTitleMenu(true);
    DebounceSearch(e.target.value);
  };

  return (
    <Stack direction="row" className="search-bar-container">
      {searchFieldChanges && <NavProgress />}
      <InputBase
        placeholder="Search"
        className="nav-search-input"
        value={Search}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <NavIcon navigate={navigate} search={Search} />
      <ClickAwayListener onClickAway={() => setOpenTitleMenu(false)}>
        {openTitleMenu ? (
          <div className="navbar-search-menu">
            {resultTitles.map((book, idx) => (
              <MenuItem
                title={book.title}
                key={idx}
                value={book.title}
                onClick={() => handelTitleAdd(book.title)}
                className="navbar-search-menuitem"
              >
                {book.title}
              </MenuItem>
            ))}
          </div>
        ) : (
          <></>
        )}
      </ClickAwayListener>
    </Stack>
  );
};
export default Searchbar;
