import { React, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { debounce } from "../../api/debounce";

// Components
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { LinearProgress } from "@mui/material";
import { Stack } from "@mui/material";
import { DMsans } from "../../assets/Theme/fonts";
// Icons
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = () => {
  const navigate = useNavigate();

  // functionality states
  const [searchFieldChanges, setsearchFieldChanges] = useState(false);
  const [openTitleMenu, setOpenTitleMenu] = useState(false);

  // Data States
  const [Search, setSearch] = useState("");
  const [resulttitles, setresultTitles] = useState([]);

  // Search on Enter
  const handleKeyPress = (event) => {
    // event.preventDefault();
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/SearchResult/${Search === "" ? "tag:ALL" : Search}`);
    }
  };

  // book title search on input
  const handelBookTitleSearch = (e) => {
    const fetchdata = async () => {
      axios
        .get(`/searchTitle?q=${e.target.value}`)
        .then((response) => {
          setresultTitles(response.data);
          setsearchFieldChanges(false);
        })
        .catch((error) => {});
    };
    fetchdata();
  };

  const handleDebounceSearch = useCallback(debounce(handelBookTitleSearch), []);

  // Searching Title
  const handelTitleAdd = (titlename) => {
    setOpenTitleMenu(false);
    navigate(`/SearchResult/${titlename === "" ? "tag:ALL" : titlename}`);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
      className="search-bar-container"
    >
      {searchFieldChanges && (
        <div className="search-bar-progress">
          <LinearProgress color="inherit" sx={{ height: "1px" }} />
        </div>
      )}
      <InputBase
        placeholder="Search"
        sx={{
          width: "100%",
          color: "white !important",
          padding: "5px",
          fontFamily: DMsans,
          fontSize: "12px",
        }}
        onChange={(e) => {
          setsearchFieldChanges(true);
          setSearch(e.target.value);
          setOpenTitleMenu(true);
          handleDebounceSearch(e);
        }}
        onKeyPress={handleKeyPress}
      />
      <div className="navbar-search-icon">
        <SearchIcon />
      </div>
      <ClickAwayListener onClickAway={() => setOpenTitleMenu(false)}>
        {!openTitleMenu ? (
          <></>
        ) : (
          <div className="navbar-search-menu">
            {resulttitles.map((Title, idx) => (
              <MenuItem
                title={Title.title}
                key={idx}
                value={Title.title}
                onClick={() => handelTitleAdd(Title.title)}
                className="navbar-search-menuitem"
              >
                {Title.title}
              </MenuItem>
            ))}
          </div>
        )}
      </ClickAwayListener>
    </Stack>
  );
};
export default Searchbar;
