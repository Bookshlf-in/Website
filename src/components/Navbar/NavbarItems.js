import React from "react";

// Components
import { Button, Stack } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import AllBookIcon from "@mui/icons-material/Language";
import BookIcon from "@mui/icons-material/MenuBookRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import SupportIcon from "@mui/icons-material/SupportAgentRounded";

const NavButtonStyle = {
  color: "white",
  fontSize: "10px",
  fontFamily: "PT sans",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
};

const NavbarItems = () => {
  return (
    <Stack direction="row" spacing={2} sx={{ ml: 5 }}>
      <Button startIcon={<HomeIcon />} href="/" sx={NavButtonStyle}>
        Home
      </Button>
      <Button
        startIcon={<AllBookIcon />}
        href="/SearchResult/tag:ALL"
        sx={NavButtonStyle}
      >
        All&nbsp;Books
      </Button>
      <Button
        startIcon={<BookIcon />}
        href="/SellerPanel/5"
        sx={NavButtonStyle}
      >
        Sell&nbsp;Books
      </Button>
      <Button
        startIcon={<SupportIcon />}
        href="/SellerPanel/5"
        sx={NavButtonStyle}
      >
        Your&nbsp;Books
      </Button>
      <Button startIcon={<InfoIcon />} href="/About" sx={NavButtonStyle}>
        About&nbsp;Us
      </Button>
      <Button startIcon={<SupportIcon />} href="/Contact" sx={NavButtonStyle}>
        Contact&nbsp;Us
      </Button>
    </Stack>
  );
};

export default NavbarItems;
