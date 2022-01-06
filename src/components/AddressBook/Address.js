import { React, useState } from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";
import "./Address.css";
import axios from "../../axios";

// Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import CallIcon from "@mui/icons-material/CallRounded";
import PinIcon from "@mui/icons-material/FiberPinRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import OfficeIcon from "@mui/icons-material/ApartmentRounded";
import TempIcon from "@mui/icons-material/NotListedLocationRounded";

const useStyles = makeStyles(() => ({
  root: {
    fontWeight: "bolder",
    // fontFamily: "PT sans !important",
    "& label": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
    },
  },
}));

const Address = (props) => {
  const classes = useStyles();

  // functionality states
  const [loading, setloading] = useState(false);
  const [alert, setalert] = useState({
    show: false,
    type: "warning",
    msg: "",
  });
  const [deleteAdr, setdeleteAdr] = useState("");

  // add address state object
  const [Label, setLabel] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [AltPhoneNo, setAltPhoneNo] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [Adr, setAdr] = useState(props.address);

  const columns = [
    {
      field: "type",
      headerName: "Type",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (type) => {
        return (
          <Chip
            icon={
              type.value === "Home Address" ? (
                <HomeIcon />
              ) : type.value === "Office Address" ? (
                <OfficeIcon />
              ) : (
                <TempIcon />
              )
            }
            color="default"
            label={type.value}
            size="small"
            className={classes.root}
          />
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 180,
      flex: 2,
      sortable: false,
      renderCell: (adr) => {
        return (
          <Typography variant="caption">
            <strong>{adr.value}</strong>
          </Typography>
        );
      },
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (city) => {
        return (
          <Typography variant="caption">
            <strong>{city.value}</strong>
          </Typography>
        );
      },
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (state) => {
        return (
          <Typography variant="caption">
            <strong>{state.value}</strong>
          </Typography>
        );
      },
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (zip) => {
        return (
          <Chip
            icon={<PinIcon />}
            color="default"
            label={zip.value}
            size="small"
            className={classes.root}
          />
        );
      },
    },
    {
      field: "phoneNo",
      headerName: "Phone No",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (phone) => {
        return (
          <Chip
            icon={<CallIcon />}
            color="primary"
            label={phone.value}
            size="small"
            className={classes.root}
          />
        );
      },
    },
    {
      field: "altphoneNo",
      headerName: "Alt Phone No",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (phone) => {
        return (
          <Chip
            icon={<CallIcon />}
            color="primary"
            label={phone.value ? phone.value : "Not Provided"}
            size="small"
            className={classes.root}
          />
        );
      },
    },
    {
      field: "Remove Address",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={() => handelDeleteAddress(cellValues.id)}
            >
              {deleteAdr !== cellValues.id ? (
                <DeleteIcon color="error" />
              ) : (
                <CircularProgress color="error" size={25} />
              )}
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const rows = Adr.map((adr) => {
    return {
      id: adr._id,
      type: adr.label,
      address: adr.address,
      city: adr.city,
      state: adr.state,
      zipCode: adr.zipCode,
      phoneNo: adr.phoneNo,
      altphoneNo: adr.AltPhoneNo,
    };
  });

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
        .then((response) => {
          // console.log(response.data);
          setalert({
            show: true,
            type: "success",
            msg: response.data.msg,
          });
          setloading(false);
          setTimeout(() => {
            setalert({
              show: false,
              type: "",
              msg: "",
            });
          }, 3000);
          axios
            .get("/getAddressList")
            .then((response) => {
              response.data.sort((a, b) => {
                return a.updatedAt < b.updatedAt
                  ? 1
                  : a.updatedAt > b.updatedAt
                  ? -1
                  : 0;
              });
              setAdr(response.data);
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

  // const deleting the address
  const handelDeleteAddress = (id) => {
    // console.log(e.target.id);
    setdeleteAdr(id);
    axios
      .delete("/deleteAddress", {
        data: { addressId: id },
      })
      .then((response) => {
        // console.log(response.data);
        setalert({
          show: true,
          type: "success",
          msg: response.data.msg,
        });
        setTimeout(() => {
          setalert({
            show: false,
            type: "",
            msg: "",
          });
        }, 3000);
        setAdr(Adr.filter((address) => address._id !== id));
      })
      .catch((error) => {
        // console.log(error.response.data.errors);
        setalert({
          show: true,
          Type: "error",
          msg: error.response.data.error,
        });
        setTimeout(() => {
          setalert({
            show: false,
            type: "",
            msg: "",
          });
        }, 5000);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
      }}
    >
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">
          <strong>Your Address Book</strong>
        </Typography>

        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="address-form-stack"
        >
          <Stack
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
            justifyContent="center"
          >
            <FormControl
              fullWidth
              variant="filled"
              sx={{ maxWidth: 300 }}
              className={classes.root}
            >
              <InputLabel id="address-type-label">Address Type</InputLabel>
              <Select
                labelId="address-type-label"
                value={Label}
                label="Age"
                onChange={(e) => setLabel(e.target.value)}
              >
                <MenuItem value="Home Address">Home Address</MenuItem>
                <MenuItem value="Office Address">Office Address</MenuItem>
                <MenuItem value="Temporary Address">Temporary Address</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Full Address"
              variant="filled"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              className={classes.root}
              sx={{ maxWidth: 600 }}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
            justifyContent="center"
          >
            <FormControl
              fullWidth
              variant="filled"
              className={classes.root}
              sx={{ maxWidth: 300 }}
            >
              <InputLabel id="state-label">State</InputLabel>
              <Select
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
              className={classes.root}
              label="City"
              variant="filled"
              fullWidth
              value={City}
              onChange={(e) => setCity(e.target.value)}
              sx={{ maxWidth: 300 }}
            />
            <TextField
              className={classes.root}
              label="Pincode"
              variant="filled"
              fullWidth
              value={ZipCode}
              onChange={(e) => setZipCode(e.target.value)}
              type="number"
              sx={{ maxWidth: 284 }}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
            justifyContent="center"
          >
            <TextField
              className={classes.root}
              label="Contact Number"
              variant="filled"
              fullWidth
              value={PhoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              type="number"
              sx={{ maxWidth: 300 }}
            />
            <TextField
              className={classes.root}
              label="Alternate Contact Number"
              variant="filled"
              fullWidth
              value={AltPhoneNo}
              onChange={(e) => setAltPhoneNo(e.target.value)}
              type="number"
              sx={{ maxWidth: 300 }}
            />
            <LoadingButton
              className={classes.root}
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
          </Stack>
        </Stack>
        {alert.show ? (
          <Alert
            severity={alert.type}
            className={classes.root}
            sx={{ fontFamily: "PT sans" }}
          >
            {alert.msg}
          </Alert>
        ) : null}
        <Stack
          sx={{ height: 300, width: "100%", padding: "10px" }}
          className="address-datagrid-stack"
        >
          <DataGrid
            loading={loading}
            className={classes.root}
            rows={rows}
            columns={columns}
            pageSize={3}
            disableSelectionOnClick
          />
        </Stack>
      </Stack>
    </Box>
  );
};
export default Address;
