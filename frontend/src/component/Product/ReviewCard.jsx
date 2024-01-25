import React from "react";
import profilePng from "../images/profilePng.png";
import { Rating } from "@material-ui/lab";
const ReviewCard = ({ review }) => {
  // options for react stars

  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
