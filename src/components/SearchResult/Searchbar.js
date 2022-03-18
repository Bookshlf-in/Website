import { React, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import { Stack, InputBase, MenuItem, Chip } from "@mui/material";
import { ClickAwayListener, CircularProgress } from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles(() => ({
  stack: {
    width: "100%",
    "@media screen and (max-width:400px)": {
      display: "none",
    },
  },
  search: {
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #dfe1e5",
    borderRadius: "5px",
    "&:hover": {
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
      borderRadius: "5px",
      zIndex: 205,
    },
    marginLeft: 0,
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "10px",
  },
  searchTag: {
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #dfe1e5",
    borderRadius: "5px",
    "&:hover": {
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
      borderRadius: "5px",
      zIndex: 205,
    },
    marginLeft: 0,
    width: "100%",
    maxWidth: 350,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "10px",
  },
  searchIcon: {
    padding: "5px 10px",
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: "10px",
    width: "100%",
    fontSize: "12px !important",
  },
  searchTitleResult: {
    position: "absolute",
    left: "0px",
    top: "40px",
    backgroundColor: "white",
    zIndex: 200,
    maxHeight: 300,
    overflowY: "auto",
    boxShadow: "0 4px 6px rgb(32 33 36 / 28%)",
    borderRadius: "0px 0px 5px 5px",
    width: "100%",
    paddingLeft: "44px",
  },
  Li: {
    fontSize: "11px !important",
    fontFamily: "Montserrat",
    padding: "5px 0px !important",
    "@media screen and (max-width:600px)": {
      fontSize: "10px !important",
      padding: "5px 0px !important",
      minHeight: "0px !important",
    },
  },
}));

const Searchbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  // functionality states
  const [searchFieldChanges, setsearchFieldChanges] = useState(false);
  const [tagFieldChanges, settagFieldChanges] = useState(false);
  const [openTitleMenu, setOpenTitleMenu] = useState(false);
  const [openTagMenu, setOpenTagMenu] = useState(false);

  // Data States
  const [Search, setSearch] = useState(params.query);
  const [resulttitles, setresultTitles] = useState([]);
  const [resulttags, setresultTags] = useState([]);

  // Search on Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push(`/SearchResult/${Search === "" ? "tag:ALL" : Search}`);
    }
  };

  // book title search on input
  const handelBookTitleSearch = (e) => {
    setsearchFieldChanges(true);
    setSearch(e.target.value);
    setOpenTitleMenu(true);
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

  // tag searching on input
  const handelTagSearch = (e) => {
    settagFieldChanges(true);
    setSearch(e.target.value);
    setOpenTagMenu(true);
    const fetchdata = async () => {
      axios
        .get(`/searchTag?q=${e.target.value}`)
        .then((response) => {
          setresultTags(response.data);
          settagFieldChanges(false);
        })
        .catch((error) => {});
    };
    fetchdata();
  };

  // Searching Title
  const handelTitleAdd = (titlename) => {
    setOpenTitleMenu(false);
    setSearch(titlename);
    history.push(`/SearchResult/${titlename === "" ? "tag:ALL" : titlename}`);
  };

  // Searching Tags
  const handelTagAdd = (tagname) => {
    setOpenTagMenu(false);
    setSearch(tagname);
    history.push(`/SearchResult/tag:${tagname}`);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
      className={classes.stack}
      spacing={2}
    >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={Search}
          onChange={(e) => handelBookTitleSearch(e)}
          onKeyPress={handleKeyPress}
          inputProps={{ "aria-label": "search" }}
        />
        <ClickAwayListener onClickAway={() => setOpenTitleMenu(false)}>
          {openTitleMenu ? (
            <div className={classes.searchTitleResult}>
              {resulttitles.map((Title, idx) => (
                <MenuItem
                  title={Title.title}
                  key={idx}
                  value={Title.title}
                  onClick={() => handelTitleAdd(Title.title)}
                  className={classes.Li}
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
            <CircularProgress size={20} sx={{ color: "grey.500" }} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={classes.searchTag}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Tag Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={Search}
          onChange={(e) => handelTagSearch(e)}
          onKeyPress={handleKeyPress}
          inputProps={{ "aria-label": "search" }}
        />
        <ClickAwayListener onClickAway={() => setOpenTagMenu(false)}>
          {openTagMenu ? (
            <div className={classes.searchTitleResult}>
              {resulttags.map((Tag, idx) => (
                <MenuItem
                  title={Tag.tag}
                  key={idx}
                  value={Tag.tag}
                  onClick={() => handelTagAdd(Tag.tag)}
                  className={classes.Li}
                >
                  <Chip
                    label={Tag.tag}
                    size="small"
                    sx={{ cursor: "pointer", fontSize: "11px" }}
                  />
                </MenuItem>
              ))}
            </div>
          ) : (
            <></>
          )}
        </ClickAwayListener>
        {tagFieldChanges ? (
          <div>
            <CircularProgress size={20} sx={{ color: "grey.500" }} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Stack>
  );
};
export default Searchbar;
