import { useState } from "react";
import axios from "../../../axios";

// MUI Components
import { Stack, Alert, Popover } from "@mui/material";
import { FormControl, InputLabel, Select } from "@mui/material";
import { TextField, MenuItem, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import AddIcon from "@mui/icons-material/Add";

const AddAddressPopOver = ({ setAddress, setOpenPop, openPop }) => {
  // Functionality States
  const [loading, setloading] = useState(false);
  const [alert, setalert] = useState({
    show: false,
    type: "warning",
    msg: "",
  });

  // add address Data states
  const [Label, setLabel] = useState("");
  const [Address, setaddress] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [AltPhoneNo, setAltPhoneNo] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [ZipCode, setZipCode] = useState("");

  // handeling address register request
  const handelRegister = () => {
    setloading(true);
    if (
      Label !== "Address Type" &&
      Address.length > 0 &&
      City !== "City" &&
      State !== "State" &&
      ZipCode.length === 6 &&
      PhoneNo.length === 10
    ) {
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
        .then(() => {
          axios
            .get("/getAddressList")
            .then((response) => {
              setAddress(
                response.data.sort((a, b) => {
                  return a.updatedAt < b.updatedAt
                    ? 1
                    : a.updatedAt > b.updatedAt
                    ? -1
                    : 0;
                })
              );
              setalert({
                show: true,
                type: "success",
                msg: "Address Added successfully",
              });
              setloading(false);
              setTimeout(() => {
                setalert({
                  show: false,
                  type: "",
                  msg: "",
                });
                setOpenPop(null);
              }, 1000);
            })
            .catch((error) => {});
        })
        .catch((error) => {
          if (error.response) {
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
          }
          setloading(false);
        });
    } else {
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
    }
  };

  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        size="small"
        color="success"
        onClick={(e) => setOpenPop(e.currentTarget)}
      >
        Add New Address
      </Button>
      <Popover
        open={Boolean(openPop)}
        anchorEl={openPop}
        onClose={() => setOpenPop(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{ width: "100%" }}
      >
        <Stack sx={{ padding: "15px 24px", width: "100%" }} spacing={2}>
          <FormControl fullWidth sx={{ minWidth: 200 }} size="small">
            <InputLabel id="address-type-label">Address Type</InputLabel>
            <Select
              labelId="address-type-label"
              value={Label}
              label="Address Type"
              onChange={(e) => setLabel(e.target.value)}
            >
              <MenuItem value="Home Address">Home Address</MenuItem>
              <MenuItem value="Office Address">Office Address</MenuItem>
              <MenuItem value="Temporary Address">Temporary Address</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Full Address"
            value={Address}
            fullWidth
            size="small"
            sx={{ minWidth: 250 }}
            onChange={(e) => setaddress(e.target.value)}
          />
          <FormControl fullWidth sx={{ maxWidth: 300 }} size="small">
            <InputLabel id="state-label">State</InputLabel>
            <Select
              size="small"
              labelId="state-label"
              value={State}
              label="State"
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </MenuItem>
              <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
              <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
              <MenuItem value="Assam">Assam</MenuItem>
              <MenuItem value="Bihar">Bihar</MenuItem>
              <MenuItem value="Chandigarh">Chandigarh</MenuItem>
              <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
              <MenuItem value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </MenuItem>
              <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Goa">Goa</MenuItem>
              <MenuItem value="Gujarat">Gujarat</MenuItem>
              <MenuItem value="Haryana">Haryana</MenuItem>
              <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
              <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="Ladakh">Ladakh</MenuItem>
              <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
              <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Manipur">Manipur</MenuItem>
              <MenuItem value="Meghalaya">Meghalaya</MenuItem>
              <MenuItem value="Mizoram">Mizoram</MenuItem>
              <MenuItem value="Nagaland">Nagaland</MenuItem>
              <MenuItem value="Odisha">Odisha</MenuItem>
              <MenuItem value="Puducherry">Puducherry</MenuItem>
              <MenuItem value="Punjab">Punjab</MenuItem>
              <MenuItem value="Rajasthan">Rajasthan</MenuItem>
              <MenuItem value="Sikkim">Sikkim</MenuItem>
              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
              <MenuItem value="Telangana">Telangana</MenuItem>
              <MenuItem value="Tripura">Tripura</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
              <MenuItem value="West Bengal">West Bengal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="City"
            fullWidth
            value={City}
            onChange={(e) => setCity(e.target.value)}
            sx={{ maxWidth: 300 }}
            size="small"
          />
          <TextField
            label="Pincode"
            size="small"
            fullWidth
            value={ZipCode}
            onChange={(e) => setZipCode(e.target.value)}
            type="number"
            sx={{ maxWidth: 284 }}
          />

          <TextField
            size="small"
            label="Contact Number"
            fullWidth
            value={PhoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            type="number"
            sx={{ maxWidth: 300 }}
          />
          <TextField
            size="small"
            label="Alternate Contact Number"
            fullWidth
            value={AltPhoneNo}
            onChange={(e) => setAltPhoneNo(e.target.value)}
            type="number"
            sx={{ maxWidth: 300 }}
          />
          <LoadingButton
            size="small"
            variant="contained"
            fullWidth
            color="success"
            sx={{ maxWidth: 284, fontFamily: "PT sans" }}
            onClick={handelRegister}
            endIcon={<AddIcon />}
            loading={loading}
            loadingPosition="end"
          >
            Add Address
          </LoadingButton>
          {alert.show ? (
            <Alert severity={alert.type} sx={{ fontFamily: "PT sans" }}>
              {alert.msg}
            </Alert>
          ) : null}
        </Stack>
      </Popover>
    </div>
  );
};

export default AddAddressPopOver;
