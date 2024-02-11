import React, { useEffect, useState } from "react";
import "./Header.css";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LOGO from "../assets/logo.png";

function Header({ search, searchHandler }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("userEmail");
    setUser(userLoggedIn);
  }, [setUser]);

  const logout = () => {
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("username");
    setUser("");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={LOGO} alt="BookMyShow Logo" />
      </Link>
      <input
        className="Search-bar"
        type="text"
        value={search}
        onChange={searchHandler}
        placeholder="Search for the movie "
      />
      <button className="Search-button">
        <SearchIcon />
      </button>

      {!user && (
        <Link to="/login">
          <CustomButton text="login" />
        </Link>
      )}

      {!user && (
        <Link to="/SignUp">
          <CustomButton text="SignUp" />
        </Link>
      )}
      <Link to="/Admin">
        <CustomButton text="Admin" />
      </Link>
      {!!user && <CustomButton onClick={logout} text="logout" />}
      {!!user && (
        <Link to="/Profile">
          <CustomButton text="User Profile" />
        </Link>
      )}

      <hr />
    </nav>
  );
}

export default Header;
