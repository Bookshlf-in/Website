import { React, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// components
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

// icons
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

// custom components
import UserProfile from "./UserProfile";
import SellerProfile from "./SellerProfile";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& div": {
      "& input": {
        fontFamily: "PT sans !important",
      },
    },
  },
});

const FindProfile = () => {
  const classes = useStyles();

  // functionality states
  const [userLoad1, setuserLoad1] = useState(false);
  const [userLoad2, setuserLoad2] = useState(false);
  const [sellerLoad1, setsellerLoad1] = useState(false);
  const [sellerLoad2, setsellerLoad2] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    msg: "",
  });

  // data states
  const [userProfile, setUserProfile] = useState(null);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [useremail, setuseremail] = useState("");
  const [selleremail, setselleremail] = useState("");
  const [userId, setuserId] = useState("");
  const [sellerId, setsellerId] = useState("");

  const getUserProfilefromEmail = () => {
    setuserLoad1(true);
    const fetch = () => {
      axios
        .get("/admin-getUserProfile", {
          params: { email: useremail },
        })
        .then((response) => {
          setUserProfile(response.data);
          setuserLoad1(false);
        })
        .catch((error) => {
          setAlert({
            show: true,
            msg: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              msg: "",
              type: "info",
            });
          }, 6000);
          setuserLoad1(false);
        });
    };
    fetch();
  };

  const getUserProfilefromId = () => {
    setuserLoad2(true);
    const fetch = () => {
      axios
        .get("/admin-getUserProfile", {
          params: { userId: userId },
        })
        .then((response) => {
          setUserProfile(response.data);
          setuserLoad2(false);
        })
        .catch((error) => {
          setAlert({
            show: true,
            msg: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              msg: "",
              type: "info",
            });
          }, 6000);
          setuserLoad2(false);
        });
    };
    fetch();
  };

  const getSellerProfilefromEmail = () => {
    setsellerLoad1(true);
    const fetch = () => {
      axios
        .get("/admin-getSellerProfile", {
          params: { email: selleremail },
        })
        .then((response) => {
          setSellerProfile(response.data);
          setsellerLoad1(false);
        })
        .catch((error) => {
          setAlert({
            show: true,
            msg: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              msg: "",
              type: "info",
            });
          }, 6000);
          setsellerLoad1(false);
        });
    };
    fetch();
  };

  const getSellerProfilefromId = () => {
    setsellerLoad2(true);
    const fetch = () => {
      axios
        .get("/admin-getSellerProfile", {
          params: { sellerId: sellerId },
        })
        .then((response) => {
          setSellerProfile(response.data);
          setsellerLoad2(false);
        })
        .catch((error) => {
          setAlert({
            show: true,
            msg: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              msg: "",
              type: "info",
            });
          }, 6000);
          setsellerLoad2(false);
        });
    };
    fetch();
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <TextField
            className={classes.root}
            label="User Email Address"
            helperText="Enter Email Address To Find Profile"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            value={useremail}
            onChange={(e) => setuseremail(e.target.value)}
          />
          <TextField
            className={classes.root}
            label="User ID"
            helperText="Enter Unique ID(24 letters) To Find Profile"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <TextField
            className={classes.root}
            label="Seller Email Address"
            helperText="Enter Email Address To Find Profile"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            value={selleremail}
            onChange={(e) => setselleremail(e.target.value)}
          />
          <TextField
            className={classes.root}
            label="Seller ID"
            helperText="Enter Unique ID(24 letters) To Find Profile"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            value={sellerId}
            onChange={(e) => setsellerId(e.target.value)}
          />
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: "column", lg: "row", md: "row", sm: "row" }}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <LoadingButton
            loading={userLoad1}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            variant="contained"
            fullWidth
            className={classes.root}
            onClick={getUserProfilefromEmail}
          >
            Find User Profile From Email
          </LoadingButton>

          <LoadingButton
            loading={userLoad2}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            fullWidth
            variant="contained"
            className={classes.root}
            onClick={getUserProfilefromId}
          >
            Find User Profile From ID
          </LoadingButton>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <LoadingButton
            loading={sellerLoad1}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            variant="contained"
            fullWidth
            className={classes.root}
            onClick={getSellerProfilefromEmail}
          >
            Find Seller Profile From Email
          </LoadingButton>

          <LoadingButton
            loading={sellerLoad2}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            fullWidth
            variant="contained"
            className={classes.root}
            onClick={getSellerProfilefromId}
          >
            Find Seller Profile From ID
          </LoadingButton>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {alert.show ? (
          <Alert severity={alert.type} className={classes.root}>
            {alert.msg}
          </Alert>
        ) : null}
        <Stack
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {userProfile ? <UserProfile data={userProfile} /> : null}
          {sellerProfile ? <SellerProfile data={sellerProfile} /> : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FindProfile;
