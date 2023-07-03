import { Fragment } from "react";

// Components
import { Stack, Divider, Typography } from "@mui/material";
import { Chip } from "@mui/material";

import { TimestampToDate } from "../../assets/utils/date";

const Account = ({ user }) => {
  const registeredOn = TimestampToDate(user?.createdAt);
  return (
    <Stack className="user-profile" spacing={2}>
      <Typography className="user-name">{user.name}</Typography>
      <Typography className="user-email">{user.email}</Typography>
      <Chip className="user-id" label={user._id} color="primary" size="small" />
      <Divider light={true} />
      <Typography className="user-roles">Roles</Typography>
      <Stack direction="row" spacing={1}>
        {user?.roles?.map((role) => (
          <Fragment key={role}>
            <Chip
              className="user-role"
              label={role}
              color="warning"
              variant="outlined"
              size="small"
            />
          </Fragment>
        ))}
      </Stack>
      <Typography variant="caption">
        User Since :{" "}
        {registeredOn.date +
          ", " +
          registeredOn.monthName +
          " " +
          registeredOn.year +
          " (" +
          registeredOn.dayName +
          ")"}
      </Typography>
    </Stack>
  );
};
export default Account;
