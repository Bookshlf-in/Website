import { React, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import { Drawer } from "@mui/material";
import { Stack } from "@mui/material";

// Custom components
import AdminSideBar from "./AdminSideBar";
import AdminAppBar from "./AdminAppBar";
import AdminContentPanel from "./AdminContentPanel";

const AdminNavbar = () => {
  // Hooks Call
  const history = useHistory();
  const params = useParams();

  // States
  const [Panel, setPanel] = useState(Number(params.panel));
  const [openSideBar, setOpenSideBar] = useState(false);

  // update panel when text param changes
  useEffect(() => {
    setPanel(Number(params.panel));
  }, [params]);

  return (
    <Stack className="adminPanel-container">
      <AdminAppBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <Drawer
        anchor="left"
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
      >
        <AdminSideBar
          Panel={Panel}
          setPanel={setPanel}
          openSideBar={openSideBar}
          setOpenSideBar={setOpenSideBar}
        />
      </Drawer>
      <AdminContentPanel Panel={Panel} setPanel={setPanel} history={history} />
    </Stack>
  );
};
export default AdminNavbar;
