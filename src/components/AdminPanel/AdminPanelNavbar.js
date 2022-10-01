import { React, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import { Stack, Paper, Divider } from "@mui/material";
import { Typography } from "@mui/material";

// icons
import OrderIcon from "@mui/icons-material/LocalShipping";
import ChatIcon from "@mui/icons-material/ChatRounded";
import ProfileIcon from "@mui/icons-material/AccountCircleRounded";
import SellersIcon from "@mui/icons-material/ContactMailRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletRounded";

// custom components
import Seller from "./Sellers";
import Orders from "./Orders";
import Messages from "./Messages";
import Profile from "./FindProfile";
import Users from "./Users";
import Wallet from "./Wallet";

// Custom Admin Sidebar Navbutton
const AdminNavButton = ({ Panel, setPanel, btnText, btnIcon, value }) => {
  const handleClick = () => {
    setPanel(value);
  };

  const activeClass = "adminPanel-navButton adminPanel-navButton-active";
  const nonActiveClass = "adminPanel-navButton";

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={2}
      className={Panel === value ? activeClass : nonActiveClass}
      onClick={handleClick}
    >
      {btnIcon}
      <Typography variant="body1">{btnText}</Typography>
    </Stack>
  );
};

// Admin Left Sidebar for Navigation
const AdminSidebar = ({ Panel, setPanel }) => {
  return (
    <Paper className="adminPanel-sidebar">
      <Stack
        justifyContent="center"
        alignItems="center"
        divider={
          <Divider
            className="adminPanel-sidebar-divider"
            orientation="horizontal"
            flexItem
          />
        }
      >
        <Stack
          className="adminPanel-sidebar-logo"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="/images/logo.png"
            alt="bookshlf"
            height="100%"
            width="auto"
          />
        </Stack>
        <Stack className="adminPanel-sidebar-Nav" spacing={1}>
          <AdminNavButton
            btnIcon={<OrderIcon sx={{ fontSize: "1em" }} />}
            btnText="Orders"
            Panel={Panel}
            setPanel={setPanel}
            value={0}
          />
          <AdminNavButton
            btnIcon={<ProfileIcon sx={{ fontSize: "1em" }} />}
            btnText="Find Profile"
            Panel={Panel}
            setPanel={setPanel}
            value={1}
          />
          <AdminNavButton
            btnIcon={<ChatIcon sx={{ fontSize: "1em" }} />}
            btnText="Messages"
            Panel={Panel}
            setPanel={setPanel}
            value={2}
          />
          <AdminNavButton
            btnIcon={<SellersIcon sx={{ fontSize: "1em" }} />}
            btnText="Seller"
            Panel={Panel}
            setPanel={setPanel}
            value={3}
          />
          <AdminNavButton
            btnIcon={<ProfileIcon sx={{ fontSize: "1em" }} />}
            btnText="User"
            Panel={Panel}
            setPanel={setPanel}
            value={4}
          />
          <AdminNavButton
            btnIcon={<WalletIcon sx={{ fontSize: "1em" }} />}
            btnText="Billing"
            Panel={Panel}
            setPanel={setPanel}
            value={5}
          />
          <AdminNavButton
            btnIcon={<HomeIcon sx={{ fontSize: "1em" }} />}
            btnText="Home"
            Panel={Panel}
            setPanel={setPanel}
            value={6}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

const AdminContentPanel = ({ Panel, setPanel, history }) => {
  if (Panel === 6) history.push("/");
  return (
    <Stack className="adminPanel-content">
      <Stack className="adminPanel-content-float">
        {Panel === 0 ? (
          <Orders />
        ) : Panel === 1 ? (
          <Profile />
        ) : Panel === 2 ? (
          <Messages />
        ) : Panel === 3 ? (
          <Seller />
        ) : Panel === 4 ? (
          <Users />
        ) : (
          <Wallet />
        )}
      </Stack>
    </Stack>
  );
};

const AdminNavbar = () => {
  const history = useHistory();
  const params = useParams();
  const [Panel, setPanel] = useState(params.panel);

  return (
    <Stack
      spacing={2}
      direction="row"
      className="adminPanel-container"
      justifyContent="flex-end"
    >
      <AdminSidebar Panel={Panel} setPanel={setPanel} />
      <AdminContentPanel Panel={Panel} setPanel={setPanel} history={history} />
    </Stack>
  );
};
export default AdminNavbar;
