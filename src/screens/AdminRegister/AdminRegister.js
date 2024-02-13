import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import "./AdminRegister.css";

function AdminRegister({ getUserDetails }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
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
      userType: "Admin",
      phoneNo: phoneNo,
      profilePicUrl:
        "https://cdn4.vectorstock.com/i/1000x1000/08/38/avatar-icon-male-user-person-profile-symbol-vector-20910838.jpg",
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer,
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
          getUserDetails(email);
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
        <h2>Admin Account Registration</h2>
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
        <select
          className="InputField"
          name="securityQuestion"
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
        >
          <option value="">Select Security Question</option>
          <option value="In what city were you born ?">
            In what city were you born
          </option>
          <option value="What high school did you attend ?">
            What high school did you attend
          </option>
          <option value="What is your Favorite Color ?">
            What is your Favorite Color
          </option>
        </select>
        <input
          className="InputField"
          placeholder="Security Answer"
          type="text"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
        <input
          className="InputField"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomButton
          text="Register"
          onClick={onSignIn}
          size="large"
          type="submit"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>{result}</p>
      </form>
    </div>
  );
}

export default AdminRegister;
