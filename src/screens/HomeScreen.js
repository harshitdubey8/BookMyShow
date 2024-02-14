import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "./HomeScreen.css";
import axios from "axios";

import { Link } from "react-router-dom";

const GENRE = [
  {
    label: "Select Genre",
    value: "",
  },
  {
    label: "Action",
    value: "Action",
  },
  {
    label: "Horror",
    value: "Horror",
  },
  {
    label: "Thriller",
    value: "Thriller",
  },
  {
    label: "Romantic",
    value: "Romantic",
  },
  {
    label: "Drama",
    value: "Drama",
  },
];

function HomeScreen({ searchString = "" }) {
  const [allMovies, setAllMovies] = useState([]);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    let url = "http://localhost:80/api/movies";
    axios.get(url).then((resData) => {
      setAllMovies(resData.data);
    });
  }, []);

  const compareString = (string1 = "", string2 = "") =>
    string1?.toLowerCase?.()?.includes?.(string2?.toLowerCase?.());

  const filterMovies = (movieType, movie) => {
    let matchesGenre = true; // By default genre matches
    // if the genre exist then compare genre
    if (genre) {
      matchesGenre = movie?.genre === genre;
    }

    // movie type doesn't match
    if (movie?.type !== movieType) {
      return false;
    }
    // If search string is there and search matches as well as genre
    if (searchString) {
      return !!(
        (compareString(movie?.movieTitle, searchString) ||
          compareString(movie?.movieDesc, searchString)) &&
        matchesGenre
      );
    }

    // If genre does not match and search string is also not there
    if (!matchesGenre) {
      return false;
    }

    return true;
  };

  const upcomingMoviesArray = allMovies.filter((item) =>
    filterMovies("Upcoming", item)
  );
  const recommendedMoviesArray = allMovies.filter((item) =>
    filterMovies("Recommended", item)
  );

  const trendingMoviesArray = allMovies.filter((item) =>
    filterMovies("Trending", item)
  );

  return (
    <div className="HomeScreen">
      <div className="BannerContainer">
        <img src="banner.jpeg" alt="" />
      </div>

      <select
        className="GenreSelector"
        name="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {GENRE.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>

      {/* Recommended Section  */}
      <div className="RecommendedMovies">
        <h2>Recommended Movies</h2>
        <div className="MovieRows">
          {recommendedMoviesArray?.length ? (
            recommendedMoviesArray.map((data) => (
              <Link key={data._id} to={`/movie/${data._id}`}>
                <Card
                  imageUrl={data.posterUrl}
                  title={data.movieTitle}
                  description={data.movieDesc}
                  genre={data.genre}
                />
              </Link>
            ))
          ) : (
            <p className="NotFoundText">No Movies Found</p>
          )}
        </div>
      </div>

      {/* Trending Section  */}
      <div className="TrendingMovies">
        <h2 className="Heading">Trending Movies</h2>
        <div className="MovieRows">
          {trendingMoviesArray?.length ? (
            trendingMoviesArray.map((data) => (
              <Link key={data._id} to={`/movie/${data._id}`}>
                <Card
                  imageUrl={data.posterUrl}
                  title={data.movieTitle}
                  description={data.movieDesc}
                  genre={data.genre}
                />
              </Link>
            ))
          ) : (
            <p className="NotFoundText">No Movies Found</p>
          )}
        </div>
      </div>

      {/* Upcoming Section      */}
      <div className="RecommendedMovies">
        <h2>Upcoming Movies</h2>
        <div className="MovieRows">
          {upcomingMoviesArray?.length ? (
            upcomingMoviesArray.map((data) => (
              <Card
                key={data._id} // Add a unique key for each Card component
                imageUrl={data.posterUrl}
                title={data.movieTitle}
                description={data.movieDesc}
                genre={data.genre}
              />
            ))
          ) : (
            <p className="NotFoundText">No Movies Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
