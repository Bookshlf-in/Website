import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../../Context/userContext";
import axios from "../../axios";

// Components
import { Stack, Avatar, Skeleton } from "@mui/material";
import { Alert, Rating, Button, IconButton } from "@mui/material";
import { TextField, Typography, CircularProgress } from "@mui/material";

// Icons
import StarIcon from "@mui/icons-material/StarRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import UpdateIcon from "@mui/icons-material/CachedRounded";

const Style1 = {
  fontWeight: "bolder",
};
const Style2 = {
  fontFamily: "Staatliches",
};

const Reviews = () => {
  const orderId = useParams().orderId;
  const [user] = useContext(UserContext);

  // Functionality States
  const [Load, setLoad] = useState(true);
  const [updateLoad, setupdateLoad] = useState(false);
  const [deleteLoad, setdeleteLoad] = useState(false);
  const [updated, setupdated] = useState(false);

  // Data States
  const [order, setorder] = useState({});
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getOrderDetails", {
          params: { orderId: orderId },
        })
        .then((order) => {
          setorder(order.data);
          axios
            .get("/getReview", {
              params: { orderId: orderId },
            })
            .then((response) => {
              setReview(response.data);
              setRating(response.data.rating);
              setDesc(response.data.review);
              setLoad(false);
            })
            .catch((error) => {
              setReview(null);
              setRating(0);
              setDesc("");
              setLoad(false);
            });
        })
        .catch((error) => {
          setLoad(false);
          // console.log(error.response.data);
        });
    };
    fetchData();
  }, [updated]);

  // Adding Review
  const handelAddReview = () => {
    setupdateLoad(true);
    if (review) {
      axios
        .post("/updateReview", {
          reviewId: review._id,
          rating: rating,
          review: desc,
        })
        .then(() => {
          setupdated(true);
          setupdateLoad(false);
          setTimeout(() => {
            setupdated(false);
          }, 5000);
        })
        .catch(() => {
          setupdateLoad(false);
        });
    } else {
      axios
        .post("/addReview", {
          orderId: orderId,
          rating: rating,
          review: desc,
        })
        .then(() => {
          setupdated(true);
          setupdateLoad(false);
          setTimeout(() => {
            setupdated(false);
          }, 5000);
        })
        .catch((error) => {
          // console.log(error.response.data);
          setupdateLoad(false);
        });
    }
  };

  // handeling review Delete
  const handelReviewDelete = () => {
    if (review) {
      setdeleteLoad(true);
      axios
        .delete("/deleteReview", {
          data: {
            reviewId: review._id,
          },
        })
        .then(() => {
          setdeleteLoad(false);
          setupdated(true);
          setupdateLoad(false);
          setTimeout(() => {
            setupdated(false);
          }, 5000);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Order Review | Bookshlf</title>
      </Helmet>
      {user ? (
        Load ? (
          <Stack
            spacing={2}
            sx={{ padding: "10px" }}
            justifyContent="center"
            alignItems="center"
          >
            <Skeleton variant="text" width={250} height={50} />
            <Stack
              sx={{
                borderRadius: "5px",
                border: "1px solid rgba(0,0,0,0.1)",
                width: "100%",
                padding: "10px",
              }}
              spacing={1}
            >
              <Skeleton variant="text" width={250} height={30} />
              <Skeleton variant="text" width={250} />
              <Skeleton variant="text" width={250} />
            </Stack>
            <Stack
              sx={{
                borderRadius: "5px",
                border: "1px solid rgba(0,0,0,0.1)",
                width: "100%",
                padding: "10px",
              }}
              spacing={1}
            >
              <Skeleton variant="text" width={250} height={30} />
              <Skeleton variant="rectangular" width={200} height={220} />
              <Skeleton variant="text" width={250} />
              <Rating
                defaultValue={0}
                emptyIcon={
                  <Skeleton variant="circular" height={30} width={30} />
                }
                readOnly
              />
              <Skeleton variant="rectangular" width="100%" height={50} />
              <Stack direction="row" spacing={3}>
                <Skeleton variant="rectangular" width={250} height={50} />
                <Skeleton variant="circular" width={50} height={50} />
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Stack
            spacing={2}
            sx={{ padding: "10px" }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h3" align="center" sx={Style2}>
              Add Your Reviews
            </Typography>
            <Stack
              sx={{
                borderRadius: "5px",
                border: "1px solid rgba(0,0,0,0.1)",
                width: "100%",
                padding: "10px",
              }}
              spacing={1}
            >
              <Typography variant="h5" sx={Style2}>
                Order Statistics
              </Typography>
              <Typography variant="caption" sx={Style1}>
                Order ID : {order._id}
              </Typography>
              <Typography variant="caption" sx={Style1}>
                Order Total : {order.orderTotal + " /-"}
              </Typography>
            </Stack>
            <Stack
              sx={{
                borderRadius: "5px",
                border: "1px solid rgba(0,0,0,0.1)",
                width: "100%",
                padding: "10px",
              }}
              spacing={1}
            >
              <Typography variant="h5" sx={Style2}>
                Review Order
              </Typography>
              <Avatar
                variant="rounded"
                sx={{ height: 220, width: 200 }}
                src={order.photo}
                alt=""
              />
              <Typography variant="caption" sx={Style1}>
                Book : {order.title}
              </Typography>
              {review ? (
                <Typography variant="h5" sx={Style2}>
                  Previous Review
                </Typography>
              ) : null}
              {review ? (
                <Rating
                  defaultValue={rating}
                  emptyIcon={
                    <StarIcon sx={{ opacity: 0.75 }} fontSize="inherit" />
                  }
                  icon={<StarIcon fontSize="inherit" />}
                  size="small"
                  readOnly
                />
              ) : null}
              {review ? (
                <Typography variant="body1" sx={Style1}>
                  Rating : {rating}
                </Typography>
              ) : null}
              {review ? (
                <Typography variant="body1" sx={Style1}>
                  Review : {desc}
                </Typography>
              ) : null}
              <Typography variant="h5" sx={Style2}>
                {review ? "Update Review" : "Add Review"}
              </Typography>
              <Rating
                value={rating}
                defaultValue={rating}
                emptyIcon={
                  <StarIcon sx={{ opacity: 0.75 }} fontSize="inherit" />
                }
                icon={<StarIcon fontSize="inherit" />}
                size="large"
                onChange={(e, newValue) => {
                  setRating(newValue);
                }}
              />
              <TextField
                variant="filled"
                label="Review"
                sx={{
                  "& label": Style2,
                  "& textarea": Style1,
                }}
                multiline
                maxRows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Stack direction="row" spacing={3}>
                <Button
                  endIcon={
                    updateLoad ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      <UpdateIcon />
                    )
                  }
                  sx={{ maxWidth: 250 }}
                  variant="contained"
                  onClick={handelAddReview}
                  disabled={updateLoad}
                >
                  Update Review
                </Button>
                <IconButton
                  color="error"
                  onClick={handelReviewDelete}
                  disabled={review === null}
                >
                  {deleteLoad ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
                {updated ? (
                  <Alert severity="success">Opertation Successfull!</Alert>
                ) : null}
              </Stack>
            </Stack>
          </Stack>
        )
      ) : (
        <Alert severity="error" sx={{ fontFamily: "PT sans" }}>
          Accessing UnAuthorised Route. Login or Go Back!
        </Alert>
      )}
    </>
  );
};
export default Reviews;
