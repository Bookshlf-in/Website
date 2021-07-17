import {React, useState, useEffect} from "react";
import "./UserProfile.css";
import Account from "./Account";
import CurrentOrder from "./CurrentOrders";
import PreviousOrder from "./PreviousOrders";
import axios from "../../axios";

const UserProfile = () => {
  const [userprofile, setuserprofile] = useState(null);
  const [orders, setorders] = useState(null);
  const [panel, setpanel] = useState(1);
  const [load, setload] = useState(true);

  useEffect(() => {
    axios
      .get("/getUserProfile")
      .then((response) => {
        // console.log(response.data);
        setuserprofile(response.data);
        axios
          .get("/getOrderList")
          .then((response) => {
            // console.log(response.data);
            setorders(response.data);
            setload(false);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div className="user-profile-main">
      {/* Hide this navbar when someone without login views this prfile */}
      <div className="user-profile-navbar">
        <div className="Account-details" onClick={() => setpanel(1)}>
          <i className="fas fa-info-circle" />
          &nbsp;&nbsp;Account Details
        </div>
        <br />
        <div className="Pending-orders" onClick={() => setpanel(2)}>
          <i className="fas fa-clipboard-list" />
          &nbsp;&nbsp;Active&nbsp;Orders
        </div>
        <br />
        <div className="Completed-orders" onClick={() => setpanel(3)}>
          <i className="fas fa-clipboard-check" />
          &nbsp;&nbsp;Previous&nbsp;Orders
        </div>
      </div>
      <div
        className="page-loader"
        style={{display: load ? "flex" : "none", height: "auto"}}
      >
        <div
          className="page-loading"
          style={{display: load ? "block" : "none"}}
        ></div>
      </div>
      <div className="Panel" style={{display: load ? "none" : "block"}}>
        {panel === 1 && userprofile ? (
          <Account user={userprofile} />
        ) : panel === 2 && orders ? (
          <CurrentOrder orders={orders} />
        ) : panel === 3 && orders ? (
          <PreviousOrder />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
