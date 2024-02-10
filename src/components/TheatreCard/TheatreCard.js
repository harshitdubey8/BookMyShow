import React from "react";
import CustomButton from "../CustomButton";
import "./TheatreCard.css";

function TheatreCard({ name, location, price, onClick }) {
  return (
    <div className="TheatreCardContainer">
      <div className="TheatreData">
        <h2 className="CardHeading"> {name}</h2>
        <h2 className="CardSubHeading">{location}</h2>
      </div>
      <h2 className="CardSubHeading">{price} / per person</h2>
      <CustomButton text="Book Tickets" onClick={onClick} />
    </div>
  );
}

export default TheatreCard;
