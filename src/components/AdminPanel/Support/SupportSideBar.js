import { useState } from "react";

// MUI Components
import { Stack, Typography } from "@mui/material";

// Custom Components
import ComposeMail from "./ComposeMail";

// MUI Icons
import InboxIcon from "@mui/icons-material/Inbox";
import GeneralIcon from "@mui/icons-material/Info";
import FeedbackIcon from "@mui/icons-material/Feedback";
import OrderhelpIcon from "@mui/icons-material/LocalShipping";

const SidebarBtn = ({ panel, setPanel, value, Icon, txt }) => {
  return (
    <Stack
      className={
        panel === value
          ? "admin-sidebar-btn admin-sidebar-btn-active"
          : "admin-sidebar-btn"
      }
      direction="row"
      spacing={2}
      alignItems="center"
      onClick={() => setPanel(value)}
    >
      {Icon}
      <Typography sx={{ fontSize: "0.875em", color: "rgba(0,0,0,0.8)" }}>
        {txt}
      </Typography>
    </Stack>
  );
};

const SupportSideBar = ({ panel, setPanel }) => {
  return (
    <Stack className="admin-support-sidebar" spacing={2}>
      <ComposeMail value="Compose" type="SEND_MULTIPLE" />
      <SidebarBtn
        panel={panel}
        setPanel={setPanel}
        value={0}
        Icon={<InboxIcon sx={{ color: "rgba(0,0,0,0.8)" }} />}
        txt="Inbox"
      />
      <SidebarBtn
        panel={panel}
        setPanel={setPanel}
        value={1}
        Icon={<GeneralIcon sx={{ color: "rgba(0,0,0,0.8)" }} />}
        txt="General Query"
      />
      <SidebarBtn
        panel={panel}
        setPanel={setPanel}
        value={2}
        Icon={<OrderhelpIcon sx={{ color: "rgba(0,0,0,0.8)" }} />}
        txt="Order Help"
      />
      <SidebarBtn
        panel={panel}
        setPanel={setPanel}
        value={3}
        Icon={<FeedbackIcon sx={{ color: "rgba(0,0,0,0.8)" }} />}
        txt="Feedback"
      />
    </Stack>
  );
};

export default SupportSideBar;
