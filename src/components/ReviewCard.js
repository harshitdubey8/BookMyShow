import React from "react";
import "./ReviewCard.css";

const ReviewCard = ({ username, message }) => {
  return (
    <div className="review-card">
      <h3 className="username">{username}</h3>
      <p className="review-message">{message}</p>
    </div>
  );
};

export default ReviewCard;
