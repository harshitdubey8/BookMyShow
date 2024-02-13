import React from "react";
import "./BookingCard.css";

const BookingCard = ({ bookingObj }) => {
  return (
    <div className="BookingsCard">
      <p>Movie Title : {bookingObj.movieId?.movieTitle}</p>
      <p>Genre : {bookingObj.movieId?.genre}</p>
      <p> Theatre Name : {bookingObj.theatreId?.theatreName}</p>
      <p> Number of Tickets : {bookingObj.seats}</p>
      <p> Price Paid :{bookingObj.grandTotal}</p>
    </div>
  );
};

export default BookingCard;
