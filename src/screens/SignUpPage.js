import React, { useState } from "react";
import "./SignUpPage.css";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // TODO :: user already Exists Fix
  const onSignIn = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !phoneNo) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    let url = "http://localhost:80/api/register";
    let userObj = {
      username: username,
      email: email,
      password: password,
      userType: "customer",
      phoneNo: phoneNo,
      profilePicUrl:
        "https://cdn4.vectorstock.com/i/1000x1000/08/38/avatar-icon-male-user-person-profile-symbol-vector-20910838.jpg",
    };

    axios
      .post(url, userObj)
      .then((resData) => {
        console.log(resData);
        if (resData.data.message === "User already exists") {
          setResult("User already Exists");
        } else {
          sessionStorage.setItem("userName", username);
          sessionStorage.setItem("userEmail", email);
          setResult("User Created Successfully");
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.error("Error during SignUp:", error);

        setResult("An error occurred during login : ", error);
      });
  };

  return (
    <div className="SignUpScreen">
      <form className="SignUpCard">
        <h2>Sign up to get Started</h2>
        <input
          className="InputField"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="InputField"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="InputField"
          placeholder="Phone"
          type="number"
          value={phoneNo}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="InputField"
          placeholder="profileUrl"
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <input
          className="InputField"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomButton text="signUp" onClick={onSignIn} type="submit" />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>{result}</p>
      </form>
    </div>
  );
}

export default SignUpPage;
