import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import "./MovieAdmin.css";

function MovieAdmin() {
  const [formData, setFormData] = useState({
    movieTitle: "",
    movieDesc: "",
    genre: "",
    duration: "",
    releaseDate: "",
    posterUrl: "",
    type: "",
    rating: "",
  });

  const [updateForm, setUpdateForm] = useState({
    movieTitle: "",
    movieDesc: "",
    genre: "",
    duration: "",
    releaseDate: "",
    posterUrl: "",
    type: "",
    rating: "",
  });

  const [allMovies, setAllMovies] = useState([]);
  const [result, setResult] = useState();
  const [updateId, setUpdateId] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const updateHandleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };

  // This is the Function to Get movie data
  function getMovieData() {
    let url = "http://localhost:80/api/movies";
    axios.get(url).then((resData) => {
      setAllMovies(resData.data);
    });
  }

  const addMovie = (e) => {
    e.preventDefault();

    if (
      !formData.movieTitle ||
      !formData.genre ||
      !formData.duration ||
      !formData.releaseDate ||
      !formData.posterUrl ||
      !formData.type ||
      !formData.rating
    ) {
      setResult("Please fill out all fields.");
      return;
    }

    let url = "http://localhost:80/api/movies";

    axios
      .post(url, formData)
      .then((resData) => {
        console.log(resData);
        if (resData.data.status === "Record inserted in Database") {
          setResult("Movie added successfully");
          clearForm();
          getMovieData();
        } else {
          setResult("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during Adding the Movie:", error);
        setResult(
          "An error occurred during adding the movie: " + error.message
        );
      });
  };

  function deleteMovie(dno) {
    let flag = window.confirm("Are you sure want to delete?");
    if (flag === false) {
      return;
    }

    let url = "http://localhost:80/api/movies/" + dno;
    axios.delete(url).then((resData) => {
      alert(resData.data.status);
      getMovieData();
    });
  }

  // Edit movie details
  function editMovieButton(dno) {
    let tempArray = [...allMovies];
    let movieObj = tempArray.find((item) => item._id === dno);
    setUpdateId(dno);
    setUpdateForm({
      movieTitle: movieObj.movieTitle,
      movieDesc: movieObj.movieDesc,
      genre: movieObj.genre,
      duration: movieObj.duration,
      releaseDate: movieObj.releaseDate,
      posterUrl: movieObj.posterUrl,
      type: movieObj.type,
      rating: movieObj.rating,
    });
  }

  // Update Movie Details
  function updateMovie(e) {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !updateForm.movieTitle ||
      !updateForm.genre ||
      !updateForm.duration ||
      !updateForm.releaseDate ||
      !updateForm.posterUrl ||
      !updateForm.type ||
      !updateForm.rating
    ) {
      alert("Please fill out all fields.");
      return;
    }

    let url = "http://localhost:80/api/movies/" + updateId;
    axios
      .put(url, updateForm)
      .then((resData) => {
        alert(resData.data.message);
        getMovieData();
      })
      .catch((error) => {
        console.error("Error during updating the movie:", error);
        alert("An error occurred during updating the movie: " + error.message);
      });

    clearForm();
  }

  // To Clear the form Field
  const clearForm = () => {
    setFormData({
      movieTitle: "",
      movieDesc: "",
      genre: "",
      duration: "",
      releaseDate: "",
      posterUrl: "",
      type: "",
      rating: "",
    });
    setUpdateForm({
      movieTitle: "",
      movieDesc: "",
      genre: "",
      duration: "",
      releaseDate: "",
      posterUrl: "",
      type: "",
      rating: "",
    });
  };
  return (
    <div className="AdminScreen">
      <div>
        {/* Add a new movie */}
        <form className="AddMovieCard">
          <h2>Add A Movie</h2>
          <label>
            Movie Title:
            <input
              className="InputField"
              type="text"
              name="movieTitle"
              value={formData.movieTitle}
              onChange={handleChange}
            />
          </label>
          <label>
            Movie Description:
            <input
              className="InputField"
              type="text"
              name="movieDesc"
              value={formData.movieDesc}
              onChange={handleChange}
            />
          </label>
          <label>Genre:</label>
          <select
            className="InputField"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantic">Romantic</option>
            <option value="Horror">Horror</option>
            <option value="Drama">Drama</option>
          </select>
          <label>Duration (Mins):</label>
          <input
            className="InputField"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
          <label>Release Date:</label>
          <input
            className="InputField"
            type="text"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
          <label>
            Poster URL:
            <input
              className="InputField"
              type="text"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
            />
          </label>
          <label>Rating</label>
          <input
            className="InputField"
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />

          {/* cast  */}
          {/* <label>Enter 3 cast members</label>
          <input
            className="InputField"
            type="text"
            name="cast1"
            value={formData.cast[0]}
            onChange={handleChange}
          />
          <input
            className="InputField"
            type="text"
            name="cast2"
            value={formData.cast[1]}
            onChange={handleChange}
          />
          <input
            className="InputField"
            type="text"
            name="cast3"
            value={formData.cast[2]}
            onChange={handleChange}
          /> */}

          {/* cast  */}
          <label>Type:</label>
          <select
            className="InputField"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Trending">Trending</option>
            <option value="Recommended">Recommended</option>
          </select>

          <CustomButton text="Add Movie" onClick={addMovie} />
          <p>{result}</p>
        </form>
      </div>

      {/* view all movie  in a table and a delete button*/}

      {/* Display all movies */}

      <div>
        <div className="MoviesTable">
          <h2>All Movies</h2>
          <CustomButton text="Get Movies Data" onClick={getMovieData} />
          {allMovies.length === 0 ? (
            <p>No movies available</p>
          ) : (
            <table className="MovieTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Genre</th>
                  <th>Duration</th>
                  <th>Release Date</th>
                  <th>Type</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allMovies.map((movie, index) => (
                  <tr key={index}>
                    <td>{movie.movieTitle}</td>
                    <td>{movie.movieDesc}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.releaseDate}</td>
                    <td>{movie.type}</td>
                    <td>{movie.rating}</td>

                    <td>
                      <div>
                        <CustomButton
                          onClick={() => deleteMovie(movie._id)}
                          text="Delete"
                        />

                        <CustomButton
                          onClick={() => editMovieButton(movie._id)}
                          text="Edit"
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

      {/* update movie  */}
      <div>
        <form className="AddMovieCard">
          <h2>Update A Movie</h2>
          <label>
            Movie Title:
            <input
              className="InputField"
              type="text"
              name="movieTitle"
              value={updateForm.movieTitle}
              onChange={updateHandleChange}
            />
          </label>
          <label>
            Movie Description:
            <input
              className="InputField"
              type="text"
              name="movieDesc"
              value={updateForm.movieDesc}
              onChange={updateHandleChange}
            />
          </label>
          <label>Genre:</label>
          <select
            className="InputField"
            name="genre"
            value={updateForm.genre}
            onChange={updateHandleChange}
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantic">Romantic</option>
            <option value="Horror">Horror</option>
            <option value="Drama">Drama</option>
          </select>
          <label>
            Duration (Mins):
            <input
              className="InputField"
              type="number"
              name="duration"
              value={updateForm.duration}
              onChange={updateHandleChange}
            />
          </label>
          <label>
            Release Date:
            <input
              className="InputField"
              type="text"
              name="releaseDate"
              value={updateForm.releaseDate}
              onChange={updateHandleChange}
            />
          </label>
          <label>
            Poster URL:
            <input
              className="InputField"
              type="text"
              name="posterUrl"
              value={updateForm.posterUrl}
              onChange={updateHandleChange}
            />
          </label>
          <label>
            Rating
            <input
              className="InputField"
              type="text"
              name="rating"
              value={updateForm.rating}
              onChange={updateHandleChange}
            />
          </label>
          <label>Type:</label>
          <select
            className="InputField"
            name="updateType"
            value={updateForm.type}
            onChange={updateHandleChange}
          >
            <option value="">Select Type</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Trending">Trending</option>
            <option value="Recommended">Recommended</option>
          </select>

          <CustomButton text="Update Movie" onClick={updateMovie} />
          <p>{result}</p>
        </form>
      </div>
    </div>
  );
}

export default MovieAdmin;
