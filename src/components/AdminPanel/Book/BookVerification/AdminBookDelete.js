import { React, useState, useContext } from "react";
import { AdminContext } from "../../../../context/adminContext";

// API
import axios from "../../../../api/axios";

// MUI Components
import { IconButton, CircularProgress } from "@mui/material";

// icons
import DeleteIcon from "@mui/icons-material/Delete";

const AdminBookDelete = ({ bookId }) => {
  // Admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // Loading States
  const [deleteLoad, setDeleteLoad] = useState(false);

  // Deleting Books
  const handelDeleteBook = () => {
    setDeleteLoad(true);
    axios
      .delete("/admin-deleteBook", {
        data: {
          bookId: bookId,
          message: "Book is not appropriate and have many unavoidable errors",
        },
      })
      .then((response) => {
        console.log(response.data);
        setDeleteLoad(false);
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
        setDeleteLoad(false);
        console.log(error.response.data);
      });
  };

  return (
    <IconButton
      color="error"
      onClick={handelDeleteBook}
      size="small"
      sx={{ position: "absolute", right: 0, top: 0 }}
    >
      {deleteLoad ? (
        <CircularProgress size={15} color="inherit" />
      ) : (
        <DeleteIcon fontSize="1em" />
      )}
    </IconButton>
  );
};

export default AdminBookDelete;
