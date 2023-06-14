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
    <div className="search-book-img-container">
      <Tooltip arrow title={title}>
        <img
          className="search-book-img"
          src={photo}
          alt={title}
          loading="lazy"
        />
      </Tooltip>
    </div>
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
  return (
    <Typography variant="h6" className="searchbook-pricetag">
      Rs. {price}/-
    </Typography>
  );
};

const SearchBook = ({ book }) => {
  return (
    <Link to={`/bookdetails/${book._id}`}>
      <Box className="search-book">
        <BookImage title={book.title} photo={book.photo} />
        <Stack
          sx={{ width: "100%", height: "100%" }}
          spacing={{ xs: 0, sm: 1, md: 1, lg: 1 }}
          justifyContent="space-between"
        >
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
    </Link>
  );
};

export default SearchBook;
