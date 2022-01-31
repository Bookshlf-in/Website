import { React, useState, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet-async";
import axios from "../../axios";

// Components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";

// icons
import RatingIcon from "@mui/icons-material/GradeTwoTone";
import ReviewsIcon from "@mui/icons-material/ReviewsTwoTone";
import StarIcon from "@mui/icons-material/StarRounded";
import RightIcon from "@mui/icons-material/ChevronRightRounded";
import LeftIcon from "@mui/icons-material/ChevronLeftRounded";

const useStyles = makeStyles(() => ({
  root: {
    "& label": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& ul": {
      "& button": {
        fontFamily: "PT sans !important",
      },
    },
  },
  review: {
    fontFamily: "Montserrat",
    color: "whitesmoke !important",
  },
}));

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const SellerReviews = (props) => {
  const classes = useStyles();
  const [reviews, setReviews] = useState(
    props.reviews.data ? props.reviews.data : []
  );
  const [currReview, setcurrReview] = useState(0);
  const [maxReviews, setmaxReviews] = useState(
    reviews.length ? reviews.length : 1
  );
  const [slidein, setslidein] = useState(true);
  const containerRef = useRef(null);

  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(props.reviews.totalPages);

  // const Get More Reviews
  const getSellerReviews = (PageNo) => {
    axios
      .get("/getSellerReviews", {
        params: {
          sellerId: props.sellerId,
          page: PageNo,
        },
      })
      .then((response) => {
        setPage(PageNo);
        setReviews(response.data.data);
        settotalPages(response.data.totalPages);
      });
  };

  // Custom Review SLider
  const ReviewComponent = (props) => {
    return (
      <Slide
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={500}
        direction={props.dir}
        container={props.Ref}
      >
        <Box
          sx={{
            backgroundColor: "#2d5a87",
            height: 200,
            width: 250,
            borderRadius: "10px",
          }}
        >
          <Stack sx={{ width: "100%", padding: "10px" }} spacing={2}>
            <Typography className={classes.review} variant="caption">
              {reviews[props.index]?.customerName}
            </Typography>
            <Typography
              className={classes.review}
              variant="caption"
              align="justify"
            >
              {reviews[props.index]?.review}
            </Typography>
            <Rating
              value={reviews[props.index]?.rating}
              readOnly
              emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
              icon={<StarIcon fontSize="inherit" />}
              size="small"
            />

            <Typography
              className={classes.review}
              variant="caption"
              align="right"
            >
              {reviews[props.index]?.updatedAt.substr(0, 10)}
            </Typography>
          </Stack>
        </Box>
      </Slide>
    );
  };
  return (
    <>
      <Helmet>
        <title>Your Reviews | Bookshlf</title>
      </Helmet>
      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", overflowX: "hidden" }}
      >
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ fontFamily: "Staatliches" }}>
            Overall Rating
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Rating
              value={props.reviews.rating}
              readOnly
              emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
              size="small"
            />
            <Typography className={classes.root} variant="caption">
              ({props.reviews.rating})
            </Typography>
            <Typography className={classes.root} variant="caption">
              {labels[props.reviews.rating]}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography sx={{ fontFamily: "Staatliches" }} variant="h5">
            Statistics
          </Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            <RatingIcon fontSize="small" />
            <Rating
              value={props.reviews.rating}
              readOnly
              emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
              size="small"
            />
            <Typography variant="caption" className={classes.root}>
              <strong>({props.reviews.rating})</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <RatingIcon fontSize="small" />
            <Typography variant="caption">
              <strong>Total Times Rated : {props.reviews.noOfRatings}</strong>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <ReviewsIcon fontSize="small" />
            <Typography variant="caption">
              <strong>
                Total Reviews Recieved: {props.reviews.noOfReviews}
              </strong>
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Stack
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              aria-label="slide-left"
              onClick={() => {
                setcurrReview((prev) => {
                  if (prev === 0) return maxReviews - 1;
                  return prev - 1;
                });
                setslidein(false);
              }}
              color="primary"
            >
              <LeftIcon />
            </IconButton>
            <Box
              sx={{
                height: 200,
                width: 250,
                borderRadius: "10px",
              }}
              ref={containerRef}
            >
              <ReviewComponent
                dir={slidein ? "left" : "right"}
                index={currReview}
                Ref={containerRef.current}
              />
            </Box>

            <IconButton
              aria-label="slide-right"
              onClick={() => {
                setcurrReview((prev) => (prev + 1) % maxReviews);
                setslidein(true);
              }}
              color="primary"
            >
              <RightIcon />
            </IconButton>
          </Stack>
          <Pagination
            className={classes.root}
            count={totalPages}
            size="small"
            onChange={(e, pageNo) => getSellerReviews(pageNo)}
            page={page}
          />
        </Stack>
      </Stack>
    </>
  );
};
export default SellerReviews;
