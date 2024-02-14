import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeScreen from "./screens/HomeScreen";
import LoginPage from "./screens/LoginPage";
import Header from "./components/Header";
import SignUpPage from "./screens/SignUpPage";
import AdminScreen from "./screens/AdminScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import ProfileUpdate from "./screens/User Profile/profileupdate";
import SuccessScreen from "./components/SuccessScreen/SuccessScreen";
import AdminRegister from "./screens/AdminRegister/AdminRegister";
import ForgotPassword from "./screens/Forgot Password/ForgotPassword";

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
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value || "");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          search={search}
          searchHandler={searchHandler}
          userData={user}
          setUser={setUser}
        />

        <Routes>
          <Route path="/" element={<HomeScreen searchString={search} />} />

          <Route
            path="/login"
            element={<LoginPage getUserDetails={getUserDetails} />}
          />
          <Route
            path="/SignUp"
            element={<SignUpPage getUserDetails={getUserDetails} />}
          />
          <Route
            path="/AdminReg"
            element={<AdminRegister getUserDetails={getUserDetails} />}
          />
          <Route path="/Admin" element={<AdminScreen />} />
          <Route path="/Forgot" element={<ForgotPassword />} />
          <Route path="/success" element={<SuccessScreen />} />
          <Route
            path="/Profile"
            element={
              <ProfileUpdate userData={user} getUserDetails={getUserDetails} />
            }
          />

          <Route
            path="/movie/:id"
            element={<MovieDetailScreen userData={user} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
