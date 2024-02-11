import React from "react";
import "./SuccessScreen.css"; // Import CSS file for styling
import CustomButton from "../CustomButton";
import { useNavigate } from "react-router-dom";

const SuccessScreen = () => {
  let navigate = useNavigate();

  const home = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="booking-success-container">
      <div className="BookingCard">
        <h2>Booking Successful!</h2>
        <p>Your booking was successful.</p>
        <CustomButton text="Go To HomeScreen" onClick={home} />
      </div>
    </div>
  );
};

export default SuccessScreen;
