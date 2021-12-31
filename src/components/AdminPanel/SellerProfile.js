import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Fab from "@mui/material/Fab";

// icons
import InfoIcon from "@material-ui/icons/InfoRounded";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import IDIcon from "@material-ui/icons/AssignmentIndRounded";
import UpdateIcon from "@material-ui/icons/UpdateRounded";
import TimeIcon from "@material-ui/icons/TimelapseRounded";
import StarIcon from "@material-ui/icons/StarRounded";
import RatingIcon from "@material-ui/icons/StarsRounded";
import WalletIcon from "@material-ui/icons/AccountBalanceWalletRounded";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
  },
});

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const SellerProfile = (props) => {
  const classes = useStyles();
  const sellerData = props.data;
  return (
    <Box
      sx={{
        width: [300, 400, 800],
        boxShadow: "2px 3px 5px rgba(0,0,0,0.3)",
        borderRadius: "10px",
        cursor: "pointer",
        padding: "10px",
      }}
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
            src={sellerData.photo}
          />
          <Chip
            className={classes.root}
            icon={sellerData.isVerified ? <CheckIcon /> : <CancelIcon />}
            label={sellerData.isVerified ? "Verified" : "Not Verified"}
            color={sellerData.isVerified ? "success" : "error"}
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <PersonIcon />
          <p className={classes.root}>{sellerData.name}</p>
        </Stack>
        <Stack direction="row" spacing={2}>
          <InfoIcon />
          <p className={classes.root}>{sellerData.intro}</p>
        </Stack>
        <Stack direction="row" spacing={2}>
          <RatingIcon />
          <Rating
            name="text-feedback"
            value={sellerData.rating}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <p className={classes.root}>{labels[sellerData.rating]}</p>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <p className={classes.root}>Books Sold :</p>
            <Fab
              color="primary"
              aria-label="Total Books Sold"
              size="small"
              className={classes.root}
            >
              {sellerData.noOfBooksSold}
            </Fab>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <p className={classes.root}>Total Ratings Recieved : </p>
            <Fab
              color="primary"
              aria-label="Total Books Sold"
              size="small"
              className={classes.root}
            >
              {sellerData.noOfRatings}
            </Fab>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <p className={classes.root}>Total Reviews Recieved :</p>
            <Fab
              color="primary"
              aria-label="Total Books Sold"
              size="small"
              className={classes.root}
            >
              {sellerData.noOfReviews}
            </Fab>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <WalletIcon />
          <p className={classes.root}>Wallet Balance :</p>
          <Chip
            className={classes.root}
            label={sellerData.walletBalance}
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <IDIcon />
          <p className={classes.root}>User ID : </p>
          <Chip
            className={classes.root}
            label={sellerData.userId}
            color="secondary"
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <IDIcon />
          <p className={classes.root}>Seller ID : </p>
          <Chip
            className={classes.root}
            label={sellerData._id}
            color="secondary"
            size="small"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <UpdateIcon />
          <p className={classes.root}>Last Updated : </p>
          <p className={classes.root}>{sellerData.updatedAt.substr(0, 10)}</p>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TimeIcon />
          <p className={classes.root}>Joined : </p>
          <p className={classes.root}>{sellerData.createdAt.substr(0, 10)}</p>
        </Stack>
      </Stack>
    </Box>
  );
};
export default SellerProfile;
