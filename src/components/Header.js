import React from "react";
import "./Header.css";
import CustomButton from "./CustomButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LOGO from "../assets/logo.png";

function Header({ search, searchHandler, userData, setUser }) {
  const location = useLocation();
  let navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("username");
    setUser({});
    navigate("/login", { replace: true });
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
      {!userData?.email && (
        <Link to="/AdminReg">
          <CustomButton text="Admin Registration" />
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
          <CustomButton text="User Profile / Bookings" />
        </Link>
      )}

      <hr />
    </nav>
  );
}

export default Header;
