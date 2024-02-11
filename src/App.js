import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginPage from "./screens/LoginPage";
import Header from "./components/Header";
import SignUpPage from "./screens/SignUpPage";
import AdminScreen from "./screens/AdminScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import BookingScreen from "./screens/BookingScreen";
import ProfileUpdate from "./screens/User Profile/profileupdate";
import axios from "axios";
import { useEffect, useState } from "react";
import SuccessScreen from "./components/SuccessScreen/SuccessScreen";

function App() {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");

  const getUserDetails = async (email) => {
    if (!email) {
      return;
    }
    let url = `http://localhost:80/api/user/${email}`;

    axios.get(url).then((resData) => {
      setUser(resData.data);
    });
  };

  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");
    getUserDetails(userEmail);
  }, [setUser]);

  const searchHandler = (e) => {
    setSearch(e.target.value || "");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header search={search} searchHandler={searchHandler} />

        <Routes>
          <Route path="/" element={<HomeScreen searchString={search} />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Admin" element={<AdminScreen />} />
          <Route path="/success" element={<SuccessScreen />} />
          <Route path="/Profile" element={<ProfileUpdate userData={user} />} />

          <Route
            path="/movie/:id"
            element={<MovieDetailScreen userData={user} />}
          />

          <Route
            path="/booking/:moviesId/:theatreId"
            element={<BookingScreen />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
