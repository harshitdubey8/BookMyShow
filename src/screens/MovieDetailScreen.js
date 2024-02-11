import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetailsScreen.css";
import CustomButton from "../components/CustomButton";
import RatingStars from "../components/RatingStars";
import ReviewCard from "../components/ReviewCard";
import TheatreCard from "../components/TheatreCard/TheatreCard";
import CustomModal from "../components/CustomModal/CustomModal";
import { Reviews } from "@mui/icons-material";

function MovieDetailScreen({ userData }) {
  const [movie, setMovie] = useState({});
  const [movieReviews, setMovieReviews] = useState([]);
  const [movieTheatre, setMovieTheatre] = useState([]);

  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const [result, setResult] = useState();
  const [bookingResult, setBookingResult] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [ticketCount, setTicketCount] = useState(1);

  const { id } = useParams();
  let navigate = useNavigate();

  const getAllReviews = async (movieId) => {
    if (!movieId) {
      console.error(
        "Movie is not properly defined or does not have a valid ID"
      );
      return;
    }
    let url = `http://localhost:80/api/reviews/${movieId}`;
    await axios.get(url).then((resData) => {
      setMovieReviews(resData.data);
    });
  };

  const getTheatreData = async () => {
    let url = `http://localhost:80/api/theatre`;
    await axios.get(url).then((resData) => {
      setMovieTheatre(resData.data);
    });
  };

  // get movie data by id
  useEffect(() => {
    let url = `http://localhost:80/api/movies/${id}`;
    axios.get(url).then((resData) => {
      setMovie(resData.data);

      getTheatreData();
      getAllReviews(resData.data?._id);
    });
  }, []);

  // Get all Reviews

  const addReview = (e) => {
    e.preventDefault();

    let reviewObj = {
      message: reviewMessage,
      userRating: reviewRating,
      userId: userData._id,
      movieId: movie._id,
    };
    let url = `http://localhost:80/api/reviews/add`;

    axios
      .post(url, reviewObj)
      .then(() => {
        setResult("Review added successfully");
        getAllReviews();
      })
      .catch((error) => {
        console.error("Error during Adding the Review:", error);
        setBookingResult(
          "An error occurred during adding the Review: " + error.message
        );
      });
  };

  const onBookClick = (theatre) => {
    setSelectedTheatre(theatre);

    // To open Modal
    setIsOpen(true);
  };

  const OnBookingConfirm = async (e) => {
    e.preventDefault();
    let bookingObj = {
      userId: userData._id,
      movieId: movie._id,
      theatreId: selectedTheatre._id,
      seats: ticketCount,
      grandTotal: parseFloat(selectedTheatre.moviePrices) * ticketCount,
    };
    let url = `http://localhost:80/api/bookings`;
    await axios
      .post(url, bookingObj)
      .then(() => {
        navigate("/Success", { replace: true });
      })
      .catch((error) => {
        console.error("Error during Booking:", error);
        setResult("An error occurred during booking: " + error.message);
      });
  };

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

        {movieReviews.length === 0 ? (
          <p> No Reviews </p>
        ) : (
          <ul>
            {movieReviews.map((review, index) => (
              <ReviewCard
                username={review.userId.username}
                message={review.message}
              />
            ))}
          </ul>
        )}
      </div>
      {userData?.email != null ? (
        <div className="AddReviewCard">
          <form className="AddAReview">
            <label>Rate The Movie Between 1-5</label>
            <input
              className="InputField"
              placeholder="Your Rating"
              value={reviewRating}
              type="number"
              onChange={(e) => setReviewRating(e.target.value)}
            />
            <textarea
              className="InputField"
              name="reviewData"
              id=""
              cols="20"
              rows="5"
              placeholder="Add Your Review"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              on
            ></textarea>
            <CustomButton text="Add Review" size="large" onClick={addReview} />

            <p>{result}</p>
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
            onClick={() => onBookClick(item)}
          />
        ))}
      </div>

      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="ModalCard">
          <h2 className="Headings">Booking </h2>
          <h2 className="Headings">Movie : {movie.movieTitle}</h2>
          <p className="SubHeading">Theatre : {selectedTheatre.theatreName}</p>
          <p className="SubHeading"> {selectedTheatre.theatreLocation}</p>

          <label>Enter the number of tickets</label>
          <input
            className="InputField"
            type="number"
            max="5"
            min="1"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
          />
          <hr />
          <p className="SubHeading">
            Grand Total :
            <span className="Headings">
              {parseFloat(selectedTheatre.moviePrices) * ticketCount}
            </span>
          </p>
          <CustomButton text="Confirm Booking" onClick={OnBookingConfirm} />
          <p>{bookingResult}</p>
        </div>
      </CustomModal>
    </div>
  );
}

export default MovieDetailScreen;
