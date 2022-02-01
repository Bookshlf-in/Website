import { React, useState, useEffect } from "react";
import axios from "../../axios";

// Mui Components
import { IconButton, Stack, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Mui Icons
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/HomeRounded";
import OfficeIcon from "@mui/icons-material/ApartmentRounded";
import TempIcon from "@mui/icons-material/NotListedLocationRounded";

// Address List Components
import AddressDetails from "./AddressDetails";

const AddressList = (props) => {
  const [adrList, setAdrList] = useState(props.address);

  useEffect(() => {
    setAdrList(props.address);
  }, [props.address]);

  const Address = (props) => {
    return (
      <Stack
        sx={{
          width: "100%",
          padding: "10px",
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: "10px",
          position: "relative",
          minHeight: 56,
          color: "#333",
        }}
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Stack
          sx={{ width: 56, height: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          {props.value.label === "Home Address" ? (
            <HomeIcon />
          ) : props.value.label === "Office Address" ? (
            <OfficeIcon />
          ) : (
            <TempIcon />
          )}
        </Stack>
        <Stack sx={{ maxWidth: 300 }}>
          <Typography sx={{ fontSize: "11px" }}>
            <strong>{props.value.label}</strong>
          </Typography>
          <Typography sx={{ fontSize: "10px" }} align="justify">
            {props.value.address.length > 50
              ? props.value.address.substr(0, 50) + "..."
              : props.value.address}
          </Typography>
          <AddressDetails details={props.value} />
        </Stack>
        <Stack
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
          justifyContent="center"
          alignItems="center"
        >
          <DeleteAddress addressId={props.value._id} />
        </Stack>
      </Stack>
    );
  };

  // Component for deleting Addresses
  const DeleteAddress = (props) => {
    const [deleteLoad, setdeleteLoad] = useState(false);
    const addressId = props.addressId;

    const handelDeleteAddress = () => {
      setdeleteLoad(true);
      axios
        .delete("/deleteAddress", {
          data: { addressId: addressId },
        })
        .then((response) => {
          setAdrList(adrList.filter((address) => address._id !== addressId));
          setdeleteLoad(false);
        })
        .catch((error) => {
          setdeleteLoad(false);
        });
    };

    return (
      <IconButton color="error" onClick={handelDeleteAddress}>
        {deleteLoad ? (
          <CircularProgress size={14} color="inherit" />
        ) : (
          <DeleteIcon sx={{ height: 16, width: 16 }} />
        )}
      </IconButton>
    );
  };

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      {adrList?.length &&
        adrList.map((address) => <Address key={address._id} value={address} />)}
    </Stack>
  );
};

export default AddressList;
