import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./screens/LoginPage";
import Header from "./components/Header";
import SignUpPage from "./screens/SignUpPage";
import AdminScreen from "./screens/AdminScreen";
import UserProfile from "./screens/UserProfile";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import BookingScreen from "./screens/BookingScreen";
import ProfileUpdate from "./screens/User Profile/profileupdate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header />

    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUpPage />} />
      <Route path="/Admin" element={<AdminScreen />} />
      <Route path="/Profile" element={<ProfileUpdate />} />

      <Route path="/movie/:id" element={<MovieDetailScreen />} />

      <Route path="/booking/:moviesId/:theatreId" element={<BookingScreen />} />
    </Routes>
  </BrowserRouter>
);
