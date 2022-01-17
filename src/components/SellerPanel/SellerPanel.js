import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LinearProgress from "@mui/material/LinearProgress";

// custom Components
import "./SellerPanel.css";
import AccountDetails from "./AccountDetails";
import Orders from "../Order/Orders";
import Address from "../AddressBook/Address";
import Reviews from "./SellerReviews";
import AddBook from "../Book/AddBook";
import Register from "./SellerRegister";

// icons
import OrderIcon from "@mui/icons-material/LocalShipping";
import ProfileIcon from "@mui/icons-material/AccountCircleRounded";
import SellersIcon from "@mui/icons-material/ContactMailRounded";
import ReviewIcon from "@mui/icons-material/RateReviewRounded";
import BookIcon from "@mui/icons-material/MenuBookRounded";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    fontSize: "12px !important",
    minHeight: "0px !important",
  },
});

const SellerPanel = () => {
  // context states
  const [user] = useContext(UserContext);

  // Hooks Call
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();

  // component states
  const [panel, setPanel] = useState(params.panel);
  const [role, setRole] = useState(false);

  // loader states
  const [Loading, setLoading] = useState(true);
  const [sellerDetails, setsellerDetails] = useState(null);
  const [Adr, setAdr] = useState(null);
  const [bookDetails, setbookDetails] = useState(null);
  const [sellerId, setsellerId] = useState(null);
  const [sellerReview, setsellerReview] = useState(null);
  const [commisionchart, setcommisionchart] = useState(null);

  // getting sellerDetails
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getSellerProfile")
        .then((response) => {
          setsellerDetails(response.data);
          setsellerId(response.data._id);
          if (user.roles.includes("seller")) setRole(true);
          axios
            .get("/getAddressList")
            .then((response) => {
              response.data.sort((a, b) => {
                return a.updatedAt < b.updatedAt
                  ? 1
                  : a.updatedAt > b.updatedAt
                  ? -1
                  : 0;
              });
              setAdr(response.data);
              axios
                .get("/getSellerReviews", {
                  params: sellerId,
                })
                .then((response) => {
                  setsellerReview(response.data);
                  axios
                    .get("/getCommissionChart", {
                      params: sellerId,
                    })
                    .then((response) => {
                      setcommisionchart(response.data);
                      setLoading(false);
                    })
                    .catch((error) => {
                      setLoading(false);
                    });
                })
                .catch((error) => {
                  setLoading(false);
                });
            })
            .catch((error) => {
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleChange = (event, newValue) => {
    history.push(`/SellerPanel/${newValue}`);
    setPanel(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        minHeight: "calc(100vh - 56px)",
      }}
      className="sellerPanel-container"
    >
      {Loading ? (
        <LinearProgress sx={{ width: "100%" }} />
      ) : role === false || user === null ? (
        <Register />
      ) : (
        <TabContext value={panel}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="admin-tabList"
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
                label="Books"
                icon={<OrderIcon />}
                value="2"
                className={classes.root}
              />
              <Tab
                iconPosition="start"
                label="Address"
                icon={<SellersIcon />}
                value="3"
                className={classes.root}
              />
              <Tab
                iconPosition="start"
                label="Reviews"
                icon={<ReviewIcon />}
                value="4"
                className={classes.root}
              />
              <Tab
                iconPosition="start"
                label="Add Book"
                icon={<BookIcon />}
                value="5"
                className={classes.root}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AccountDetails seller={sellerDetails} />
          </TabPanel>
          <TabPanel value="2">
            <Orders address={Adr} />
          </TabPanel>
          <TabPanel value="3">
            <Address address={Adr} />
          </TabPanel>
          <TabPanel value="4">
            <Reviews reviews={sellerReview} sellerId={sellerId} />
          </TabPanel>
          <TabPanel value="5">
            <AddBook address={Adr} commisionChart={commisionchart} />
          </TabPanel>
        </TabContext>
      )}
    </Box>
  );
};
export default SellerPanel;
