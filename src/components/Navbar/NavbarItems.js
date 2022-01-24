import React from "react";
import { useHistory } from "react-router-dom";
// Components
import { Button, Stack } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import AllBookIcon from "@mui/icons-material/Language";
import BookIcon from "@mui/icons-material/MenuBookRounded";

const NavButtonStyle = {
  color: "white",
  fontSize: "9px",
  fontFamily: "PT sans",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
};

const NavbarItems = () => {
  const history = useHistory();
  return (
    <Stack direction="row" spacing={1} sx={{ ml: 3 }}>
      <Button
        startIcon={<HomeIcon sx={{ height: 15, width: 15 }} />}
        onClick={() => history.push("/")}
        sx={NavButtonStyle}
      >
        Home
      </Button>
      <Button
        startIcon={<AllBookIcon sx={{ height: 15, width: 15 }} />}
        onClick={() => history.push("/SearchResult/tag:ALL")}
        sx={NavButtonStyle}
      >
        All&nbsp;Books
      </Button>
      <Button
        startIcon={<BookIcon sx={{ height: 15, width: 15 }} />}
        onClick={() => history.push("/SellerPanel/5")}
        sx={NavButtonStyle}
      >
        Sell&nbsp;Books
      </Button>
      <Button
        startIcon={<BookIcon sx={{ height: 15, width: 15 }} />}
        onClick={() => history.push("/SellerPanel/2")}
        sx={NavButtonStyle}
      >
        Your&nbsp;Books
      </Button>
    </Stack>
  );
};

export default NavbarItems;
