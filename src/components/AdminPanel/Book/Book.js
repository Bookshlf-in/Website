import { useState } from "react";

// custom Styling
import "./Book.css";

// MUI Components
import { AppBar, Toolbar } from "@mui/material";
import { Stack, Typography } from "@mui/material";

// custom Components
import SellerBooks from "./SellerBooks";
import BookVerification from "./BookVerification/BookVerification";
import AdminFindBook from "./AdminFindBook";
import BookshlfImageUploadUtility from "./ImageUploadUtility";

const BookNavButton = ({ panel, setPanel, btnTxt, value }) => {
  const handleClick = () => {
    setPanel(value);
  };
  return (
    <Stack
      className={
        panel === value
          ? "AdminBookNav-btn AdminBookNav-btn-active"
          : "AdminBookNav-btn"
      }
      onClick={handleClick}
    >
      <Typography sx={{ fontFamily: "PT sans" }} variant="caption">
        {btnTxt}
      </Typography>
    </Stack>
  );
};

const BookNavBar = ({ panel, setPanel }) => {
  return (
    <AppBar position="static" className="AdminBookNav">
      <Toolbar variant="dense">
        <BookNavButton
          panel={panel}
          setPanel={setPanel}
          btnTxt="Book Verification"
          value={0}
        />
        <BookNavButton
          panel={panel}
          setPanel={setPanel}
          btnTxt="Seller Books"
          value={1}
        />
        <BookNavButton
          panel={panel}
          setPanel={setPanel}
          btnTxt="Find Book"
          value={2}
        />
        <BookNavButton
          panel={panel}
          setPanel={setPanel}
          btnTxt="Image Upload"
          value={3}
        />
      </Toolbar>
    </AppBar>
  );
};

const AdminBook = () => {
  const [panel, setPanel] = useState(0);
  return (
    <Stack spacing={1}>
      <BookNavBar panel={panel} setPanel={setPanel} />
      {panel === 0 ? (
        <BookVerification />
      ) : panel === 1 ? (
        <SellerBooks />
      ) : panel === 2 ? (
        <AdminFindBook />
      ) : panel === 3 ? (
        <BookshlfImageUploadUtility />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default AdminBook;
