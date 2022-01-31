import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Mui Components
import Drawer from "@mui/material/Drawer";
import { Stack, Typography, Button } from "@mui/material";

// Icons
import RightIcon from "@mui/icons-material/ArrowRightAltRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

const Style = {
  fontSize: "12px",
  fontFamily: "Roboto",
  color: "#fff",
  "@media screen and (max-width:600px)": {
    fontSize: "10px",
  },
};
const TopNotification = () => {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("bookshlf_top_notify")) {
      setOpen(false);
    } else {
      sessionStorage.setItem("bookshlf_top_notify", true);
      setOpen(true);
    }
  }, []);
  return (
    <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
      <Stack
        sx={{
          backgroundColor: "#ef5a43",
          width: "100%",
          padding: "10px 24px",
          position: "relative",
        }}
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        spacing={2}
        alignItems="center"
      >
        <Typography sx={Style} variant="body2">
          Buy Books
        </Typography>
        <RightIcon sx={Style} />
        <Typography sx={Style} variant="body2">
          Get Into IIT/AIIMS
        </Typography>
        <RightIcon sx={Style} />
        <Typography sx={Style} variant="body2">
          Get 100% Refund on Return of Books
        </Typography>
        <Button
          size="small"
          sx={{
            backgroundColor: "#333",
            color: "white",
            fontFamily: "Roboto",
            "&:hover": {
              backgroundColor: "#111",
            },
          }}
          onClick={() => {
            setOpen(false);
            history.push("/SearchResult/tag:ALL");
          }}
        >
          Buy Now
        </Button>
        <CloseIcon
          sx={{
            position: "absolute",
            cursor: "pointer",
            right: "24px",
            height: 16,
            width: 16,
          }}
          onClick={() => setOpen(false)}
        />
      </Stack>
    </Drawer>
  );
};
export default TopNotification;
