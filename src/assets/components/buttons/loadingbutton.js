import { Button, CircularProgress } from "@mui/material";
const LoadingButton = ({ loading, size, children, ...props }) => {
  return (
    <Button
      {...props}
      disabled={loading}
      endIcon={
        loading ? <CircularProgress size={size} color="inherit" /> : <></>
      }
      className="bookshlf-btn"
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
