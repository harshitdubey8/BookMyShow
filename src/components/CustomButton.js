import React from "react";
import "./CustomButton.css";
function CustomButton({ type, text, onClick, size = "default" }) {
  return (
    <button className={`CustomButton ${size}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default CustomButton;
