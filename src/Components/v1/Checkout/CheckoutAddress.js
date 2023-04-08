import { useState, useEffect } from "react";

// api
import axios from "../../../axios";

//  Components
import { Stack, Divider } from "@mui/material";
import { Typography, Chip } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

// Micro Components
import AddAddressPopOver from "../MicroComponents/AddAddressPopOver";

const CurrentAddress = ({ address, addressId }) => {
  const [currentAddress, setCurrentAddress] = useState(
    address.filter((adr) => adr._id === addressId)
  );

  useEffect(() => {
    setCurrentAddress(address.filter((adr) => adr._id === addressId));
  }, [address, addressId]);
  return (
    <Stack
      sx={{
        padding: "10px",
        border: "1px solid rgba(0,255,0,0.5)",
        borderRadius: "5px",
        width: "100%",
      }}
      spacing={1}
    >
      <Chip label={currentAddress[0]?.label} size="small" />
      <Divider flexItem orientation="horizontal" />
      <Stack>
        <Typography variant="caption">{currentAddress[0]?.address}</Typography>
        <Typography variant="caption">{currentAddress[0]?.city}</Typography>
        <Typography variant="caption">{currentAddress[0]?.state}</Typography>
        <Typography variant="caption">{currentAddress[0]?.zipCode}</Typography>
        <Typography variant="caption">{currentAddress[0]?.phoneNo}</Typography>
      </Stack>
    </Stack>
  );
};

const CheckoutAddress = ({ address, setAddress, addressId, setAddressId }) => {
  // Functionality States
  const [openPop, setOpenPop] = useState(false);

  // Getting Addresses
  const getAddressList = () => {
    axios.get("/getAddressList").then((response) => {
      setAddress(
        response.data.sort((a, b) => {
          return a.updatedAt < b.updatedAt
            ? 1
            : a.updatedAt > b.updatedAt
            ? -1
            : 0;
        })
      );
    });
  };

  useEffect(() => {
    getAddressList();
  }, []);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "20px 10px",
      }}
      spacing={2}
    >
      <CurrentAddress address={address} addressId={addressId} />
      <FormControl fullWidth sx={{ maxWidth: 400 }} size="small">
        <InputLabel id="checkout-address">Address</InputLabel>
        <Select
          labelId="checkout-address"
          value={addressId}
          label="Address"
          onChange={(e) => {
            setAddressId(e.target.value);
          }}
        >
          {address.map((adr) => (
            <MenuItem key={adr._id} value={adr._id}>
              {adr.address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AddAddressPopOver
        setAddress={setAddress}
        setOpenPop={setOpenPop}
        openPop={openPop}
      />
    </Stack>
  );
};

export default CheckoutAddress;
