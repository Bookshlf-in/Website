import { React, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

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
import NavLink from "../../assets/components/links/navlink";

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

const isLocationAuth = (pathname) => {
  if (pathname.startsWith("/auth")) return true;
  return false;
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
        <IconButton onClick={() => navigate("/Cart")} size="small">
          <Badge
            badgeContent={user?.cartitems}
            color="secondary"
            sx={NotiBubble}
          >
            <ShoppingCartIcon sx={NavIconStyle} />
          </Badge>
        </IconButton>
        <IconButton onClick={() => navigate("/Wishlist")} size="small">
          <Badge
            badgeContent={user?.wishlist}
            color="secondary"
            sx={NotiBubble}
          >
            <FavoriteIcon sx={NavIconStyle} />
          </Badge>
        </IconButton>
        {user?.roles?.includes("seller") && (
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

  // Functionality States
  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <AppBar position="static" className="navbar">
      <Toolbar variant="regular" sx={{ height: "100%" }}>
        {!isLocationAuth(location.pathname) && (
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
        )}
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
