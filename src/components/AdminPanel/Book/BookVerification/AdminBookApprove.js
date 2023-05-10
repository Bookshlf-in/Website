import { React, useState, useContext } from "react";
import { AdminContext } from "../../../../context/adminContext";

// API
import axios from "../../../../api/axios";

// MUI Components
import { Button, CircularProgress } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

// icons
import CheckIcon from "@mui/icons-material/CheckCircle";

const AdminBookApprove = ({ bookId }) => {
  // Admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // Loading States
  const [approveLoad, setApproveLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [approved, setApproved] = useState(false);

  // approving books
  const handleApproveBook = () => {
    setApproveLoad(true);
    axios
      .post("/admin-approveBook", {
        bookId: bookId,
      })
      .then((response) => {
        setApproveLoad(false);
        setOpen(true);
        setApproved(true);
        setAdmin({
          ...admin,
          bookVerification: {
            ...admin.bookVerification,
            data: admin.bookVerification.data.filter(
              (book) => book._id !== bookId
            ),
          },
        });
        localStorage.setItem(
          "bookshlf_admin",
          JSON.stringify({
            ...admin,
            bookVerification: {
              ...admin.bookVerification,
              data: admin.bookVerification.data.filter(
                (book) => book._id !== bookId
              ),
            },
          })
        );
      })
      .catch((error) => {
        setApproveLoad(false);
        setOpen(true);
        setApproved(false);
        console.log(error.response.data);
      });
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="success"
        onClick={handleApproveBook}
        size="small"
        fullWidth
        variant="contained"
        sx={{ fontSize: "9px" }}
        startIcon={
          approveLoad ? (
            <CircularProgress size={12} color="inherit" />
          ) : (
            <CheckIcon sx={{ fontSize: "12px !important" }} />
          )
        }
      >
        Approve Book
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={() => setOpen(false)}
          severity={approved ? "success" : "error"}
          sx={{ width: "100%", fontSize: "12px" }}
          variant="filled"
        >
          {approved ? "Book approved successfully" : "Some error occured"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminBookApprove;
