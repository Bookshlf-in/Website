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
    fontSize: "10px !important",
    minHeight: "0px !important",
  },
  Button: {
    fontFamily: "Roboto !important",
    fontWeight: "bold",
    fontSize: "10px !important",
    minHeight: "0px !important",
    minWidth: "0px !important",
    padding: "0px !important",
    "@media screen and (max-width:600px)": {
      "& svg": {
        height: 12,
        width: 12,
      },
      fontSize: "9px !important",
      backgroundColor: "rgba(0,0,0,0.2) !important",
    },
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

  // loader states
  const [Loading, setLoading] = useState(true);
  const [sellerDetails, setsellerDetails] = useState(null);
  const [Adr, setAdr] = useState(null);
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
          axios
            .get("/getAddressList")
            .then((response) => {
              setAdr(
                response.data.sort((a, b) => {
                  return a.updatedAt < b.updatedAt
                    ? 1
                    : a.updatedAt > b.updatedAt
                    ? -1
                    : 0;
                })
              );
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

  useEffect(() => {
    setPanel(params.panel);
  }, [params.panel]);

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
      ) : !user?.roles?.includes("seller") || !user ? (
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
                iconPosition="top"
                label="Profile"
                icon={<ProfileIcon sx={{ height: 16, width: 16 }} />}
                value="1"
                className={classes.Button}
              />
              <Tab
                iconPosition="top"
                label="Books"
                icon={<OrderIcon sx={{ height: 16, width: 16 }} />}
                value="2"
                className={classes.Button}
              />
              <Tab
                iconPosition="top"
                label="Address"
                icon={<SellersIcon sx={{ height: 16, width: 16 }} />}
                value="3"
                className={classes.Button}
              />
              <Tab
                iconPosition="top"
                label="Reviews"
                icon={<ReviewIcon sx={{ height: 16, width: 16 }} />}
                value="4"
                className={classes.Button}
              />
              <Tab
                iconPosition="top"
                label="Add Book"
                icon={<BookIcon sx={{ height: 16, width: 16 }} />}
                value="5"
                className={classes.Button}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: "15px 10px" }}>
            <AccountDetails seller={sellerDetails} panel={panel} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "15px 10px" }}>
            <Orders address={Adr} panel={panel} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: "15px 10px" }}>
            <Address address={Adr} panel={panel} />
          </TabPanel>
          <TabPanel value="4" sx={{ padding: "15px 10px" }}>
            <Reviews reviews={sellerReview} sellerId={sellerId} panel={panel} />
          </TabPanel>
          <TabPanel value="5" sx={{ padding: "15px 10px" }}>
            <AddBook
              address={Adr}
              commisionChart={commisionchart}
              panel={panel}
            />
          </TabPanel>
        </TabContext>
      )}
    </Box>
  );
};
export default SellerPanel;
