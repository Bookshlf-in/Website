import { React, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

// importing Navbar Components
import "./navbar.css";
import NavbarMenu from "./navbarmenu";
import NavbarItems from "./navbarlinks";
import SideNav from "./sidenav.js";
import NavbarSearch from "./navbarsearch";

// importing Material UI components
import { AppBar, Toolbar, Stack, Tooltip } from "@mui/material";
import { Button, IconButton, Badge } from "@mui/material";

// Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NavLink from "../../assets/components/links/navlink";

import { isLocationAuth } from "../../assets/utils/commons";

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

const AuthNavItem = ({ pathname }) => {
  const activePath = pathname.split("/")[2];
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ flexGrow: 1 }}
      alignItems="center"
      justifyContent="flex-end"
    >
      <NavLink path="/" name="Home" />
      <NavLink path={pathname} name={activePath} active={true} />
    </Stack>
  );
};

const NavMenuBase = ({ user, navigate }) => {
  return (
    <Stack className="nav-menu-base" justifyContent="center">
      {user ? (
        <NavbarMenu />
      ) : (
        <Button
          className="navbar-login-btn"
          variant="outlined"
          size="small"
          color="success"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </Button>
      )}
    </Stack>
  );
};

const NavBarIconItems = ({ user, navigate }) => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Stack
        direction="row"
        spacing={1}
        className="nav-desktop-item"
        justifyContent="center"
      >
        <Tooltip arrow title="Cart">
          <IconButton onClick={() => navigate("/Cart")} size="small">
            <Badge
              badgeContent={user?.cartitems}
              color="secondary"
              sx={NotiBubble}
            >
              <ShoppingCartIcon sx={NavIconStyle} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip arrow title="Wishlist">
          <IconButton onClick={() => navigate("/Wishlist")} size="small">
            <Badge
              badgeContent={user?.wishlist}
              color="secondary"
              sx={NotiBubble}
            >
              <FavoriteIcon sx={NavIconStyle} />
            </Badge>
          </IconButton>
        </Tooltip>

        {user?.roles?.includes("seller") && (
          <Tooltip arrow title="Wallet">
            <IconButton onClick={() => navigate("/Wallet")} size="small">
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
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
};

const BaseNavItem = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      className="navbar-base-items"
    >
      <NavbarSearch />
      <div className="nav-base-links nav-desktop-item">
        <NavbarItems />
      </div>
      <NavBarIconItems user={user} navigate={navigate} />
      <NavMenuBase user={user} navigate={navigate} />
    </Stack>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [user] = useContext(UserContext);

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar variant="regular" sx={{ height: "100%" }}>
        {!isLocationAuth(location.pathname) && (
          <div className="nav-mobile-item">
            <SideNav />
          </div>
        )}

        {(isLocationAuth(location.pathname) || window.innerWidth >= 996) && (
          <div className="nav-logo">
            <Link to="/">
              <img src="/images/logo.png" alt="Bookshlf" />
            </Link>
          </div>
        )}
        {isLocationAuth(location.pathname) ? (
          <AuthNavItem pathname={location.pathname} />
        ) : (
          <BaseNavItem user={user} />
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
