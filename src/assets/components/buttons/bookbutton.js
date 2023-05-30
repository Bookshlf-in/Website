import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const BookButton = ({ book, ...props }) => {
  const navigate = useNavigate();
  return (
    <Button
      {...props}
      className="search-book-btn"
      onClick={() => navigate(`/Checkout/${book._id}`)}
    >
      {props.children}
    </Button>
  );
};

export default BookButton;
