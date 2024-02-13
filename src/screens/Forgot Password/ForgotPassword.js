import axios from "axios";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [result, setResult] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  let navigate = useNavigate();
  const onPasswordChange = (e) => {
    e.preventDefault();

    // checking if the fields are not empty
    if (!email || !password || !securityQuestion || !securityAnswer) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    let url = "http://localhost:80/api/changePassword";

    let userObj = {
      email: email,
      password: password,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer,
    };

    axios
      .put(url, userObj)
      .then((resData) => {
        console.log(resData);
        if (resData.data.message === "Password Changed Successfully") {
          alert(resData.data.message);
          navigate("/login", { replace: true });
        } else {
          setResult("Invalid User or Security Question/Answer");
        }
      })
      .catch((error) => {
        console.error("Error during password change:", error);
        setResult("Check Form Details");
      });
  };

  return (
    <div className="ForgotPasswordScreen">
      <form className="ForgotPasswordCard">
        <h2>Reset Password Form</h2>
        <input
          className="InputField"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Enter New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton
          text="Change Password"
          onClick={onPasswordChange}
          type="submit"
          size="large"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>{result}</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
