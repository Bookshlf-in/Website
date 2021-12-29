import { React, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// Components
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// icons
import OrderIcon from "@material-ui/icons/LocalShipping";
import ChatIcon from "@material-ui/icons/ChatRounded";
import ProfileIcon from "@material-ui/icons/AccountCircleRounded";
import SellersIcon from "@material-ui/icons/ContactMailRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import WalletIcon from "@material-ui/icons/AccountBalanceWalletRounded";

// custom components
import Seller from "./Sellers";
import Orders from "./Orders";
import Messages from "./Messages";
import Profile from "./FindProfile";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    backgroundColor: "rgba(0,0,0,0.06) !important",
    "&:hover": {
      color: "black !important",
      backgroundColor: "skyblue",
    },
  },
});

const AdminNavbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const [panel, setpanel] = useState(params.panel);

  const handleChange = (event, newValue) => {
    if (newValue === "6") {
      history.push("/");
    } else {
      history.push(`/Admin/${newValue}`);
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
          >
            <Tab
              label="Orders"
              icon={<OrderIcon />}
              value="1"
              className={classes.root}
            />
            <Tab
              label="Find Profile"
              icon={<ProfileIcon />}
              value="2"
              className={classes.root}
            />
            <Tab
              label="Messages"
              icon={<ChatIcon />}
              value="3"
              className={classes.root}
            />
            <Tab
              label="Sellers"
              icon={<SellersIcon />}
              value="4"
              className={classes.root}
            />
            <Tab
              label="Wallet"
              icon={<WalletIcon />}
              value="5"
              className={classes.root}
            />
            <Tab
              label="Home"
              icon={<HomeIcon />}
              value="6"
              className={classes.root}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Orders />
        </TabPanel>
        <TabPanel value="2">
          <Profile />
        </TabPanel>
        <TabPanel value="3">
          <Messages />
        </TabPanel>
        <TabPanel value="4">
          <Seller />
        </TabPanel>
        <TabPanel value="5">Wallet to be Added</TabPanel>
      </TabContext>
    </Box>
  );
};
export default AdminNavbar;
