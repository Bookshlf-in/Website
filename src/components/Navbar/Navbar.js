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
    fontFamily: "PT sans !important",
    fontSize: "9px",
  },
};

const Navbar = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  // Functionality States
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    // getting count of Items
    const FetchCountAPI = () => {
      axios.get("/countWishlistItems").then((wishlist) => {
        axios.get("/countCartItems").then((cart) => {
          axios.get("/getCurrentBalance").then((balance) => {
            localStorage.setItem(
              "bookshlf_user",
              JSON.stringify({
                ...user,
                cartitems: cart.data.count,
                wishlist: wishlist.data.count,
                balance: Math.round(balance.data.walletBalance * 10) / 10,
              })
            );
            setUser({
              ...user,
              cartitems: cart.data.count,
              wishlist: wishlist.data.count,
              balance: Math.round(balance.data.walletBalance * 10) / 10,
            });
            // console.log(wishlist.data, cart.data, balance.data);
          });
        });
      });
    };
    if (user) {
      FetchCountAPI();
    }
  }, []);

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
            <Badge
              variant="dot"
              badgeContent={user?.cartitems + user?.wishlist}
              color="warning"
            >
              <MenuIcon />
            </Badge>
          </IconButton>
        </div>
        <div className="nav-mobile-item">
          <Drawer
            ancher="left"
            open={openSideNav}
            onClose={() => setOpenSideNav((prev) => !prev)}
            transitionDuration={500}
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
            <IconButton onClick={() => history.push("/Cart")}>
              <Badge
                badgeContent={user?.cartitems}
                color="secondary"
                sx={NotiBubble}
              >
                <ShoppingCartIcon sx={NavIconStyle} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => history.push("/Wishlist")}>
              <Badge
                badgeContent={user?.wishlist}
                color="secondary"
                sx={NotiBubble}
              >
                <FavoriteIcon sx={NavIconStyle} />
              </Badge>
            </IconButton>
            {user?.roles?.includes("seller") ? (
              <IconButton onClick={() => history.push("/Wallet")}>
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
