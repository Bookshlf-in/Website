import { React, useState, useContext } from "react";
import { AdminContext } from "../../../../Context/adminContext";

// MUI Components
import { Stack, Button, TextField } from "@mui/material";

// Custom Components
import BookDetails from "./BookVerification/BookDetails";

const AdminFindBook = () => {
  // admin Context
  const [admin, setAdmin] = useContext(AdminContext);

  // States
  const [bookId, setBookId] = useState(admin?.AdminFindBook?.bookId);
  const [getBook, setGetBook] = useState(false);

  const handleGetBook = () => {
    setGetBook(true);
    setAdmin({
      ...admin,
      AdminFindBook: { ...admin.AdminFindBook, bookId: bookId },
    });
    localStorage.setItem(
      "bookshlf_admin",
      JSON.stringify({
        ...admin,
        AdminFindBook: { ...admin.AdminFindBook, bookId: bookId },
      })
    );
  };
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2} direction="row">
        <TextField
          color="primary"
          size="small"
          label="Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          sx={{ minWidth: 300 }}
        />
        <Button variant="outlined" size="small" onClick={handleGetBook}>
          Get Book
        </Button>
      </Stack>
      {getBook ? <BookDetails bookId={bookId} /> : null}
    </Stack>
  );
};
export default AdminFindBook;
