import React from "react";
import { useParams } from "react-router-dom";

function BookingScreen() {
  let { movieId, theatreId } = useParams();
  return (
    <div>
      {movieId} {theatreId}
    </div>
  );
}

export default BookingScreen;
