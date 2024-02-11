import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "./HomeScreen.css";
import axios from "axios";

import { Link } from "react-router-dom";

function HomeScreen({ searchString = "" }) {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    let url = "http://localhost:80/api/movies";
    axios.get(url).then((resData) => {
      setAllMovies(resData.data);
    });
  }, []);

  const compareString = (string1 = "", string2 = "") =>
    string1?.toLowerCase?.()?.includes?.(string2?.toLowerCase?.());

  const filterMovies = (movieType, movie) => {
    if (movie?.type !== movieType) {
      return false;
    }

    if (searchString) {
      return !!(
        compareString(movie?.movieTitle, searchString) ||
        compareString(movie?.movieDesc, searchString)
      );
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
