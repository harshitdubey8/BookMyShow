import React from "react";
import "./Header.css";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
function Header() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src="logo.png" alt="BookMyShow Logo" />
      </Link>
      <input
        className="Search-bar"
        type="text"
        placeholder="Search for the movie "
      />
      <button className="Search-button">
        <SearchIcon />
      </button>

      <select className="location">
        <option value="">Select Location</option>
        <option value="location1">Delhi</option>
        <option value="location2">Mumbai</option>
        <option value="location3">Pune</option>
      </select>
      <Link to="/login">
        <CustomButton text="login" />
      </Link>

      <Link to="/SignUp">
        <CustomButton text="SignUp" />
      </Link>
      <hr />
    </nav>
  );
}

export default Header;
