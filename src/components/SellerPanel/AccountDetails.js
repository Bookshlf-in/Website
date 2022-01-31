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
import Alert from "@mui/material/Alert";

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
      fontSize: "12px !important",
    },
    "& textarea": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
  },
}));

const AccountDetails = (props) => {
  const classes = useStyles();

  // Functionality States
  const [updateLoad, setupdateLoad] = useState(false);
  const [open, setopen] = useState(false);
  const [nameError, setnameError] = useState(false);
  const [phoneError, setphoneError] = useState(false);
  const [imgError, setimgError] = useState(false);
  const [updated, setupdated] = useState(false);

  // Data States
  const [Photo, setPhoto] = useState(null);
  const [Name, setName] = useState(props.seller.name);
  const [About, setAbout] = useState(props.seller.intro);
  const [phoneNo, setphoneNo] = useState("");
  const [altphoneNo, setaltphoneNo] = useState("");
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

  // Image Size Validator
  const validateSize = (file) => {
    const fileSize = file.size / 1024 / 1024; // in MiB
    if (fileSize > 5) return false;
    return true;
  };

  // showing profile image
  const handelProfileImageAdd = (e) => {
    setPhoto(e.target.files[0]);
  };

  // uploading single image File
  const uploadSingleImage = async (img) => {
    const formData = new FormData();
    formData.append("folder", "sellerProfile");
    formData.append("file", img);

    const result = await axios({
      method: "post",
      url: "/uploadFile",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data.link;
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
    return result;
  };

  // updating Profile
  const handelUpdateProfile = async () => {
    setupdateLoad(true);
    if (Name.length > 3) {
      if (phoneNo.length >= 10 && phoneNo.length <= 12) {
        if (Photo) {
          if (validateSize(Photo)) {
            const ProfileImgLink = await uploadSingleImage(Photo);
            // console.log(ProfileImgLink);
            axios
              .post("/updateSellerProfile", {
                name: Name,
                intro: About,
                photo: ProfileImgLink,
                phoneNo: Number(phoneNo),
                altPhoneNo: Number(altphoneNo),
              })
              .then((response) => {
                // profile updated successfully
                setupdated(true);
                setupdateLoad(false);
                setsellerDetails({
                  ...sellerDetails,
                  Name: Name,
                  Intro: About,
                  Photo: ProfileImgLink,
                });
                setTimeout(() => {
                  setupdated(false);
                  setopen((prev) => !prev);
                }, 5000);
              })
              .catch((error) => {
                // some error occured
                setupdateLoad(false);
                // console.log(error.response.data);
              });
          } else {
            setimgError(true);
          }
        } else {
          axios
            .post("/updateSellerProfile", {
              name: Name,
              intro: About,
              phoneNo: Number(phoneNo),
              altPhoneNo: Number(altphoneNo),
            })
            .then((response) => {
              // profile updated successfully
              setupdated(true);
              // console.log(response.data);
              setupdateLoad(false);
              setsellerDetails({
                ...sellerDetails,
                Name: Name,
                Intro: About,
              });
              setTimeout(() => {
                setupdated(false);
                setopen((prev) => !prev);
              }, 5000);
            })
            .catch((error) => {
              // some error occured
              setupdateLoad(false);
              // console.log(error.response.data);
            });
        }
      } else {
        setupdateLoad(false);
        setphoneError(true);
        setTimeout(() => {
          setphoneError(false);
        }, 5000);
      }
    } else {
      setupdateLoad(false);
      setnameError(true);
      setTimeout(() => {
        setnameError(false);
      }, 5000);
    }
  };
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
        <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
          <Stack
            spacing={1}
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
              sx={{ fontFamily: "Roboto" }}
            />
            <Chip
              label={sellerDetails.ID}
              color="primary"
              size="small"
              variant="outlined"
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
              <strong>Total Times Rated : {sellerDetails.NoOfRatings}</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <ReviewsIcon fontSize="small" />
            <Typography variant="caption">
              <strong>
                Total Reviews Recieved: {sellerDetails.NoOfReviews}
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
                  <Avatar
                    src={Photo ? URL.createObjectURL(Photo) : ""}
                    alt={Name}
                    sx={{ height: 100, width: 100 }}
                  />
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
                      id="icon-button-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handelProfileImageAdd}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload-picture"
                      component="span"
                    >
                      <CameraIcon />
                    </IconButton>
                  </label>
                  {imgError ? (
                    <Alert
                      severity="error"
                      size="small"
                      className={classes.root}
                    >
                      Image File Size Cannot exceed 5MB
                    </Alert>
                  ) : null}
                  <TextField
                    className={classes.root}
                    variant="filled"
                    fullWidth
                    size="small"
                    label="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    error={nameError}
                    helperText={
                      nameError ? "Name should have Atleast 3 Characters" : null
                    }
                  />
                  <TextField
                    className={classes.root}
                    variant="filled"
                    fullWidth
                    size="small"
                    label="About"
                    value={About}
                    onChange={(e) => setAbout(e.target.value)}
                    multiline
                    maxRows={3}
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
                    error={phoneError}
                    helperText={
                      phoneError
                        ? "Phone Number Invalid or Not Supported"
                        : null
                    }
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
                  {updated ? (
                    <Alert color="success" className={classes.root}>
                      Profile Updated Successfully.
                    </Alert>
                  ) : null}
                  <LoadingButton
                    loading={updateLoad}
                    loadingPosition="end"
                    endIcon={<UploadIcon />}
                    variant="contained"
                    color="warning"
                    sx={{ fontFamily: "PT sans" }}
                    onClick={handelUpdateProfile}
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
