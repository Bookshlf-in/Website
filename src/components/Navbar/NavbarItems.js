import React from "react";
import { Link } from "react-router-dom";
// Components
import { Button, Stack } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import AllBookIcon from "@mui/icons-material/Language";
import BookIcon from "@mui/icons-material/MenuBookRounded";
import SellBookIcon from "@mui/icons-material/ShoppingBag";

const NavButtonStyle = {
  color: "white",
  fontSize: "9px",
  fontFamily: "Montserrat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  lineHeight: 1,
  letterSpacing: "0.08em",
};

const NavbarItems = () => {
  return (
    <Stack direction="row" spacing={1} sx={{ ml: 3 }}>
      <Link to="/">
        <Button
          startIcon={<HomeIcon sx={{ height: 15, width: 15 }} />}
          sx={NavButtonStyle}
        >
          Home
        </Button>
      </Link>
      <Link to="/SearchResult/tag:ALL">
        <Button
          startIcon={<AllBookIcon sx={{ height: 15, width: 15 }} />}
          sx={NavButtonStyle}
        >
          All&nbsp;Books
        </Button>
      </Link>
      <Link to="/SellerPanel/5">
        <Button
          startIcon={<SellBookIcon sx={{ height: 15, width: 15 }} />}
          sx={NavButtonStyle}
        >
          Sell&nbsp;Books
        </Button>
      </Link>
      <Link to="/SellerPanel/2">
        <Button
          startIcon={<BookIcon sx={{ height: 15, width: 15 }} />}
          sx={NavButtonStyle}
        >
          Your&nbsp;Books
        </Button>
      </Link>
    </Stack>
  );
};

export default NavbarItems;
