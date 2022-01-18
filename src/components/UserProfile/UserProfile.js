import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";
import axios from "../../axios";
import "./UserProfile.css";

// Components
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

// Custom Components
import Account from "./Account";
import CurrentOrder from "../Order/CurrentOrders";
import PreviousOrder from "../Order/PreviousOrders";
import Address from "../AddressBook/Address";

// icons
import OrderIcon from "@mui/icons-material/LocalShipping";
import ProfileIcon from "@mui/icons-material/AccountCircleRounded";
import BookIcon from "@mui/icons-material/MenuBookRounded";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans !important",
    fontSize: "12px !important",
    minHeight: "0px !important",
  },
}));

const UserProfile = () => {
  // context states
  const [user] = useContext(UserContext);

  // Hooks Call
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  // component states
  const [load, setLoad] = useState(true);
  const [panel, setPanel] = useState(params.panel);
  const [userprofile, setuserprofile] = useState({});
  const [activeOrders, setactiveOrders] = useState([]);
  const [pastOrders, setpastOrders] = useState([]);
  const [Adr, setAdr] = useState([]);

  useEffect(() => {
    const Fetch = () => {
      axios.get("/getUserProfile").then((response) => {
        setuserprofile(response.data);
        axios.get("/getOrderList").then((response) => {
          setactiveOrders(
            response.data.filter((order) => {
              return (
                order.status[order.status.length - 1] !== "Cancelled" &&
                order.status[order.status.length - 1] !== "Delivered"
              );
            })
          );
          setpastOrders(
            response.data.filter((order) => {
              return (
                order.status[order.status.length - 1] === "Cancelled" ||
                order.status[order.status.length - 1] === "Delivered"
              );
            })
          );
          axios.get("/getAddressList").then((response) => {
            response.data.sort((a, b) => {
              return a.updatedAt < b.updatedAt
                ? 1
                : a.updatedAt > b.updatedAt
                ? -1
                : 0;
            });
            setAdr(response.data);
            setLoad(false);
          });
        });
      });
    };
    if (user) {
      Fetch();
    }
  }, []);

  // Changing Panel
  const handleChange = (event, newValue) => {
    history.push(`/UserPanel/${newValue}`);
    setPanel(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Profile | Bookshlf</title>
      </Helmet>
      {user ? (
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            minHeight: "calc(100vh - 56px)",
          }}
          className="userPanel-container"
        >
          {load ? (
            <LinearProgress sx={{ width: "100%" }} />
          ) : (
            <TabContext value={panel}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="user-tabList"
                  variant="fullWidth"
                  selectionFollowsFocus
                >
                  <Tab
                    iconPosition="start"
                    label="Profile"
                    icon={<ProfileIcon />}
                    value="1"
                    className={classes.root}
                  />
                  <Tab
                    iconPosition="start"
                    label="Active Orders"
                    icon={<OrderIcon color="warning" />}
                    value="2"
                    className={classes.root}
                  />
                  <Tab
                    iconPosition="start"
                    label="Past Orders"
                    icon={<OrderIcon color="success" />}
                    value="3"
                    className={classes.root}
                  />
                  <Tab
                    iconPosition="start"
                    label="Address Book"
                    icon={<BookIcon />}
                    value="4"
                    className={classes.root}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Account user={userprofile} />
              </TabPanel>
              <TabPanel value="2">
                <CurrentOrder orders={activeOrders} />
              </TabPanel>
              <TabPanel value="3">
                <PreviousOrder orders={pastOrders} />
              </TabPanel>
              <TabPanel value="4">
                <Address address={Adr} />
              </TabPanel>
            </TabContext>
          )}
        </Box>
      ) : (
        <Alert severity="error" className={classes.root}>
          Please Login
        </Alert>
      )}
    </>
  );
};
export default UserProfile;
