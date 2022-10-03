import { React, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Custom Components
import OrderDetails from "./OrderDetails";
import UpdateOrder from "./UpdateOrder";

const Orders = () => {
  const params = useParams();
  const history = useHistory();
  const [panel, setpanel] = useState(params.subpanel);

  const handleChange = (event, newValue) => {
    history.push(`/Admin/1/${newValue}`);
    setpanel(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={panel}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="admin-tabList"
            variant="fullWidth"
            sx={{ minHeight: 0 }}
          >
            <Tab label="Order Details" value="1" />
            <Tab label="Find Order" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OrderDetails />
        </TabPanel>
        <TabPanel value="2">
          <UpdateOrder />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Orders;
