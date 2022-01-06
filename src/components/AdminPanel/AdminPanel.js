import { React, useState, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import "./AdminPanel.css";

// Components
import AdminNavbar from "./AdminPanelNavbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AdminPanel = () => {
  const [user] = useContext(UserContext);
  const [Admin] = useState(user ? user.roles.includes("admin") : false);
  return (
    <div className="adminpanel-container">
      {Admin ? (
        <AdminNavbar />
      ) : (
        <Alert
          severity="error"
          style={{ fontFamily: "PT sans", width: "100%" }}
        >
          <AlertTitle style={{ fontFamily: "PT sans" }}>
            Access Denied
          </AlertTitle>
          You are Unauthorized to Access this Domain.
          <br />
          Contact Admin for More Details
        </Alert>
      )}
    </div>
  );
};
export default AdminPanel;
