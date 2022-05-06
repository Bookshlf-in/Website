import { React, useState, useEffect } from "react";

import { Box, Stack, Paper, Skeleton, Alert } from "@mui/material";
import { Chip, Divider, Typography, Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Icons
import UserIcon from "@mui/icons-material/Person";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";

const SmallBox = (props) => {
  return (
    <Paper elevation={2} sx={{ padding: "10px", width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {props.Icon}
        <Stack>
          <Typography variant="button"> {props.title}</Typography>
          <Typography variant="caption" align="center">
            <strong>{props.subtitle}</strong>
          </Typography>
          <Chip label={props.text} size="small" color={props.Chipcolor} />
        </Stack>
      </Stack>
    </Paper>
  );
};

const Analytics = () => {
  return (
    <Box
      sx={{
        padding: "10px 16px",
        borderRadius: "10px",
        border: "1px solid rgba(0,0,0,0.2)",
        minHeight: "80vh",
      }}
    >
      <Stack>
        <Stack direction="row" spacing={2}>
          <SmallBox
            Icon={<UserIcon />}
            title="Total Users"
            subtitle="956"
            text="16 Online"
            Chipcolor="success"
          />
          <SmallBox
            Icon={<ShippingIcon />}
            title="Average Shipping Cost"
            subtitle="169"
            text="81 - 381"
            Chipcolor="info"
          />
          <SmallBox
            Icon={<RupeeIcon />}
            title="Total Revenue"
            subtitle="67,889"
            text="+21% profits"
            Chipcolor="primary"
          />
          <SmallBox
            Icon={<RupeeIcon />}
            title="Hosting Charges"
            subtitle="1200"
            text="+11% increase"
            Chipcolor="secondary"
          />
        </Stack>
      </Stack>
    </Box>
  );
};
export default Analytics;
