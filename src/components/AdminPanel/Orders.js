import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Components
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Custom Components
import BookVerification from "./BookVerification";
import OrderDetails from "./OrderDetails";
import SellerBooks from "./SellerBooks";
import UpdateOrder from "./UpdateOrder";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    color: "green !important",
    "&:hover": {
      color: "black !important",
      backgroundColor: "skyblue",
    },
  },
});

const Orders = () => {
  const classes = useStyles();
  const [panel, setpanel] = useState("1");
  const handleChange = (event, newValue) => {
    setpanel(newValue);
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
            <Tab label="Book Verification" value="1" className={classes.root} />
            <Tab label="Order Details" value="2" className={classes.root} />
            <Tab label="Update Order" value="3" className={classes.root} />
            <Tab label="Seller Books" value="4" className={classes.root} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BookVerification />
        </TabPanel>
        <TabPanel value="2">
          <OrderDetails />
        </TabPanel>
        <TabPanel value="3">
          <UpdateOrder />
        </TabPanel>
        <TabPanel value="4">
          <SellerBooks />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Orders;
