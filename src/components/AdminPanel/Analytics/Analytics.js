import { useState } from "react";

// MUI Components
import { Stack, Divider } from "@mui/material";

// components
import OrdersAnalytics from "./Orders/OrdersAnalytics";

const Analytics = () => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ minHeight: "calc(100vh - 48px)" }}
    >
      <Stack sx={{ minWidth: 200 }}>{/* Navigation */}</Stack>
      <Stack sx={{ width: "100%" }}>
        <OrdersAnalytics />
      </Stack>
    </Stack>
  );
};

export default Analytics;
