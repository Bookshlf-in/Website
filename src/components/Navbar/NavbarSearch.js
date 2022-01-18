import { React, useState } from "react";
import { useHistory } from "react-router-dom";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const NavbarSearch = () => {
  const history = useHistory();
  const [Search, setSearch] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push(`/SearchResult/${Search === "" ? "tag:ALL" : Search}`);
    }
  };

  return (
    <InputBase
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      onChange={(e) => setSearch(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};
export default NavbarSearch;
