import { React, useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import "./AdminPanel.css";
import Seller from "./Sellers";
import Orders from "./Orders";
import Messages from "./Messages";
import Profile from "./FindProfile";
import axios from "../../axios";

const active = {
  color: " black",
  backgroundColor: "rgb(233, 232, 232)",
  borderTop: "5px solid green",
};

const AdminPanel = () => {
  const [user, setUser] = useContext(UserContext);
  const [Admin, setAdmin] = useState(
    user ? user.roles.includes("admin") : false
  );
  const history = useHistory();
  const params = useParams();
  const [panel, setpanel] = useState(params.panel);

  return (
    <div>
      {Admin ? (
        <div className="adminpanel-container">
          <ul className="adminpanel-bar">
            <Link
              to="/Admin/1"
              onClick={() => {
                setpanel("1");
              }}
              style={panel === "1" ? active : {}}
            >
              <li className="adminpanel-orders">
                <i className="fas fa-truck" />
                &nbsp;Orders
              </li>
            </Link>
            <Link
              to="/Admin/2"
              onClick={() => {
                setpanel("2");
              }}
              style={panel === "2" ? active : {}}
            >
              <li className="adminpanel-messages">
                <i className="fas fa-comments" />
                &nbsp;Messages
              </li>
            </Link>
            <Link
              to="/Admin/3"
              onClick={() => {
                setpanel("3");
              }}
              style={panel === "3" ? active : {}}
            >
              <li className="adminpanel-find-profile">
                <i className="fas fa-user-circle" />
                &nbsp;Find Profile
              </li>
            </Link>
            <Link
              to="/Admin/4"
              onClick={() => {
                setpanel("4");
              }}
              style={panel === "4" ? active : {}}
            >
              <li className="adminpanel-sellers">
                <i className="fas fa-user-tie" />
                &nbsp;Sellers
              </li>
            </Link>
            <Link to="/">
              <li className="adminpanel-sellers">
                <i className="fas fa-home" />
                &nbsp;Home
              </li>
            </Link>
          </ul>
          {panel === "1" ? (
            <Orders />
          ) : panel === "2" ? (
            <Messages />
          ) : panel === "3" ? (
            <Profile />
          ) : (
            <Seller />
          )}
        </div>
      ) : (
        <h1
          align="center"
          style={{
            color: "red",
            marginTop: "50px",
          }}
        >
          Access Denied! (You are not an Admin)
        </h1>
      )}
    </div>
  );
};

export default AdminPanel;
