import { React, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Helmet } from "react-helmet-async";

// Custom CSS
import "./AdminPanel.css";

// Components
import { Box } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import Navigation from "./Navigation/AdminPanelNavbar";

const AdminPanel = () => {
  const [user] = useContext(UserContext);
  return (
    <>
      <Helmet>
        <title>Admin Panel | Bookshlf</title>
      </Helmet>
      <Box>
        {user && user.roles?.includes("admin") ? (
          <Navigation />
        ) : (
          <Alert severity="error">
            <AlertTitle>
              <strong>Access Denied</strong>
            </AlertTitle>
            You are Unauthorized to Access this Domain. Contact Admin for More
            Details
          </Alert>
        )}
      </Box>
    </>
  );
};
export default AdminPanel;
