import { React, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

// Icons
import PersonIcon from "@mui/icons-material/PersonTwoTone";
import DateRangeIcon from "@mui/icons-material/DateRangeTwoTone";
import InfoIcon from "@mui/icons-material/InfoTwoTone";
import RatingIcon from "@mui/icons-material/GradeTwoTone";
import BookSoldIcon from "@mui/icons-material/LocalShippingTwoTone";
import ReviewsIcon from "@mui/icons-material/ReviewsTwoTone";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import ExpandIcon from "@mui/icons-material/ExpandCircleDownTwoTone";
import CollapseIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import CameraIcon from "@mui/icons-material/AddAPhotoRounded";
import UploadIcon from "@mui/icons-material/FileUploadTwoTone";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans !important",
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

const AccountDetails = (props) => {
  const classes = useStyles();
  // Functionality States
  const [updateLoad, setupdateLoad] = useState(false);
  const [open, setopen] = useState(false);

  // Data States
  const [Photo, setPhoto] = useState(null);
  const [Name, setName] = useState("");
  const [About, setAbout] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [altphoneNo, setaltphoneNo] = useState("");
  const [Image, setImage] = useState("/images/user.png");
  const [sellerDetails, setsellerDetails] = useState({
    Name: props.seller.name,
    Intro: props.seller.intro,
    Photo: props.seller.photo,
    NoOfBooksSold: props.seller.noOfBooksSold,
    Rating: props.seller.rating,
    NoOfRatings: props.seller.noOfRatings,
    NoOfReviews: props.seller.noOfReviews,
    IsVerified: props.seller.isVerified,
    ID: props.seller._id,
    CreatedAt: props.seller.createdAt,
    UpdatedAt: props.seller.updatedAt,
  });

  return (
    <Stack justifyContent="center" alignItems="center">
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          border: "1px solid rgba(0,0,0,0.4)",
          borderRadius: "10px",
        }}
      >
        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <Stack
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src={sellerDetails.Photo}
              alt={sellerDetails.Name}
              sx={{ height: 100, width: 100 }}
            />
            <Chip
              label={sellerDetails.IsVerified ? "Verified" : "Not Verified"}
              color={sellerDetails.IsVerified ? "success" : "error"}
              size="small"
              variant="outlined"
              icon={sellerDetails.IsVerified ? <CheckIcon /> : <CancelIcon />}
              sx={{ fontFamily: "PT sans", letterSpacing: "1px" }}
            />
            <Chip
              label={sellerDetails.ID}
              color="primary"
              size="small"
              variant="outlined"
              icon={
                <Typography
                  variant="caption"
                  sx={{ fontFamily: "PT sans", fontSize: "12px !important" }}
                >
                  ID :{" "}
                </Typography>
              }
              sx={{ fontFamily: "PT sans", letterSpacing: "1px" }}
            />
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <PersonIcon fontSize="small" />
            <Typography variant="caption">
              <strong>{sellerDetails.Name}</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <InfoIcon fontSize="small" />
            <Typography variant="caption">
              <strong>{sellerDetails.Intro}</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <RatingIcon fontSize="small" />
            <Rating readOnly value={sellerDetails.Rating} size="small" />
            <Typography variant="caption">
              <strong>{sellerDetails.Rating}</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <RatingIcon fontSize="small" />
            <Typography variant="caption">
              <strong>Total Times Rated : {sellerDetails.Rating}</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <ReviewsIcon fontSize="small" />
            <Typography variant="caption">
              <strong>
                Total Reviews Recieved: {sellerDetails.NoOfBooksSold}
              </strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <BookSoldIcon fontSize="small" />
            <Typography variant="caption">
              <strong>Total Books Sold : {sellerDetails.NoOfBooksSold}</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <DateRangeIcon fontSize="small" />
            <Typography variant="caption">
              <strong>{sellerDetails.CreatedAt.substr(0, 4)}</strong>
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              endIcon={open ? <CollapseIcon /> : <ExpandIcon />}
              variant="outlined"
              color="warning"
              onClick={() => setopen((prev) => !prev)}
              sx={{ fontFamily: "PT sans" }}
            >
              Update Profile
            </Button>
            <Collapse
              in={open}
              sx={{
                width: "100%",
                maxWidth: 400,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid rgba(0,0,0,0.4)",
                  borderRadius: "10px",
                }}
              >
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{ width: "100%" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar sx={{ height: 100, width: 100 }} />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <CameraIcon />
                  </IconButton>
                  <TextField
                    className={classes.root}
                    variant="filled"
                    fullWidth
                    size="small"
                    label="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    className={classes.root}
                    variant="filled"
                    fullWidth
                    size="small"
                    label="About"
                    value={About}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <TextField
                    className={classes.root}
                    variant="filled"
                    fullWidth
                    size="small"
                    label="Phone Number"
                    type="number"
                    value={phoneNo}
                    onChange={(e) => setphoneNo(e.target.value)}
                  />
                  <TextField
                    className={classes.root}
                    variant="filled"
                    fullWidth
                    size="small"
                    label="Alternate Phone Number"
                    type="number"
                    value={altphoneNo}
                    onChange={(e) => setaltphoneNo(e.target.value)}
                  />
                  <LoadingButton
                    loading={updateLoad}
                    loadingPosition="end"
                    endIcon={<UploadIcon />}
                    variant="contained"
                    color="warning"
                    sx={{ fontFamily: "PT sans" }}
                  >
                    Update Details
                  </LoadingButton>
                </Stack>
              </Box>
            </Collapse>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
export default AccountDetails;
