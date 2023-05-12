import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { AdminContext } from "../../context/adminContext";
import axios from "../../api/axios";

// Components
import { Stack, IconButton, Menu, MenuItem } from "@mui/material";

// Icons
import UserIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountIcon from "@mui/icons-material/AccountCircleTwoTone";
import OrderIcon from "@mui/icons-material/LocalShippingTwoTone";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import CartIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WishlistIcon from "@mui/icons-material/FavoriteTwoTone";
import BookIcon from "@mui/icons-material/MenuBookTwoTone";
import LogoutIcon from "@mui/icons-material/ExitToAppTwoTone";
import InfoIcon from "@mui/icons-material/InfoRounded";
import SupportIcon from "@mui/icons-material/SupportAgentRounded";
import SellBookIcon from "@mui/icons-material/ShoppingBag";

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
          fontFamily: "Roboto",
          fontWeight: "bold",
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
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);
  const [, setAdmin] = useContext(AdminContext);

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
    navigate(path);
  };

  const handelLogout = () => {
    setLogLoad(true);
    axios
      .get("/signOut")
      .then(() => {
        navigate(0);
        setLogLoad(false);
        setUser(null);
        setAdmin(null);
        localStorage.removeItem("bookshlf_user");
        localStorage.removeItem("bookshlf_user_AddBook");
        delete axios.defaults.headers.common["Authorization"];
      })
      .catch((error) => {
        setLogLoad(false);
      });
  };

  return (
    <Stack>
      <IconButton onClick={handleClick} size="small">
        <UserIcon sx={{ color: "#F4A946" }} />
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
          <MenuStack
            icon={<SellBookIcon color="success" />}
            label="Sell Books"
          />
        </MenuItem>
        {user?.roles?.includes("admin") ? (
          <MenuItem onClick={() => handelNavigate("/Admin/0")}>
            <MenuStack icon={<AdminIcon color="error" />} label="Admin" />
          </MenuItem>
        ) : null}
        {user?.balance ? (
          <MenuItem onClick={() => handelNavigate("/Wallet")}>
            <MenuStack
              icon={<WalletIcon color="secondary" />}
              label={"Wallet (" + user?.balance + ")"}
            />
          </MenuItem>
        ) : null}
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
        <MenuItem onClick={() => handelNavigate("/About")}>
          <MenuStack icon={<InfoIcon />} label="About Us" />
        </MenuItem>
        <MenuItem onClick={() => handelNavigate("/Contact")}>
          <MenuStack icon={<SupportIcon />} label="Contact Us" />
        </MenuItem>
        <MenuItem
          onClick={handelLogout}
          sx={{
            backgroundColor: "rgb(211, 49, 49, 0.7) !important",
            color: "white",
            letterSpacing: "0.08em",
          }}
        >
          <MenuStack
            icon={<LogoutIcon />}
            label={logLoad ? "Logging Out..." : "Logout"}
          />
        </MenuItem>
      </Menu>
    </Stack>
  );
};
export default NavbarMenu;