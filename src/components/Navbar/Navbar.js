import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios.js";

// importing Navbar Components
import "./Navbar.css";
import NavbarMenu from "./NavMenu";
import NavbarItems from "./NavbarItems";
import SideNav from "./Sidenav.js";
import NavbarSearch from "./NavbarSearch";

// importing Material UI components
import { AppBar, Toolbar, Stack, Drawer } from "@mui/material";
import { Button, IconButton, Badge } from "@mui/material";

// Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuIcon from "@mui/icons-material/Menu";

const NavStyle = {
  background:
    "linear-gradient(90deg, rgb(17, 16, 16) 0%, rgb(63, 62, 62) 100%)",
};

const NavIconStyle = {
  color: "white",
  height: 20,
  width: 20,
};
const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  // Functionality States
  const [openSideNav, setOpenSideNav] = useState(false);

  // Data States
  const [cartCnt, setCartCnt] = useState(0);
  const [wishlistCnt, setwishlistCnt] = useState(0);
  const [walletbalance, setwalletbalance] = useState(0);

  // /countWishlistItems, /countCartItems, /getCurrentBalance

  return (
    <AppBar position="sticky" sx={NavStyle}>
      <Toolbar variant="dense">
        <div className="nav-mobile-item">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={() => setOpenSideNav((prev) => !prev)}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className="nav-mobile-item">
          <Drawer
            ancher="left"
            open={openSideNav}
            onClose={() => setOpenSideNav((prev) => !prev)}
          >
            <SideNav />
          </Drawer>
        </div>
        <div className="nav-desktop-item">
          <img src="/images/logo.png" width="120px" />
        </div>
        <div className="nav-desktop-item">
          <NavbarItems />
        </div>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <NavbarSearch />
          <Stack direction="row" spacing={2} className="nav-desktop-item">
            <IconButton>
              <Badge badgeContent={cartCnt} color="primary">
                <ShoppingCartIcon sx={NavIconStyle} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={wishlistCnt} color="primary">
                <FavoriteIcon sx={NavIconStyle} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={walletbalance} color="primary">
                <AccountBalanceWalletIcon sx={NavIconStyle} />
              </Badge>
            </IconButton>
          </Stack>

          {user ? (
            <NavbarMenu />
          ) : (
            <Button
              variant="contained"
              size="small"
              href="/Login"
              color="success"
              sx={{
                fontFamily: "PT sans",
                fontSize: "10px",
                letterSpacing: "1px",
              }}
            >
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
