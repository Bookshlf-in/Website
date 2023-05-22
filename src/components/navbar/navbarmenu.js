import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { AdminContext } from "../../context/adminContext";

// Components
import { Tooltip } from "@mui/material";
import { Stack, IconButton, Menu, MenuItem } from "@mui/material";

// Icons
import UserIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountIcon from "@mui/icons-material/AccountCircleTwoTone";
import OrderIcon from "@mui/icons-material/LocalShippingTwoTone";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import BookIcon from "@mui/icons-material/MenuBookTwoTone";
import SellBookIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import { userRoleCheck } from "../../assets/utils/commons";
import { Logout } from "../../service/auth/logout";

const NavbarMenu = () => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);
  const [, setAdmin] = useContext(AdminContext);

  const [anchorEl, setAnchorEl] = useState(null);

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

  const handelLogout = async () => {
    const response = await Logout();
    if (response.success) {
      setUser(null);
      setAdmin(null);
    }
  };

  // Custom Menu Item
  const MenuStack = ({ Icon, label, path }) => {
    return (
      <MenuItem onClick={() => handelNavigate(path)}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          className="nav-menu-item"
        >
          {Icon}
          <span>{label}</span>
        </Stack>
      </MenuItem>
    );
  };

  return (
    <Stack>
      <Tooltip title="Account" arrow>
        <IconButton onClick={handleClick}>
          <UserIcon sx={{ color: "#F4A946" }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="nav-menu"
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "16px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 2,
              left: 14,
              width: 12,
              height: 12,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuStack Icon={<AccountIcon />} label="Profile" path="/UserPanel/1" />
        <MenuStack Icon={<OrderIcon />} label="Orders" path="/UserPanel/2" />
        <MenuStack
          Icon={<BookIcon />}
          label="Your Books"
          path="/SellerPanel/2"
        />
        <MenuStack
          Icon={<SellBookIcon />}
          label="Sell Books"
          path="/SellerPanel/5"
        />
        {userRoleCheck(user, "admin") && (
          <MenuStack Icon={<AdminIcon />} label="Admin" path="/admin/0" />
        )}
        <MenuItem onClick={handelLogout} className="nav-menu-logout">
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            className="nav-menu-logout"
          >
            <LogoutIcon />
            <span>Logout</span>
          </Stack>
        </MenuItem>
      </Menu>
    </Stack>
  );
};
export default NavbarMenu;
