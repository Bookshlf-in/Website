import { useNavigate } from "react-router-dom";
import { Paper, Stack, Typography } from "@mui/material";

import OrderIcon from "@mui/icons-material/LocalShipping";
import AddressIcon from "@mui/icons-material/HomeWork";

const UserNavItem = ({ logo, label }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/${label}`);
  };
  return (
    <Paper className="usernav-item" elevation={3} onClick={handleClick}>
      <Stack
        sx={{ height: "100%", width: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        {logo}
        <Typography>{label}</Typography>
      </Stack>
    </Paper>
  );
};

const UserNav = () => {
  return (
    <Stack direction="row" spacing={2}>
      <UserNavItem logo={<OrderIcon />} label="orders" />
      <UserNavItem logo={<AddressIcon />} label="address" />
    </Stack>
  );
};
export default UserNav;
