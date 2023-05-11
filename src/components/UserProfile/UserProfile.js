import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "../../api/axios";

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

const TabStyle = {
  fontFamily: "Roboto !important",
  fontWeight: "bold",
  fontSize: "10px !important",
  minHeight: "0px !important",
  minWidth: "0px !important",
  "@media screen and (max-width:600px)": {
    "& svg": {
      height: 12,
      width: 12,
    },
    fontSize: "9px !important",
    backgroundColor: "rgba(0,0,0,0.2) !important",
  },
};

const UserProfile = () => {
  // context states
  const [user] = useContext(UserContext);

  // Hooks Call
  const navigate = useNavigate();
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
    navigate(`/UserPanel/${newValue}`);
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
                    iconPosition="top"
                    label="Profile"
                    icon={<ProfileIcon sx={{ height: 16, width: 16 }} />}
                    value="1"
                    sx={TabStyle}
                  />
                  <Tab
                    iconPosition="top"
                    label="Active Orders"
                    icon={
                      <OrderIcon
                        color="warning"
                        sx={{ height: 16, width: 16 }}
                      />
                    }
                    value="2"
                    sx={TabStyle}
                  />
                  <Tab
                    iconPosition="top"
                    label="Past Orders"
                    icon={
                      <OrderIcon
                        color="success"
                        sx={{ height: 16, width: 16 }}
                      />
                    }
                    value="3"
                    sx={TabStyle}
                  />
                  <Tab
                    iconPosition="top"
                    label="Address Book"
                    icon={<BookIcon sx={{ height: 16, width: 16 }} />}
                    value="4"
                    sx={TabStyle}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Account user={userprofile} />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: "15px 10px" }}>
                <CurrentOrder orders={activeOrders} />
              </TabPanel>
              <TabPanel value="3" sx={{ padding: "15px 10px" }}>
                <PreviousOrder orders={pastOrders} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: "15px 10px" }}>
                <Address address={Adr} />
              </TabPanel>
            </TabContext>
          )}
        </Box>
      ) : (
        <Alert severity="error">Please Login</Alert>
      )}
    </>
  );
};
export default UserProfile;
