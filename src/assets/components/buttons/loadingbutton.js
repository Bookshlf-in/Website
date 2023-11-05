import { Button, CircularProgress } from "@mui/material";
const LoadingButton = ({ loading, size, children, ...props }) => {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      endIcon={
        loading ? (
          <CircularProgress size={size} color="inherit" />
        ) : (
          props.endIcon
        )
      }
      className="bookshlf-btn"
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
