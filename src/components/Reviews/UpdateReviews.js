import { React, useState, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import axios from "../../axios";

import {
  Stack,
  Collapse,
  TextField,
  Alert,
  Button,
  CircularProgress,
  Typography,
  Rating,
} from "@mui/material";

// Icons
import DownIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import UpIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import UpdateIcon from "@mui/icons-material/FileUploadTwoTone";
import StarIcon from "@mui/icons-material/StarRounded";

const responses = [
  "Hated it",
  "Don't like it",
  "Just OK",
  "Liked it",
  "Loved It",
];

const UpdateReviews = () => {
  const history = useHistory();

  // User Context
  const [user] = useContext(UserContext);
  const [updateLoad, setupdateLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, sethover] = useState(5);
  const [desc, setDesc] = useState("");
  const [ratings, setRatings] = useState(5);
  const [updated, setupdated] = useState(false);

  // Adding Website Review
  const handelAddReview = () => {
    setupdateLoading(true);
    axios
      .post("/updateWebsiteReview", {
        rating: ratings,
        review: desc,
      })
      .then((response) => {
        setupdateLoading(false);
        setupdated(true);
        setTimeout(() => {
          setupdated(false);
        }, 5000);
      })
      .catch((error) => {
        setupdateLoading(false);
        // setupdated(true);
      });
  };

  return (
    <Stack spacing={2} sx={{ minWidth: 250 }}>
      <Button
        variant="contained"
        sx={{ maxWidth: 400 }}
        endIcon={user ? open ? <UpIcon /> : <DownIcon /> : <> </>}
        onClick={() => {
          if (user) setOpen((prev) => !prev);
          else history.push("/Login");
        }}
        color="warning"
        size="small"
      >
        {user ? "Add Your Review" : "Login To Add Your Review"}
      </Button>
      <Collapse in={open} timeout={500} sx={{ width: "100%", maxWidth: 350 }}>
        <Stack
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            padding: "10px",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <Typography variant="caption">Rating</Typography>
          <Rating
            defaultValue={ratings}
            emptyIcon={<StarIcon sx={{ opacity: 0.9 }} fontSize="inherit" />}
            icon={<StarIcon fontSize="inherit" />}
            size="small"
            onChange={(event, newValue) => {
              setRatings(newValue);
            }}
            onChangeActive={(event, newHover) => {
              sethover(newHover);
            }}
          />
          <Typography variant="caption">
            {responses[hover - 1] || responses[ratings - 1]}
          </Typography>
          <TextField
            variant="filled"
            label="Review"
            color="warning"
            size="small"
            fullWidth
            sx={{
              "& label": { fontFamily: "PT sans", color: "white" },
              "& textarea": { color: "white", fontSize: "12px" },
            }}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            multiline
            maxRows={5}
          />
          <Button
            endIcon={
              updateLoad ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                <UpdateIcon />
              )
            }
            disabled={updateLoad}
            variant="contained"
            color="primary"
            size="small"
            onClick={handelAddReview}
          >
            Submit
          </Button>
          {updated ? (
            <Alert
              size="small"
              variant="outlined"
              sx={{ padding: "5px 10px", color: "greenyellow" }}
            >
              <Typography variant="caption">
                Review Updated SuccessFully!
              </Typography>
            </Alert>
          ) : null}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default UpdateReviews;
