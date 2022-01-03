import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

// icons
import EmailIcon from "@material-ui/icons/EmailRounded";
import RolesIcon from "@material-ui/icons/SupervisorAccountRounded";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import IDIcon from "@material-ui/icons/AssignmentIndRounded";
import UpdateIcon from "@material-ui/icons/UpdateRounded";
import TimeIcon from "@material-ui/icons/TimelapseRounded";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    letterSpacing: "0.5px",
  },
});

const UserProfile = (props) => {
  const classes = useStyles();
  const userData = props.data;

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
            className={classes.root}
            icon={<EmailIcon />}
            label={userData.email}
            variant="filled"
            size="small"
          />
          <Chip
            className={classes.root}
            icon={userData.emailVerified ? <CheckIcon /> : <CancelIcon />}
            label={userData.emailVerified ? "Verified" : "Not Verified"}
            color={userData.emailVerified ? "success" : "error"}
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <PersonIcon />
          <p className={classes.root}>{userData.name}</p>
        </Stack>
        <Stack direction="row" spacing={2}>
          <RolesIcon />
          <p className={classes.root}>Roles : </p>
          {userData.roles.map((role, idx) => (
            <Chip
              key={idx}
              className={classes.root}
              label={role}
              color="primary"
              size="small"
              variant="filled"
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <IDIcon />
          <p className={classes.root}>ID : </p>
          <Chip
            className={classes.root}
            label={userData._id}
            color="secondary"
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <UpdateIcon />
          <p className={classes.root}>Last Updated : </p>
          <p className={classes.root}>{userData.updatedAt.substr(0, 10)}</p>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TimeIcon />
          <p className={classes.root}>Joined : </p>
          <p className={classes.root}>{userData.createdAt.substr(0, 10)}</p>
        </Stack>
      </Stack>
    </Box>
  );
};
export default UserProfile;
