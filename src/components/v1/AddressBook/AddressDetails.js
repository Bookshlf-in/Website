import { React, useState } from "react";

//Mui Components
import { Stack, Dialog, Chip, Typography } from "@mui/material";

// Mui Icons
import CallIcon from "@mui/icons-material/CallRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import OfficeIcon from "@mui/icons-material/ApartmentRounded";
import TempIcon from "@mui/icons-material/NotListedLocationRounded";

const AddressDetails = (props) => {
  const [open, setOpen] = useState(false);
  const Details = (props) => {
    return (
      <Typography sx={{ fontSize: "12px" }} align="justify">
        <strong>{props.value}</strong>
      </Typography>
    );
  };
  // Details Popup
  const Popup = () => {
    return (
      <Dialog onClose={() => setOpen((prev) => !prev)} open={open} fullWidth>
        <Stack
          sx={{ padding: "10px", width: "100%" }}
          spacing={1}
          direction="row"
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            <Chip
              icon={
                props.details.label === "Home Address" ? (
                  <HomeIcon />
                ) : props.details.label === "Office Address" ? (
                  <OfficeIcon />
                ) : (
                  <TempIcon />
                )
              }
              color="default"
              label={props.details.label}
              size="small"
            />
            <Details value={props.details.address} />
            <Details value={props.details.city} />
            <Details value={props.details.state} />
            <Details value={props.details.zipCode} />
          </Stack>
          <Stack>
            <Chip
              icon={<CallIcon />}
              color="primary"
              label={props.details.phoneNo}
              size="small"
            />
            {props.details?.altPhoneNo ? (
              <Chip
                icon={<CallIcon />}
                color="primary"
                label={props.details.altPhoneNo}
                size="small"
              />
            ) : null}
          </Stack>
        </Stack>
      </Dialog>
    );
  };
  return (
    <>
      <Typography
        sx={{
          fontSize: "10px",
          cursor: "pointer",
          maxWidth: 100,
        }}
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        More Details
      </Typography>
      <Popup />
    </>
  );
};

export default AddressDetails;
