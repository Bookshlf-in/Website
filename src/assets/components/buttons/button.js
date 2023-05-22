import { Button } from "@mui/material";

const SimpleButton = (props) => {
  return (
    <Button {...props} className="bookshlf-btn">
      {props.children}
    </Button>
  );
};

export default SimpleButton;
