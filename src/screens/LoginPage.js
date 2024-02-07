import React, { useState } from "react";
import "./LoginPage.css";
import CustomButton from "../components/CustomButton";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
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

        <a href="">Forgot Password </a>
        <CustomButton text="Login" onClick={onSignIn} type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
