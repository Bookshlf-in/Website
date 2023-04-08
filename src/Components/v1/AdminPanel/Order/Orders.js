import { useState, useContext } from "react";
import { AdminContext } from "../../../../Context/adminContext";

// custom Styling
import "./Order.css";

// MUI Components
import { AppBar, Toolbar } from "@mui/material";
import { Stack, Typography } from "@mui/material";

// custom Components
import AdminOrderList from "./AdminOrderList";
import AdminFindOrder from "./AdminFindOrder";
import AdminPlaceOrder from "./AdminPlaceOrder";
const BookNavButton = ({ panel, setPanel, btnTxt, value, setAdmin, admin }) => {
  const handleClick = () => {
    setPanel(value);
    setAdmin({
      ...admin,
      order: {
        ...admin.order,
        panel: value,
      },
    });
    localStorage.setItem(
      "bookshlf_admin",
      JSON.stringify({
        ...admin,
        order: {
          ...admin.order,
          panel: value,
        },
      })
    );
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

const BookNavBar = ({ panel, setPanel, setAdmin, admin }) => {
  return (
    <AppBar position="static" className="AdminBookNav">
      <Toolbar variant="dense">
        <BookNavButton
          panel={panel}
          setPanel={setPanel}
          btnTxt="Order List"
          value={0}
          setAdmin={setAdmin}
          admin={admin}
        />
        <BookNavButton
          panel={panel}
          setPanel={setPanel}
          btnTxt="Find Order"
          value={1}
          setAdmin={setAdmin}
          admin={admin}
        />
        <BookNavButton
          panel={panel}
          setPanel={setPanel}
          btnTxt="Place Order"
          value={2}
          setAdmin={setAdmin}
          admin={admin}
        />
      </Toolbar>
    </AppBar>
  );
};

const AdminBook = () => {
  // admin Context
  const [admin, setAdmin] = useContext(AdminContext);
  const [panel, setPanel] = useState(admin.order?.panel);

  return (
    <Stack spacing={1}>
      <BookNavBar
        panel={panel}
        setPanel={setPanel}
        setAdmin={setAdmin}
        admin={admin}
      />
      {panel === 0 ? (
        <AdminOrderList />
      ) : panel === 1 ? (
        <AdminFindOrder />
      ) : (
        <AdminPlaceOrder />
      )}
    </Stack>
  );
};

export default AdminBook;
