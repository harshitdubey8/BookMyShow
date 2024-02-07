import React, { useState } from "react";
import "./SignUpPage.css";
import CustomButton from "../components/CustomButton";

function SignUpPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const onSignIn = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(userType);
    console.log(email);
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
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="InputField"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <CustomButton text="signUp" onClick={onSignIn} type="submit" />
      </form>
    </div>
  );
}

export default SignUpPage;
