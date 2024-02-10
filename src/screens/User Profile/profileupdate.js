import React, { useState } from "react";
import "./profileUpdate.css";
import CustomButton from "../../components/CustomButton";

const ProfileUpdate = () => {
  // Sample user data
  const [user, setUser] = useState();

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("userEmail");
    setUser(userLoggedIn);
  }, [setUser]);

  //TODO :: fix this
  const getUserDetails = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    let url = `http://localhost:80/api/user/${user}`;

    axios.get(url).then((resData) => {
      setUserDetails(resData.data);
    });
    console.log(userDetails);
  };

  // State for form fields
  const [formData, setFormData] = useState({
    userName: userDetails.userName,
    userPhone: userDetails.userPhone,
    profilePicture: userDetails.profilePicture,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile-container">
      <div className="profile-picture-container">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Profile Pic Url</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="userPhone"
            pattern="[0-9]{10}"
            value={formData.userPhone}
            onChange={handleInputChange}
          />
        </div>
        <CustomButton type="submit" text="Save Changes" size="large" />
      </form>
    </div>
  );
};

export default ProfileUpdate;
