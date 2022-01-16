import { React, useState, useEffect } from "react";
import "./AddReviews.css";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const Reviews = () => {
  const params = useParams();
  const [desc, setdesc] = useState("");
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);
  const [order, setorder] = useState(null);
  const [rate, setrate] = useState("Rating Required");
  const [reviewId, setreviewId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getOrderDetails", {
          params: { orderId: params.orderId },
        })
        .then((response) => {
          setorder(response.data);
        })
        .catch((error) => {
          // console.log(error.response.data);
        });
      axios
        .get("/getReview", {
          params: { orderId: params.orderId },
        })
        .then((response) => {
          // console.log(response.data);
          setdesc(response.data.review);
          setrating(response.data.rating);
          sethover(response.data.rating);
          setreviewId(response.data._id);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};
export default Reviews;
