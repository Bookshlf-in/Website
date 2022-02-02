import { React, useState } from "react";
import { makeStyles } from "@mui/styles";

// components
import { Stack, Box, Chip, Avatar } from "@mui/material";
import { Rating, Fab, Tooltip, Typography } from "@mui/material";

// icons
import InfoIcon from "@mui/icons-material/InfoRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import PersonIcon from "@mui/icons-material/PersonRounded";
import IDIcon from "@mui/icons-material/AssignmentIndRounded";
import UpdateIcon from "@mui/icons-material/UpdateRounded";
import TimeIcon from "@mui/icons-material/TimelapseRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import RatingIcon from "@mui/icons-material/StarsRounded";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/FileCopy";
import CallIcon from "@mui/icons-material/CallRounded";

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

// Custom Copy Component
const CopyableText = (props) => {
  const [copied, setcopied] = useState(false);

  const CopyText = () => {
    navigator.clipboard.writeText(props.text);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 3000);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        cursor: "pointer",
        padding: "5px 10px",
        borderRadius: "5px",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="caption" color={copied ? "primary" : "default"}>
        {props.text}
      </Typography>
      <Tooltip
        arrow
        title="Click to Copy"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" onClick={CopyText}>
          {!copied ? (
            <CopyIcon color="inhert" sx={{ height: 12, width: 12 }} />
          ) : (
            <CopiedIcon color="inhert" sx={{ height: 12, width: 12 }} />
          )}
        </Typography>
      </Tooltip>

      {copied ? (
        <Typography sx={{ fontSize: "9px" }} color="primary">
          Copied!
        </Typography>
      ) : null}
    </Stack>
  );
};
const SellerProfile = (props) => {
  const classes = useStyles();

  const sellerData = props.data;
  return (
    <Box
      sx={{
        width: [300, 400, 800],
        border: "1px solid rgba(0,0,0,0.3)",
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
          <IDIcon />
          <CopyableText text={sellerData._id} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <CallIcon />
          <CopyableText text={sellerData.phoneNo} />
          <CopyableText text={sellerData.altPhoneNo} />
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
          <CopyableText text={sellerData.userId} />
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
