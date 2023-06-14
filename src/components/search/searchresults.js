import { Grid } from "@mui/material";
import SearchBook from "./searchbook";

const SearchResult = ({ books }) => {
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      justifyContent="center"
    >
      {books.map((book) => {
        return (
          <Grid item xs={6} sm={4} md={3} key={book._id}>
            <SearchBook book={book} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchResult;
