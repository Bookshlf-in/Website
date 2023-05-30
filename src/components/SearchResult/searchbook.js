import { Link } from "react-router-dom";

// Mui Components
import { Box, Stack, Typography, Tooltip } from "@mui/material";

// assets
import BookButton from "../../assets/components/buttons/bookbutton";
import WishlistButton from "../../assets/components/buttons/wishlistbutton";
import CartButton from "../../assets/components/buttons/cartbutton";

// services
import { trimText } from "../../assets/utils/commons";

const BookImage = ({ photo, title }) => {
  return (
    <Tooltip arrow title={title}>
      <img className="search-book-img" src={photo} alt={title} loading="lazy" />
    </Tooltip>
  );
};

const BookTitle = ({ title }) => {
  return (
    <Typography variant="body1" className="search-book-title">
      {trimText(title, 60)}
    </Typography>
  );
};

const BookPriceTag = ({ price }) => {
  return <Typography variant="h6">Rs. {price}/-</Typography>;
};

const SearchBook = ({ book }) => {
  return (
    <Box className="search-book">
      <Link to={`/bookdetails/${book._id}`}>
        <BookImage title={book.title} photo={book.photo} />
      </Link>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <BookTitle title={book.title} />
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent="space-between"
        >
          <BookPriceTag price={book.price} />
          <WishlistButton book={book} size="small" fontSize="1em" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <CartButton book={book} />
          <BookButton fullWidth book={book}>
            Buy
          </BookButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchBook;
