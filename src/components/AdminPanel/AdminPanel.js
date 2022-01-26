import { React, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet-async";
import "./AdminPanel.css";

// Components
import AdminNavbar from "./AdminPanelNavbar";
import { Alert, AlertTitle } from "@mui/material";

const AdminPanel = () => {
  const [user] = useContext(UserContext);
  return (
    <>
      <Helmet>
        <title>Admin Panel | Bookshlf</title>
      </Helmet>
      <div className="adminpanel-container">
        {user && user.roles?.includes("admin") ? (
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
    </>
  );
};
export default AdminPanel;
