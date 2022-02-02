import { React, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "../../axios";

// Components
import { Box, Stack, Typography, Alert, Button } from "@mui/material";
import { TextField, InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl, Dialog } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Icons
import AddIcon from "@mui/icons-material/AddCircleRounded";

// Address Components
import AddressList from "./AddressList";

const Style = {
  "& label": {
    fontSize: "12px",
  },
  "& input": {
    fontSize: "12px",
  },
  "& div": {
    fontSize: "12px",
  },
};
const MenuItemStyle = {
  fontSize: "11px",
  fontFamily: "Roboto",
  minHeight: 0,
};

const Address = (props) => {
  // functionality states
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert, setalert] = useState({
    show: false,
    type: "warning",
    msg: "",
  });

  // add address state object
  const [Label, setLabel] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [AltPhoneNo, setAltPhoneNo] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [Adr, setAdr] = useState(props.address);

  const PreVerify = () => {
    return (
      (Label !== "Address Type") &
      (Address.length > 0) &
      (City !== "City") &
      (State !== "State") &
      (ZipCode.length >= 6) &
      (PhoneNo.length === 10)
    );
  };
  const handelRegister = () => {
    setloading(true);
    if (PreVerify()) {
      axios
        .post("/addAddress", {
          label: Label,
          address: Address,
          phoneNo: PhoneNo,
          altPhoneNo: AltPhoneNo,
          city: City,
          state: State,
          zipCode: ZipCode,
        })
        .then((response) => {
          // console.log(response.data);
          setalert({
            show: true,
            type: "success",
            msg: response.data.msg,
          });
          setloading(false);
          setLabel("");
          setAddress("");
          setPhoneNo("");
          setAltPhoneNo("");
          setCity("");
          setState("");
          setZipCode("");
          setTimeout(() => {
            setOpen(false);
            setalert({
              show: false,
              type: "",
              msg: "",
            });
          }, 1000);
          axios.get("/getAddressList").then((response) => {
            response.data.sort((a, b) => {
              return a.updatedAt < b.updatedAt
                ? 1
                : a.updatedAt > b.updatedAt
                ? -1
                : 0;
            });
            setAdr(response.data);
          });
        })
        .catch((error) => {
          RegisterError();
        });
    } else {
      RegisterError();
    }
  };
  const RegisterError = () => {
    setloading(false);
    setalert({
      show: true,
      type: "error",
      msg: "Please Fill All Fields Correctly!",
    });
    setTimeout(() => {
      setalert({
        show: false,
        type: "",
        msg: "",
      });
    }, 3000);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
      }}
    >
      <Helmet>
        <title>Address Book | Bookshlf</title>
        <meta
          name="description"
          content="Your Address Book. All Your addresses are stored here."
        />
      </Helmet>
      <Stack spacing={2} direction="column">
        <Typography variant="h5">
          <strong>My Addresses</strong>
        </Typography>
        <Button
          color="primary"
          sx={{ maxWidth: 200 }}
          variant="outlined"
          onClick={() => setOpen(true)}
          size="small"
        >
          + Add Address
        </Button>
        <AddressList address={Adr} />
        <Dialog onClose={() => setOpen((prev) => !prev)} open={open} fullWidth>
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", padding: "10px 16px" }}
          >
            <FormControl fullWidth variant="filled" size="small" sx={Style}>
              <InputLabel id="address-type-label">Address Type</InputLabel>
              <Select
                labelId="address-type-label"
                value={Label}
                label="Address Type"
                onChange={(e) => setLabel(e.target.value)}
              >
                <MenuItem value="Home Address" sx={MenuItemStyle}>
                  Home Address
                </MenuItem>
                <MenuItem value="Office Address" sx={MenuItemStyle}>
                  Office Address
                </MenuItem>
                <MenuItem value="Temporary Address" sx={MenuItemStyle}>
                  Temporary Address
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Full Address"
              variant="filled"
              fullWidth
              size="small"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              sx={Style}
            />
            <FormControl fullWidth variant="filled" size="small" sx={Style}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                value={State}
                label="State"
                onChange={(e) => setState(e.target.value)}
              >
                <MenuItem
                  value="Andaman and Nicobar Islands"
                  sx={MenuItemStyle}
                >
                  Andaman and Nicobar Islands
                </MenuItem>
                <MenuItem value="Andhra Pradesh" sx={MenuItemStyle}>
                  Andhra Pradesh
                </MenuItem>
                <MenuItem value="Arunachal Pradesh" sx={MenuItemStyle}>
                  Arunachal Pradesh
                </MenuItem>
                <MenuItem value="Assam" sx={MenuItemStyle}>
                  Assam
                </MenuItem>
                <MenuItem value="Bihar" sx={MenuItemStyle}>
                  Bihar
                </MenuItem>
                <MenuItem value="Chandigarh" sx={MenuItemStyle}>
                  Chandigarh
                </MenuItem>
                <MenuItem value="Chhattisgarh" sx={MenuItemStyle}>
                  Chhattisgarh
                </MenuItem>
                <MenuItem value="Dadra and Nagar Haveli" sx={MenuItemStyle}>
                  Dadra and Nagar Haveli
                </MenuItem>
                <MenuItem value="Daman and Diu" sx={MenuItemStyle}>
                  Daman and Diu
                </MenuItem>
                <MenuItem value="Delhi" sx={MenuItemStyle}>
                  Delhi
                </MenuItem>
                <MenuItem value="Goa" sx={MenuItemStyle}>
                  Goa
                </MenuItem>
                <MenuItem value="Gujarat" sx={MenuItemStyle}>
                  Gujarat
                </MenuItem>
                <MenuItem value="Haryana" sx={MenuItemStyle}>
                  Haryana
                </MenuItem>
                <MenuItem value="Himachal Pradesh" sx={MenuItemStyle}>
                  Himachal Pradesh
                </MenuItem>
                <MenuItem value="Jammu and Kashmir" sx={MenuItemStyle}>
                  Jammu and Kashmir
                </MenuItem>
                <MenuItem value="Jharkhand" sx={MenuItemStyle}>
                  Jharkhand
                </MenuItem>
                <MenuItem value="Karnataka" sx={MenuItemStyle}>
                  Karnataka
                </MenuItem>
                <MenuItem value="Kerala" sx={MenuItemStyle}>
                  Kerala
                </MenuItem>
                <MenuItem value="Ladakh" sx={MenuItemStyle}>
                  Ladakh
                </MenuItem>
                <MenuItem value="Lakshadweep" sx={MenuItemStyle}>
                  Lakshadweep
                </MenuItem>
                <MenuItem value="Madhya Pradesh" sx={MenuItemStyle}>
                  Madhya Pradesh
                </MenuItem>
                <MenuItem value="Maharashtra" sx={MenuItemStyle}>
                  Maharashtra
                </MenuItem>
                <MenuItem value="Manipur" sx={MenuItemStyle}>
                  Manipur
                </MenuItem>
                <MenuItem value="Meghalaya" sx={MenuItemStyle}>
                  Meghalaya
                </MenuItem>
                <MenuItem value="Mizoram" sx={MenuItemStyle}>
                  Mizoram
                </MenuItem>
                <MenuItem value="Nagaland" sx={MenuItemStyle}>
                  Nagaland
                </MenuItem>
                <MenuItem value="Odisha" sx={MenuItemStyle}>
                  Odisha
                </MenuItem>
                <MenuItem value="Puducherry" sx={MenuItemStyle}>
                  Puducherry
                </MenuItem>
                <MenuItem value="Punjab" sx={MenuItemStyle}>
                  Punjab
                </MenuItem>
                <MenuItem value="Rajasthan" sx={MenuItemStyle}>
                  Rajasthan
                </MenuItem>
                <MenuItem value="Sikkim" sx={MenuItemStyle}>
                  Sikkim
                </MenuItem>
                <MenuItem value="Tamil Nadu" sx={MenuItemStyle}>
                  Tamil Nadu
                </MenuItem>
                <MenuItem value="Telangana" sx={MenuItemStyle}>
                  Telangana
                </MenuItem>
                <MenuItem value="Tripura" sx={MenuItemStyle}>
                  Tripura
                </MenuItem>
                <MenuItem value="Uttar Pradesh" sx={MenuItemStyle}>
                  Uttar Pradesh
                </MenuItem>
                <MenuItem value="Uttarakhand" sx={MenuItemStyle}>
                  Uttarakhand
                </MenuItem>
                <MenuItem value="West Bengal" sx={MenuItemStyle}>
                  West Bengal
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              size="small"
              value={City}
              onChange={(e) => setCity(e.target.value)}
              sx={Style}
            />
            <TextField
              label="Pincode"
              variant="filled"
              fullWidth
              size="small"
              value={ZipCode}
              onChange={(e) => setZipCode(e.target.value)}
              type="number"
              sx={Style}
            />

            <TextField
              label="Contact Number"
              variant="filled"
              fullWidth
              size="small"
              value={PhoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              type="number"
              sx={Style}
            />
            <TextField
              label="Alternate Contact Number"
              variant="filled"
              fullWidth
              size="small"
              value={AltPhoneNo}
              onChange={(e) => setAltPhoneNo(e.target.value)}
              type="number"
              sx={Style}
            />
            <LoadingButton
              variant="contained"
              fullWidth
              color="success"
              sx={{ maxWidth: 250, fontFamily: "Montserrat" }}
              onClick={handelRegister}
              endIcon={<AddIcon />}
              loading={loading}
              loadingPosition="end"
              size="small"
            >
              Add Address
            </LoadingButton>
            {alert.show ? (
              <Alert severity={alert.type}>{alert.msg}</Alert>
            ) : null}
          </Stack>
        </Dialog>
      </Stack>
    </Box>
  );
};
export default Address;
