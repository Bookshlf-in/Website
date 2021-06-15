import React, { useState, useEffect } from "react";
import "./Display.css";
import { Link } from "react-router-dom";
import AddReviews from "../AddReviews/AddReviews"
import Reviews from "../Reviews/Reviews";

export default function Display() {
  let initRating;
  if (localStorage.getItem("reviews") === null) {
    initRating = [];
  } else {
    initRating = JSON.parse(localStorage.getItem("reviews"));
  }

  const [reviews, setreviews] = useState("");

  const addreview = (rating, desc) => {
    console.log("i'm adding this rating", rating, desc);

    const myreview = {
      rating: rating,
      desc: desc,
    };

    setreviews([...reviews, myreview]);
    console.log(myreview);
  };

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  });

  return (
    <div>
      <AddReviews addrating={addreview} />
      <Reviews reviews={reviews}/>
    </div>
  );
}
