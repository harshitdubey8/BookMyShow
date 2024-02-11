import React from "react";
import "./Header.css";
import CustomButton from "./CustomButton";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LOGO from "../assets/logo.png";

function Header({ search, searchHandler, userData, setUser }) {
  const location = useLocation();

  const logout = () => {
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("username");
    setUser({});
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={LOGO} alt="BookMyShow Logo" />
      </Link>
      <input
        className="Search-bar"
        type="text"
        placeholder="Search for the movie"
        disabled={location.pathname !== "/"}
        value={search}
        onChange={searchHandler}
      />
      <button className="Search-button">
        <SearchIcon />
      </button>

      {!userData?.email && (
        <Link to="/login">
          <CustomButton text="login" />
        </Link>
      )}

      {!userData?.email && (
        <Link to="/SignUp">
          <CustomButton text="Register" />
        </Link>
      )}
      {userData?.userType === "Admin" && (
        <Link to="/Admin">
          <CustomButton text="Admin" />
        </Link>
      )}
      {!!userData?.email && <CustomButton onClick={logout} text="logout" />}
      {!!userData?.email && (
        <Link to="/Profile">
          <CustomButton text="User Profile" />
        </Link>
      )}

      <hr />
    </nav>
  );
}

export default Header;
