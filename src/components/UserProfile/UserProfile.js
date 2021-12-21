import { React, useState, useEffect, useContext } from "react";
import "./UserProfile.css";
import { UserContext } from "../../Context/userContext";
import { useParams, useHistory } from "react-router-dom";
import Account from "./Account";
import CurrentOrder from "../Order/CurrentOrders";
import PreviousOrder from "../Order/PreviousOrders";
import Address from "../AddressBook/Address";
import axios from "../../axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "20px",
  },
}));

const UserProfile = () => {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [user, setUser] = useContext(UserContext);

  const [userprofile, setuserprofile] = useState(null);
  const [panel, setpanel] = useState(params.panel);
  const [load, setload] = useState(true);
  const [activeOrders, setactiveOrders] = useState(null);
  const [pastOrders, setpastOrders] = useState(null);
  const [Adr, setAdr] = useState(null);

  useEffect(() => {
    axios
      .get("/getUserProfile")
      .then((response) => {
        setuserprofile(response.data);
        axios
          .get("/getOrderList")
          .then((response) => {
            if (response.data) {
              setactiveOrders(
                response.data.filter((order) => {
                  return (
                    order.status[order.status.length - 1] !== "Cancelled" &&
                    order.status[order.status.length - 1] !== "Delivered"
                  );
                })
              );
              setpastOrders(
                response.data
                  .filter((order) => {
                    return (
                      order.status[order.status.length - 1] === "Cancelled" ||
                      order.status[order.status.length - 1] === "Delivered"
                    );
                  })
                  .reverse()
              );
            }
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
                setload(false);
              })
              .catch(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {user ? (
        <div className="user-profile-main">
          <div className="user-profile-navbar">
            <div
              className="Account-details"
              onClick={() => {
                setpanel("1");
                history.push("/UserProfile/1");
              }}
              style={
                panel === "1"
                  ? { borderBottom: "2px solid black" }
                  : { borderBottom: "2px solid aliceblue" }
              }
            >
              <i className="fas fa-info-circle" />
              &nbsp;&nbsp;Account Details
            </div>
            <div
              className="Pending-orders"
              onClick={() => {
                setpanel("2");
                history.push("/UserProfile/2");
              }}
              style={
                panel === "2"
                  ? { borderBottom: "2px solid black" }
                  : { borderBottom: "2px solid aliceblue" }
              }
            >
              <i className="fas fa-clipboard-list" />
              &nbsp;&nbsp;Active&nbsp;Orders
            </div>
            <div
              className="Completed-orders"
              onClick={() => {
                setpanel("3");
                history.push("/UserProfile/3");
              }}
              style={
                panel === "3"
                  ? { borderBottom: "2px solid black" }
                  : { borderBottom: "2px solid aliceblue" }
              }
            >
              <i className="fas fa-clipboard-check" />
              &nbsp;&nbsp;Previous&nbsp;Orders
            </div>
            <div
              className="Completed-orders"
              onClick={() => {
                setpanel("4");
                history.push("/UserProfile/4");
              }}
              style={
                panel === "4"
                  ? { borderBottom: "2px solid black" }
                  : { borderBottom: "2px solid aliceblue" }
              }
            >
              <i className="fas fa-map-marker" />
              &nbsp;&nbsp;Address
            </div>
          </div>
          <div
            className="page-loader"
            style={{ display: load ? "flex" : "none", height: "400px" }}
          >
            <CircularProgress style={{ height: "80px", width: "80px" }} />
          </div>
          <div
            className="Panel"
            style={{
              display: load ? "none" : "block",
              minHeight: "calc(100vh - 139px)",
              width: "100%",
            }}
          >
            {panel === "1" && userprofile ? (
              <Account user={userprofile} />
            ) : panel === "2" && activeOrders ? (
              <CurrentOrder orders={activeOrders} />
            ) : panel === "3" && pastOrders ? (
              <PreviousOrder orders={pastOrders} />
            ) : panel === "4" && Adr ? (
              <Address address={Adr} />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className={classes.root}>
          <Alert
            variant="outlined"
            severity="error"
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "16px",
              color: "red",
              width: "250px",
            }}
          >
            Please Login <i className="far fa-frown" />
          </Alert>
        </div>
      )}
    </>
  );
};
export default UserProfile;
