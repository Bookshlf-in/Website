import { useState } from "react";

// MUI Components
import { Stack, Divider } from "@mui/material";

// Custom CSS
import "./Support.css";

// Custom Components
import SupportSideBar from "./SupportSideBar";
import SupportContent from "./SupportContent";

const Support = () => {
  // data States
  const [panel, setPanel] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <Stack
      direction="row"
      className="admin-support"
      divider={<Divider flexItem orientation="vertical" />}
      spacing={1}
    >
      <SupportSideBar panel={panel} setPanel={setPanel} />
      <SupportContent
        panel={panel}
        setPanel={setPanel}
        page={page}
        setPage={setPage}
      />
    </Stack>
  );
};

export default Support;
