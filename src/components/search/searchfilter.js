import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography, Divider } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Custom Components
import BottomPagination from "./bottompagination";

const FILTERS = [
  "sortByPrice=asc",
  "sortByPrice=desc",
  "sortByDate=desc",
  "sortByDate=asc",
];

const isPresent = (arr, filter) => {
  return arr.includes(filter);
};

const deleteParam = (filterArray, param) => {
  return filterArray.filter((p) => p !== param);
};

const handleFilters = (filters) => {
  if (filters === undefined || filters === "") return ["default"];
  return filters.split("&");
};

const SearchFilter = ({ page, totalPages }) => {
  const navigate = useNavigate();
  const { query, filters } = useParams();
  const [filter, setFilter] = useState(handleFilters(filters));
  const resolveParam = async (param) => {
    if (
      (isPresent(param, "default") && !isPresent(filter, "default")) ||
      param.length === 0
    ) {
      param = ["default"];
    } else if (isPresent(param, "default") && isPresent(filter, "default")) {
      param = deleteParam(param, "default");
    }

    if (isPresent(param, FILTERS[0]) && isPresent(param, FILTERS[1])) {
      // when selecting price filter
      if (isPresent(filter, FILTERS[1])) param = deleteParam(param, FILTERS[1]);
      else param = deleteParam(param, FILTERS[0]);
    }

    if (isPresent(param, FILTERS[2]) && isPresent(param, FILTERS[3])) {
      // when selecting date filter
      if (isPresent(filter, FILTERS[2])) param = deleteParam(param, FILTERS[2]);
      else param = deleteParam(param, FILTERS[3]);
    }

    return param;
  };

  const handleChange = async (e) => {
    let param = e.target.value;
    const finalParam = await resolveParam(param);
    setFilter(finalParam);
    navigate(`/search/${query}/${finalParam.join("&")}`);
  };

  useEffect(() => {
    if (filters === undefined) navigate(`/search/${query}/default`);
    setFilter(handleFilters(filters));
  }, [query, filters]);

  return (
    <Stack className="search-filter" spacing={1}>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="space-between"
      >
        <FormControl fullWidth>
          <InputLabel id="search-filter-input-label">Filter</InputLabel>
          <Select
            labelId="search-filter-input-label"
            id="search-filter-select"
            value={filter}
            label="Filter"
            onChange={handleChange}
            multiple
          >
            <MenuItem value="default">Default</MenuItem>
            <Divider />
            <MenuItem value={FILTERS[0]}>
              <Typography variant="caption">Price Low to High</Typography>
            </MenuItem>
            <MenuItem value={FILTERS[1]}>
              <Typography variant="caption">Price High to Low</Typography>
            </MenuItem>
            <Divider />
            <MenuItem value={FILTERS[2]}>
              <Typography variant="caption">Newest First</Typography>
            </MenuItem>
            <MenuItem value={FILTERS[3]}>
              <Typography variant="caption">Oldest First</Typography>
            </MenuItem>
          </Select>
        </FormControl>
        <BottomPagination page={page} totalPages={totalPages} />
      </Stack>

      <Divider />
    </Stack>
  );
};

export default SearchFilter;
