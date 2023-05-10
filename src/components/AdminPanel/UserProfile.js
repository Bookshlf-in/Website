import { React } from "react";

// components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

// icons
import EmailIcon from "@mui/icons-material/EmailRounded";
import RolesIcon from "@mui/icons-material/SupervisorAccountRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import PersonIcon from "@mui/icons-material/PersonRounded";
import IDIcon from "@mui/icons-material/AssignmentIndRounded";
import UpdateIcon from "@mui/icons-material//UpdateRounded";
import TimeIcon from "@mui/icons-material/TimelapseRounded";

const UserProfile = ({ data }) => {
  const userData = data;

  return (
    <Box
      sx={{
        width: [300, 400],
        height: 300,
        boxShadow: "2px 3px 5px rgba(0,0,0,0.3)",
        borderRadius: "10px",
        cursor: "pointer",
        padding: "10px",
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Chip
            icon={<EmailIcon />}
            label={userData.email}
            variant="filled"
            size="small"
          />
          <Chip
            icon={userData.emailVerified ? <CheckIcon /> : <CancelIcon />}
            label={userData.emailVerified ? "Verified" : "Not Verified"}
            color={userData.emailVerified ? "success" : "error"}
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <PersonIcon />
          <p>{userData.name}</p>
        </Stack>
        <Stack direction="row" spacing={2}>
          <RolesIcon />
          <p>Roles : </p>
          {userData.roles.map((role, idx) => (
            <Chip
              key={idx}
              label={role}
              color="primary"
              size="small"
              variant="filled"
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <IDIcon />
          <p>ID : </p>
          <Chip
            label={userData._id}
            color="secondary"
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <UpdateIcon />
          <p>Last Updated : </p>
          <p>{userData.updatedAt.substr(0, 10)}</p>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TimeIcon />
          <p>Joined : </p>
          <p>{userData.createdAt.substr(0, 10)}</p>
        </Stack>
      </Stack>
    </Box>
  );
};
export default UserProfile;
