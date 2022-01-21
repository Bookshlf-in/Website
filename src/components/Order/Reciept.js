import { React } from "react";

// Mui Components
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const Reciept = (props) => {
  //   console.log(props);

  // Creating Reciept
  const CreatReciept = () => {
    //
  };
  // order.status[order.status.length - 1]
  return (
    <Button
      endIcon={<DownloadIcon />}
      color="secondary"
      variant="outlined"
      sx={{ fontFamily: "PT sans" }}
      onClick={CreatReciept}
    >
      Download Invoice
    </Button>
  );
};
export default Reciept;
