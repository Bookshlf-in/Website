import {React, useState, useEffect, useContext} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {UserContext} from "../../Context/userContext";
import "./AdminPanel.css";
import Seller from "./Sellers";
import Orders from "./Orders";
import Messages from "./Messages";
import Profile from "./FindProfile";

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
                <i class="fas fa-truck" />
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
                <i class="fas fa-comments" />
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
                <i class="fas fa-user-circle" />
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
                <i class="fas fa-user-tie" />
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

// - Admin-Panel Navbar : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=0%3A1

// - Orders Component Navbar : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=104%3A23

// - Orders Component Order Details :
// https:www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A29
// - Orders Component Seller Books : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A127https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A29

// - Orders Component Book Verification : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A72

// Find Profile Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A176

// Messages Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A193

// Sellers Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A216

// Add new Book Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A247

// Admin Panel
// 	AdminPanel.js
// 	AdminPanel.css (all CSS here only)
// 	Orders.js
// 	Sellers.js
// 	FindProfile.js
// 	Messages.js
