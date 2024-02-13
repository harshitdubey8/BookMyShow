import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import "./AdminTheater.css";

function AdminTheater() {
  const [formData, setFormData] = useState({
    theatreName: "",
    theatreLocation: " ",
    moviePrices: "",
  });

  const [allTheaters, setAllTheaters] = useState([]);
  const [result, setResult] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function getTheatreData() {
    let url = "http://localhost:80/api/theatre";
    axios.get(url).then((resData) => {
      setAllTheaters(resData.data);
    });
  }

  const addTheater = (e) => {
    e.preventDefault();

    if (
      !formData.theatreName ||
      !formData.theatreLocation ||
      !formData.moviePrices
    ) {
      setResult("Please fill out all fields.");
      return;
    }

    let url = "http://localhost:80/api/theatre";

    axios
      .post(url, formData)
      .then((resData) => {
        console.log(resData);
        if (resData.data.status === "Record inserted in Database") {
          setResult("Theater added successfully");
          clearForm();
          getTheatreData();
        } else {
          setResult("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during Adding the Theater:", error);
        setResult(
          "An error occurred during adding the Theater: " + error.message
        );
      });
  };

  function deleteTheatre(dno) {
    let flag = window.confirm("Are you sure want to delete?");
    if (flag === false) {
      return;
    }

    let url = "http://localhost:80/api/theatre/" + dno;
    axios.delete(url).then((resData) => {
      alert(resData.data.status);
      getTheatreData();
    });
  }
  // To Clear the form Field
  const clearForm = () => {
    setFormData({
      theatreName: "",
      theatreLocation: " ",
      moviePrices: "",
    });
  };

  return (
    <div className="AdminScreen">
      <div>
        {/* Add a new movie */}
        <form className="AddTheaterCard">
          <h2>Add A Theater</h2>
          <label>
            TheatreName:
            <input
              className="InputField"
              type="text"
              name="theatreName"
              value={formData.theatreName}
              onChange={handleChange}
            />
          </label>
          <label>
            TheatreLocation:
            <input
              className="InputField"
              type="text"
              name="theatreLocation"
              value={formData.theatreLocation}
              onChange={handleChange}
            />
          </label>
          <label>
            MoviePrices:
            <input
              className="InputField"
              type="text"
              name="moviePrices"
              value={formData.moviePrices}
              onChange={handleChange}
            />
          </label>

          <CustomButton text="Add Theater" onClick={addTheater} />
          <p>{result}</p>
        </form>
      </div>

      <div>
        <div className="MoviesTable">
          <h2>All Theatre</h2>
          <CustomButton text="Get Movies Data" onClick={getTheatreData} />
          {allTheaters.length === 0 ? (
            <p>No movies available</p>
          ) : (
            <table className="MovieTable">
              <thead>
                <tr>
                  <th>Theatre Name</th>
                  <th>Location</th>
                  <th>Movie Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allTheaters.map((theater, index) => (
                  <tr key={index}>
                    <td>{theater.theatreName}</td>
                    <td>{theater.theatreLocation}</td>
                    <td>{theater.moviePrices}</td>

                    <td>
                      <div>
                        <CustomButton
                          onClick={() => deleteTheatre(theater._id)}
                          text="Delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminTheater;
