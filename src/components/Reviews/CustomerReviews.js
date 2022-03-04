import { React, useState, useEffect, useRef, useCallback } from "react";
import axios from "../../axios";

// Components
import { Box, Stack } from "@mui/material";
import { Typography, Rating, CircularProgress, Slide } from "@mui/material";
import { IconButton } from "@mui/material";

// Icons
import StarIcon from "@mui/icons-material/StarRounded";
import ActiveIcon from "@mui/icons-material/FiberManualRecordRounded";
import NotActiveIcon from "@mui/icons-material/FiberManualRecordOutlined";

// Custom Components
import UpdateReview from "./UpdateReviews";

const Reviews = () => {
  //Funtionality States
  const [Loading, setLoading] = useState(true);

  // Data States
  const containerRef = useRef(null);
  const [Reviews, setReviews] = useState([]);
  const [ReviewIndex, setReviewIndex] = useState(0);
  const [ReviewLength, setReviewLength] = useState(1);

  // Getting Website Reviews
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getTopWebsiteReviews")
        .then((response) => {
          // console.log(response.data);
          setReviews(response.data);
          setReviewLength(response.data.length);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  // Custom Review Slider
  const ReviewSlider = (props) => {
    // Sliding Right
    const slideRight = useCallback(() => {
      setReviewIndex((ReviewIndex + 1) % ReviewLength);
    }, []);

    useEffect(() => {
      const myTimeout = setTimeout(slideRight, 10000);
      return () => {
        clearTimeout(myTimeout);
      };
    }, [slideRight]);
    return (
      <Slide
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
        direction={"left"}
        container={props.Ref}
      >
        <Box
          sx={{
            backgroundColor: "rgba(45, 90, 135,0.3)",
            height: 180,
            width: "100%",
            maxWidth: 300,
            borderRadius: "5px",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        >
          <Stack
            sx={{ width: "100%", padding: "10px", height: "100%" }}
            spacing={1}
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Typography variant="caption" sx={{ color: "yellow" }}>
              {Reviews[props.index]?.userName}
            </Typography>
            <Typography
              variant="caption"
              align="justify"
              sx={{
                fontSize: "12px",
                color: "lemonchiffon",
              }}
            >
              {Reviews[props.index]?.review.length > 200
                ? Reviews[props.index]?.review.substr(0, 200) + "..."
                : Reviews[props.index]?.review}
            </Typography>
            <Rating
              value={Reviews[props.index]?.rating}
              readOnly
              emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
              icon={<StarIcon fontSize="inherit" />}
              size="medium"
            />
          </Stack>
        </Box>
      </Slide>
    );
  };

  return (
    <Stack
      className="reviews"
      spacing={2}
      sx={{ backgroundColor: "#0a2540", padding: "10px", color: "white" }}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" align="center">
        <strong>What Customers say about us?</strong>
      </Typography>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={1}
        sx={{ width: "100%", overflowX: "hidden" }}
        ref={containerRef}
      >
        {Loading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            direction="row"
          >
            <Typography variant="caption">Loading...</Typography>
            <CircularProgress size={15} color="inherit" />
          </Stack>
        ) : (
          <>
            <ReviewSlider index={ReviewIndex} Ref={containerRef.current} />
            <Stack direction="row" spacing={1}>
              {Reviews.map((review, i) => (
                <IconButton key={review._id}>
                  {ReviewIndex === i ? (
                    <ActiveIcon
                      sx={{ height: 12, width: 12, color: "whitesmoke" }}
                    />
                  ) : (
                    <NotActiveIcon sx={{ height: 10, width: 10 }} />
                  )}
                </IconButton>
              ))}
            </Stack>
          </>
        )}
      </Stack>
      <UpdateReview />
    </Stack>
  );
};
export default Reviews;

// Very economical. I have purchased books thru bookshelf. which are at very low prices and are within one's budget. There are lot of varities of books on different topics. One can choose the books as per his choice. Moreover, payment facility for purchase of books is so easier that I make the payment easy.
