import React from "react";

// Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
// Icons
import PersonIcon from "@mui/icons-material/PersonTwoTone";
import EmailIcon from "@mui/icons-material/EmailTwoTone";
import DateRangeIcon from "@mui/icons-material/DateRangeTwoTone";
import RolesIcon from "@mui/icons-material/AccessibilityRounded";

const Account = (props) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: "10px",
          border: "1px solid rgba(0,0,0,0.4)",
          borderRadius: "10px",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack spacing={2} direction="row" alignItems="center">
            <PersonIcon fontSize="small" />
            <Typography variant="caption">{props.user.name}</Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <EmailIcon fontSize="small" />
            <Typography variant="caption">{props.user.email}</Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <DateRangeIcon fontSize="small" />
            <Typography variant="caption">
              {props.user.createdAt.substr(0, 4)}
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <RolesIcon fontSize="small" />
            <Stack spacing={1} direction="row" alignItems="center">
              {props.user.roles.map((role, i) => (
                <Chip key={i} label={role} variant="filled" size="small" />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
export default Account;
