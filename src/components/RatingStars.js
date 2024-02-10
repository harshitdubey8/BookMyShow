import React from "react";
import "./RatingStars.css";

const RatingStars = ({ rating }) => {
  // Round the rating to the nearest 0.5
  const roundedRating = Math.round(rating * 2) / 2;

  // Determine the number of full and half stars
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating % 1 !== 0;

  // Generate an array to render stars
  const starsArray = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return (
        <span key={index} className="star full-star">
          &#9733;
        </span>
      );
    } else if (halfStar && index === fullStars) {
      return (
        <span key={index} className="star half-star">
          &#9733;
        </span>
      );
    } else {
      return (
        <span key={index} className="star empty-star">
          &#9734;
        </span>
      );
    }
  });

  return <div className="rating-stars">{starsArray}</div>;
};

export default RatingStars;
