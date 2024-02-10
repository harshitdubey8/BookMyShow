import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetailsScreen.css";
import CustomButton from "../components/CustomButton";
import RatingStars from "../components/RatingStars";
import ReviewCard from "../components/ReviewCard";
import TheatreCard from "../components/TheatreCard/TheatreCard";

function MovieDetailScreen() {
  const [movie, setMovie] = useState({});
  const [movieReviews, setMovieReviews] = useState([]);
  const [movieTheatre, setMovieTheatre] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [user, setUser] = useState("");

  // const history = useHistory();

  // set if user is logged in or not
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("userEmail");
    setUser(userLoggedIn);
  }, [setUser]);

  const { id } = useParams();

  // get movie data by id
  useEffect(() => {
    let url = `http://localhost:80/api/movies/${id}`;
    axios.get(url).then((resData) => {
      setMovie(resData.data);
      getAllReviews();
      getTheatreData();
    });
  }, []);

  // Get User Details
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

  // Get all Reviews
  const getAllReviews = async () => {
    let url = `http://localhost:80/api/reviews`;
    await axios.get(url).then((resData) => {
      setMovieReviews(resData.data);
    });
  };

  const addReview = () => {
    console.log("Review Added");
  };

  const getTheatreData = async () => {
    let url = `http://localhost:80/api/theatre`;
    await axios.get(url).then((resData) => {
      setMovieTheatre(resData.data);
    });
  };

  // const onBookClick = (theatreId) => {
  //   const data = {
  //     movieId: movie._id,
  //     theatreId: theatreId,
  //   };

  //   const queryString = new URLSearchParams(data).toString();

  //   history.push(`/booking?${queryString}`);
  // };

  return (
    <div className="MovieDetailsPage">
      <div
        className="MovieCard"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${movie.posterUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div>
          <img
            className="MoviePoster"
            src={movie.posterUrl}
            alt={movie.movieTitle}
          />
        </div>
        <div>
          <h1>{movie.movieTitle}</h1>

          <p>Duration: {movie.duration}m</p>
          <p>Genre: {movie.genre}</p>
          <RatingStars rating={movie.rating} />
          <a href="#bookings">
            <CustomButton text="Book Tickets" />
          </a>
        </div>
      </div>

      <div className="AboutMovie">
        <h2 className="Headings">About the Movie</h2>
        <p className="SubHeading"> Description: {movie.movieDesc}</p>
      </div>

      <hr />
      <div className="AboutMovie">
        {movie.cast !== undefined ? (
          <div className="crew-images">
            <h2 className="Headings">Cast</h2>
            {movie.cast.map((crewMember, index) => (
              <p className="CastName" key={index}>
                {crewMember}
              </p>
            ))}
          </div>
        ) : (
          <p>No Cast Members</p>
        )}
      </div>

      {/* all reviews  */}
      <hr />
      <div className="reviews">
        <h3>Top Reviews</h3>
        <ul>
          {movieReviews.map((review, index) => (
            <ReviewCard
              username={review.userId.username}
              message={review.message}
            />
          ))}
        </ul>
      </div>
      {user != null ? (
        <div className="AddReviewCard">
          <form className="AddAReview">
            <label>Rate The Movie Between 1-5</label>
            <input
              className="InputField"
              placeholder="Your Rating"
              type="number"
            />
            <textarea
              className="InputField"
              name="reviewData"
              id=""
              cols="30"
              rows="10"
              placeholder="Add Your Review"
            ></textarea>
            <CustomButton text="Add Review" size="large" onClick={addReview} />
          </form>
        </div>
      ) : (
        <h2 className="Headings">Login To add Review</h2>
      )}

      {/* Theatres list and Booking section  */}

      <div id="bookings" className="TheatreContainer">
        <h2 style={{ color: "white" }}>Theatres Available for booking</h2>
        <br />
        {movieTheatre.map((item, index) => (
          <TheatreCard
            key={index}
            name={item.theatreName}
            location={item.theatreLocation}
            price={item.moviePrices}
            // onClick={() => onBookClick(item._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieDetailScreen;
