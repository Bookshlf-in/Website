import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
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

const NotiBubble = {
  "& span": {
    fontFamily: "Roboto !important",
    fontSize: "9px",
  },
};

const Navbar = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);

  // Functionality States
  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <AppBar position="static" sx={NavStyle}>
      <Toolbar variant="dense">
        <div className="nav-mobile-item">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={() => setOpenSideNav((prev) => !prev)}
          >
            <Badge
              variant="dot"
              badgeContent={user?.cartitems + user?.wishlist > 0 ? 1 : 0}
              color="warning"
            >
              <MenuIcon />
            </Badge>
          </IconButton>
        </div>
        <div className="nav-mobile-item">
          <Drawer
            anchor="left"
            open={openSideNav}
            onClose={() => setOpenSideNav((prev) => !prev)}
            transitionDuration={500}
          >
            <SideNav />
          </Drawer>
        </div>
        <div className="nav-desktop-item">
          <img src="/images/bookshlf-2022-independence.gif" width="200px" />
        </div>
        <div className="nav-desktop-item">
          <NavbarItems />
        </div>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <NavbarSearch />
          <Stack direction="row" spacing={1} className="nav-desktop-item">
            <IconButton onClick={() => history.push("/Cart")} size="small">
              <Badge
                badgeContent={user?.cartitems}
                color="secondary"
                sx={NotiBubble}
              >
                <ShoppingCartIcon sx={NavIconStyle} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => history.push("/Wishlist")} size="small">
              <Badge
                badgeContent={user?.wishlist}
                color="secondary"
                sx={NotiBubble}
              >
                <FavoriteIcon sx={NavIconStyle} />
              </Badge>
            </IconButton>
            {user?.roles?.includes("seller") ? (
              <IconButton onClick={() => history.push("/Wallet")} size="small">
                <Badge
                  badgeContent={user?.balance}
                  color="warning"
                  max={9999}
                  showZero={true}
                  sx={NotiBubble}
                >
                  <AccountBalanceWalletIcon sx={NavIconStyle} />
                </Badge>
              </IconButton>
            ) : null}
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
                fontFamily: "Montserrat",
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
