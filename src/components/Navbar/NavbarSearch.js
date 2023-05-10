import { React, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { debounce } from "../../api/debounce";

// Components
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

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
    <Stack direction="row" alignItems="center" spacing={1}>
      <div>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        sx={{
          width: "100%",
          color: "white !important",
          padding: "5px",
        }}
        onChange={(e) => {
          setsearchFieldChanges(true);
          setSearch(e.target.value);
          setOpenTitleMenu(true);
          handleDebounceSearch(e);
        }}
        onKeyPress={handleKeyPress}
        inputProps={{ "aria-label": "search" }}
      />
      <ClickAwayListener onClickAway={() => setOpenTitleMenu(false)}>
        {openTitleMenu ? (
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "34px",
              backgroundColor: "white",
              zIndex: 200,
              maxHeight: 300,
              overflowY: "auto",
              overflowX: "hidden",
              boxShadow: "0 4px 6px rgb(32 33 36 / 28%)",
              borderRadius: "0px 0px 5px 5px",
              width: "100%",
              paddingLeft: "34px",
            }}
          >
            {resulttitles.map((Title, idx) => (
              <MenuItem
                title={Title.title}
                key={idx}
                value={Title.title}
                onClick={() => handelTitleAdd(Title.title)}
                sx={{
                  color: "rgb(40,40,40)",
                  fontFamily: "Montserrat",
                  fontSize: "10px !important",
                  padding: "5px 0px !important",
                  "@media screen and (max-width:600px)": {
                    fontSize: "10px !important",
                    padding: "5px 0px !important",
                    minHeight: "0px !important",
                  },
                }}
              >
                {Title.title}
              </MenuItem>
            ))}
          </div>
        ) : (
          <></>
        )}
      </ClickAwayListener>
      {searchFieldChanges ? (
        <div>
          <CircularProgress size={15} sx={{ color: "grey.500" }} />
        </div>
      ) : (
        <></>
      )}
    </Stack>
  );
};
export default Searchbar;
