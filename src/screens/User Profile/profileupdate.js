import React, { useEffect, useState } from "react";
import "./profileUpdate.css";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import BookingCard from "../../components/BookingCard/BookingCard";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = ({ userData, getUserDetails }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: userData.username,
    phoneNo: userData.phoneNo,
    profilePicUrl: userData.profilePicUrl,
  });

  const [bookings, setBookings] = useState([]);

  let navigate = useNavigate();

  const getAllBookings = async () => {
    let url = `http://localhost:80/api/bookings/${userData?._id}`;
    await axios.get(url).then((resData) => {
      setBookings(resData.data);
    });
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const updateUserData = (e) => {
    e.preventDefault();

    let url = `http://localhost:80/api/user/${userData._id}`;

    axios
      .put(url, formData)
      .then((resData) => {
        alert(resData.data.message);
        getUserDetails(userData.email);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error during updating the user:", error);
        setError(error);
        alert("An error occurred during updating the user: " + error.message);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-picture-container">
        <img
          src={userData.profilePicUrl}
          alt="Profile"
          className="profile-picture"
        />
      </div>
      <form onSubmit={updateUserData} className="profile-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Profile Pic Url</label>
          <input
            type="text"
            name="profilePicUrl"
            value={formData.profilePicUrl}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phoneNo"
            pattern="[0-9]{10}"
            value={formData.phoneNo}
            onChange={handleInputChange}
          />
        </div>
        <CustomButton type="submit" text="Update Profile" size="large" />
        <p>{error}</p>
      </form>

      <h2 style={{ marginTop: "20px" }}> Your Previous Bookings</h2>
      {bookings.length === 0 && <p> No Previous Bookings</p>}
      {bookings.map((item) => (
        <BookingCard bookingObj={item} />
      ))}
    </div>
  );
};

export default ProfileUpdate;
