import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "../../api/axios";

// Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

// Icons
import PersonIcon from "@mui/icons-material/PersonTwoTone";
import DateRangeIcon from "@mui/icons-material/DateRangeTwoTone";
import InfoIcon from "@mui/icons-material/InfoTwoTone";
import RatingIcon from "@mui/icons-material/GradeTwoTone";
import BookSoldIcon from "@mui/icons-material/LocalShippingTwoTone";
import ReviewsIcon from "@mui/icons-material/ReviewsTwoTone";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";

const SellerProfile = (props) => {
  const sellerId = useParams().sellerId;

  // Functionality States
  const [Load, setLoad] = useState(true);
  const [err, setErr] = useState(false);

  // Data States
  const [seller, setseller] = useState({});

  useEffect(() => {
    const Fetch = () => {
      axios
        .get("/getSellerProfile", {
          params: {
            sellerId: sellerId,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setseller(response.data);
          setLoad(false);
        })
        .catch((error) => {
          setErr(true);
          setLoad(false);
        });
    };
    Fetch();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${seller?.name}`} | Bookshlf</title>
      </Helmet>
      {Load ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "24px" }}
        >
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
                <Skeleton
                  variant="circular"
                  height={100}
                  width={100}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  height={25}
                  width={100}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  height={25}
                  width={200}
                  animation="wave"
                />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Skeleton variant="circular" height={30} width={30} />
                <Skeleton variant="text" width={200} animation="wave" />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Skeleton variant="circular" height={30} width={30} />
                <Skeleton variant="text" width={200} animation="wave" />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Skeleton variant="circular" height={30} width={30} />
                <Skeleton variant="text" width={200} animation="wave" />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Skeleton variant="circular" height={30} width={30} />
                <Skeleton variant="text" width={200} animation="wave" />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Skeleton variant="circular" height={30} width={30} />
                <Skeleton variant="text" width={200} animation="wave" />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Skeleton variant="circular" height={30} width={30} />
                <Skeleton variant="text" width={200} animation="wave" />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Skeleton variant="circular" height={30} width={30} />
                <Skeleton variant="text" width={200} animation="wave" />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <>
          {!err ? (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ padding: "24px" }}
            >
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
                      src={seller.photo}
                      alt={seller.name}
                      sx={{ height: 100, width: 100 }}
                    />
                    {seller.isVerified && (
                      <Chip
                        icon={<CheckIcon />}
                        label="Verified"
                        color="success"
                        size="small"
                        variant="filled"
                      />
                    )}
                    <Chip
                      label={seller._id}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <PersonIcon fontSize="small" />
                    <Typography variant="caption">
                      <strong>{seller.name}</strong>
                    </Typography>
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <InfoIcon fontSize="small" />
                    <Typography variant="caption">
                      <strong>{seller.intro}</strong>
                    </Typography>
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <RatingIcon fontSize="small" />
                    <Rating readOnly value={seller.rating} size="small" />
                    <Typography variant="caption">
                      <strong>{seller.rating}</strong>
                    </Typography>
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <RatingIcon fontSize="small" />
                    <Typography variant="caption">
                      <strong>Total Times Rated : {seller.noOfRatings}</strong>
                    </Typography>
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <ReviewsIcon fontSize="small" />
                    <Typography variant="caption">
                      <strong>
                        Total Reviews Recieved: {seller.noOfReviews}
                      </strong>
                    </Typography>
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <BookSoldIcon fontSize="small" />
                    <Typography variant="caption">
                      <strong>Total Books Sold : {seller.noOfBooksSold}</strong>
                    </Typography>
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <DateRangeIcon fontSize="small" />
                    <Typography variant="caption">
                      <strong>{seller.createdAt?.substr(0, 4)}</strong>
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Alert severity="error">
              {" "}
              Some Error Occured. Please Reload Again!
            </Alert>
          )}
        </>
      )}
    </>
  );
};
export default SellerProfile;
