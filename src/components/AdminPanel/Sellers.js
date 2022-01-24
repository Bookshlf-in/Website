import { React, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

// components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// icons
import LoadIcon from "@mui/icons-material/AutorenewRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import PersonIcon from "@mui/icons-material/PersonRounded";
import IDIcon from "@mui/icons-material/AssignmentIndRounded";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& span": {
      fontFamily: "PT sans !important",
      fontSize: "12px",
    },
    "& ul": {
      "& li": {
        "& button": {
          fontFamily: "PT sans !important",
        },
      },
    },
  },
});

const Sellers = () => {
  const classes = useStyles();
  const history = useHistory();

  // functionality states
  const [sellersload, setsellersload] = useState(false);
  const [showverify, setshowverify] = useState(false);
  const [sellerverifyId, setsellerverifyId] = useState("");

  // data states
  const [, setseller] = useState([]);
  const [verifiedSeller, setVerifiedSeller] = useState([]);
  const [NotverifiedSeller, setNotVerifiedSeller] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  // fetching sellers list
  const handelgetSellers = (pageNo) => {
    setsellersload(true);
    setpage(pageNo);
    axios
      .get(`/admin-getSellerList?page=${pageNo}`)
      .then((response) => {
        // console.log(response.data);
        setsellersload(false);
        settotalPages(response.data.totalPages);
        setseller(response.data.data);
        setVerifiedSeller(
          response.data.data.filter((seller) => seller.isVerified === true)
        );
        setNotVerifiedSeller(
          response.data.data.filter((seller) => seller.isVerified === false)
        );
      })
      .catch((error) => {});
  };

  // verifying sellers
  const handelVerify = (Id, isVerified) => {
    setsellerverifyId(Id);
    if (isVerified) {
      axios
        .post("/admin-markSellerAsUnverified", {
          sellerId: Id,
        })
        .then((response) => {
          console.log(response.data);
          setsellerverifyId("");
          history.go(0);
        })
        .catch((error) => {
          console.log(error.response.data);
          setsellerverifyId("");
        });
    } else {
      axios
        .post("/admin-markSellerAsVerified", {
          sellerId: Id,
        })
        .then((response) => {
          console.log(response.data);
          setsellerverifyId("");
          history.go(0);
        })
        .catch((error) => {
          console.log(error.response.data);
          setsellerverifyId("");
        });
    }
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
      className="seller-verify-container"
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "800px",
        }}
        justifyContent="space-evenly"
      >
        <LoadingButton
          loading={sellersload}
          loadingPosition="start"
          startIcon={<LoadIcon />}
          variant="contained"
          className={classes.root}
          onClick={() => handelgetSellers(1)}
        >
          Fetch Sellers
        </LoadingButton>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={!showverify}
                onChange={(e, value) => {
                  setshowverify((prev) => !prev);
                }}
                color="error"
              />
            }
            label="Show Not Verified Sellers"
            labelPlacement="bottom"
            className={classes.root}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showverify}
                onChange={(e, value) => {
                  setshowverify((prev) => !prev);
                }}
                color="success"
              />
            }
            label="Show Verified Sellers"
            labelPlacement="bottom"
            className={classes.root}
          />
        </FormGroup>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%" }}
        justifyContent="space-evenly"
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, pageNo) => {
            handelgetSellers(pageNo);
          }}
          color="primary"
          className={classes.root}
        />
      </Stack>
      {showverify
        ? verifiedSeller.map((seller, index) => (
            <Box
              sx={{
                width: [300, 400, 800],
                boxShadow: "2px 3px 5px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                cursor: "pointer",
                padding: "10px",
              }}
              key={index}
            >
              <Stack direction="column" spacing={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Avatar
                    alt="Seller"
                    sx={{ width: 56, height: 56 }}
                    src={seller.photo}
                  />
                  <Chip
                    className={classes.root}
                    icon={seller.isVerified ? <CheckIcon /> : <CancelIcon />}
                    label={seller.isVerified ? "Verified" : "Not Verified"}
                    color={seller.isVerified ? "success" : "error"}
                    size="small"
                    variant="filled"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <PersonIcon />
                  <p className={classes.root}>{seller.name}</p>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <InfoIcon />
                  <p className={classes.root}>{seller.intro}</p>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <IDIcon />
                  <p className={classes.root}>Seller ID : </p>
                  <Chip
                    className={classes.root}
                    label={seller._id}
                    color="secondary"
                    size="small"
                    variant="filled"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    loading={seller._id === sellerverifyId ? true : false}
                    loadingPosition="start"
                    startIcon={<LoadIcon />}
                    variant="contained"
                    className={classes.root}
                    onClick={() => handelVerify(seller._id, seller.isVerified)}
                  >
                    Remove From Verified Seller
                  </LoadingButton>
                </Stack>
              </Stack>
            </Box>
          ))
        : NotverifiedSeller.map((seller, index) => (
            <Box
              sx={{
                width: [300, 400, 800],
                boxShadow: "2px 3px 5px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                cursor: "pointer",
                padding: "10px",
              }}
              key={index}
            >
              <Stack direction="column" spacing={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Avatar
                    alt="Seller"
                    sx={{ width: 56, height: 56 }}
                    src={seller.photo}
                  />
                  <Chip
                    className={classes.root}
                    icon={seller.isVerified ? <CheckIcon /> : <CancelIcon />}
                    label={seller.isVerified ? "Verified" : "Not Verified"}
                    color={seller.isVerified ? "success" : "error"}
                    size="small"
                    variant="filled"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <PersonIcon />
                  <p className={classes.root}>{seller.name}</p>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <InfoIcon />
                  <p className={classes.root}>{seller.intro}</p>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <IDIcon />
                  <p className={classes.root}>Seller ID : </p>
                  <Chip
                    className={classes.root}
                    label={seller._id}
                    color="secondary"
                    size="small"
                    variant="filled"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    loading={seller._id === sellerverifyId ? true : false}
                    loadingPosition="start"
                    startIcon={<LoadIcon />}
                    variant="contained"
                    className={classes.root}
                    onClick={() => handelVerify(seller._id, seller.isVerified)}
                  >
                    Verify This Seller
                  </LoadingButton>
                </Stack>
              </Stack>
            </Box>
          ))}
    </Stack>
  );
};

export default Sellers;
