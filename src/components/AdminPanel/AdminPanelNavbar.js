import { React, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

// Components
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    backgroundColor: "rgba(0,0,0,0.06) !important",
    "&:hover": {
      color: "black !important",
      backgroundColor: "skyblue",
    },
    "&.MuiTab-root": {
      padding: "10px",
      minHeight: 0,
      fontSize: "12px",
    },
  },
});

const AdminNavbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const [panel, setpanel] = useState(params.panel);

  const handleChange = (event, newValue) => {
    if (newValue === "7") {
      history.push("/");
    } else {
      history.push(`/Admin/${newValue}/1`);
      setpanel(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={panel}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="admin-tabList"
            variant="fullWidth"
            sx={{ minHeight: 0 }}
          >
            <Tab
              label="Orders"
              icon={<OrderIcon sx={{ height: 16, width: 16 }} />}
              iconPosition="start"
              value="1"
              className={classes.root}
            />
            <Tab
              label="Find Profile"
              icon={<ProfileIcon sx={{ height: 16, width: 16 }} />}
              iconPosition="start"
              value="2"
              className={classes.root}
            />
            <Tab
              label="Messages"
              icon={<ChatIcon sx={{ height: 16, width: 16 }} />}
              iconPosition="start"
              value="3"
              className={classes.root}
            />
            <Tab
              label="Sellers Verification"
              icon={<SellersIcon sx={{ height: 16, width: 16 }} />}
              iconPosition="start"
              value="4"
              className={classes.root}
            />
            <Tab
              label="Users"
              icon={<ProfileIcon sx={{ height: 16, width: 16 }} />}
              iconPosition="start"
              value="5"
              className={classes.root}
            />
            <Tab
              label="Wallet"
              icon={<WalletIcon sx={{ height: 16, width: 16 }} />}
              iconPosition="start"
              value="6"
              className={classes.root}
            />
            <Tab
              label="Home"
              icon={<HomeIcon sx={{ height: 16, width: 16 }} />}
              iconPosition="start"
              value="7"
              className={classes.root}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: "12px" }}>
          <Orders />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: "12px" }}>
          <Profile />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: "12px" }}>
          <Messages />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: "12px" }}>
          <Seller />
        </TabPanel>
        <TabPanel value="5" sx={{ padding: "12px" }}>
          <Users />
        </TabPanel>
        <TabPanel value="6" sx={{ padding: "12px" }}>
          <Wallet />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default AdminNavbar;
