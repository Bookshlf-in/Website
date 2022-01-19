import { React, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios.js";

// Components
import { Stack, IconButton, Menu, MenuItem, Avatar } from "@mui/material";

// Icons
import AccountIcon from "@mui/icons-material/AccountCircleTwoTone";
import OrderIcon from "@mui/icons-material/LocalShippingTwoTone";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import CartIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WishlistIcon from "@mui/icons-material/FavoriteTwoTone";
import BookIcon from "@mui/icons-material/MenuBookTwoTone";
import LogoutIcon from "@mui/icons-material/ExitToAppTwoTone";

// Custom Menu Item Stack
const MenuStack = (props) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      sx={{
        "& svg": {
          height: 15,
          width: 15,
        },
        "& div": {
          fontFamily: "PT sans",
          fontSize: "12px",
        },
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        {props.icon}
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        {props.label}
      </Stack>
    </Stack>
  );
};

const NavbarMenu = () => {
  const history = useHistory();

  const [user, setUser] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logLoad, setLogLoad] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelNavigate = (path) => {
    setAnchorEl(null);
    history.push(path);
  };

  const handelLogout = () => {
    setLogLoad(true);
    axios
      .get("/signOut")
      .then((response) => {
        localStorage.removeItem("bookshlf_user");
        localStorage.removeItem("bookshlf_user_AddBook");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        history.go(0);
        setLogLoad(false);
      })
      .catch((error) => {
        setLogLoad(false);
      });
  };

  return (
    <Stack>
      <IconButton onClick={handleClick} size="small">
        <Avatar
          src="/images/user.png"
          alt="My Account"
          sx={{ height: 20, width: 20 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="sidenav-menu"
      >
        <MenuItem onClick={() => handelNavigate("/UserPanel/1")}>
          <MenuStack icon={<AccountIcon color="primary" />} label="Profile" />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/UserPanel/2")}>
          <MenuStack icon={<OrderIcon color="primary" />} label="Orders" />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/SellerPanel/2")}>
          <MenuStack icon={<BookIcon color="success" />} label="Your Books" />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/SellerPanel/5")}>
          <MenuStack icon={<BookIcon color="success" />} label="Sell Books" />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/Admin/1")}>
          <MenuStack icon={<AdminIcon color="error" />} label="Admin" />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/Wallet")}>
          <MenuStack
            icon={<WalletIcon color="secondary" />}
            label={"Wallet (" + user?.balance + ")"}
          />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/Cart")}>
          <MenuStack
            icon={<CartIcon color="secondary" />}
            label={"Cart (" + user?.cartitems + ")"}
          />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/Wishlist")}>
          <MenuStack
            icon={<WishlistIcon color="secondary" />}
            label={"Wishlist (" + user?.wishlist + ")"}
          />
        </MenuItem>
        <MenuItem onClick={handelLogout}>
          <MenuStack
            icon={<LogoutIcon color="error" />}
            label={logLoad ? "Logging Out..." : "Logout"}
          />
        </MenuItem>
      </Menu>
    </Stack>
  );
};
export default NavbarMenu;
