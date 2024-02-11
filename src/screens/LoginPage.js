import React, { useState } from "react";
import "./LoginPage.css";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({ getUserDetails }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();

    // checking if the fields are not empty
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    let url = "http://localhost:80/api/login";

    let userObj = {
      email: email,
      password: password,
    };

    axios
      .post(url, userObj)
      .then((resData) => {
        console.log(resData);
        if (resData.data.message === "User already exists") {
          sessionStorage.setItem("userEmail", email);
          getUserDetails(email);
          navigate("/", { replace: true });
        } else {
          setResult("Invalid User Id or Password");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);

        setResult("An error occurred during login : ", error);
      });
  };

  return (
    <div className="LoginScreen">
      <form className="LoginCard">
        <h2>Login</h2>
        <input
          className="InputField"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="InputField"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <a href="#">Forgot Password </a>
        <CustomButton
          text="Login"
          onClick={onLogin}
          type="submit"
          size="large"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>{result}</p>
      </form>
    </div>
  );
}

export default LoginPage;
