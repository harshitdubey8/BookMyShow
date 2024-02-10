import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "./HomeScreen.css";
import axios from "axios";

import { Link } from "react-router-dom";

function HomeScreen() {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    let url = "http://localhost:80/api/movies";
    axios.get(url).then((resData) => {
      setAllMovies(resData.data);
    });
  }, []);

  const upcomingMoviesArray = allMovies.filter(
    (item) => item.type === "Upcoming"
  );
  const recommendedMoviesArray = allMovies.filter(
    (item) => item.type === "Recommended"
  );

  const trendingMoviesArray = allMovies.filter(
    (item) => item.type === "Trending"
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
          {recommendedMoviesArray.map((data, index) => (
            <Link to={`/movie/${data._id}`}>
              <Card
                key={index} // Add a unique key for each Card component
                imageUrl={data.posterUrl}
                title={data.movieTitle}
                description={data.movieDesc}
                genre={data.genre}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Section  */}
      <div className="TrendingMovies">
        <h2 className="Heading">Trending Movies</h2>
        <div className="MovieRows">
          {trendingMoviesArray.map((data, index) => (
            <Link to={`/movie/${data._id}`}>
              <Card
                key={index} // Add a unique key for each Card component
                imageUrl={data.posterUrl}
                title={data.movieTitle}
                description={data.movieDesc}
                genre={data.genre}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Section      */}
      <div className="RecommendedMovies">
        <h2>Upcoming Movies</h2>
        <div className="MovieRows">
          {upcomingMoviesArray.map((data, index) => (
            <Card
              key={index} // Add a unique key for each Card component
              imageUrl={data.posterUrl}
              title={data.movieTitle}
              description={data.movieDesc}
              genre={data.genre}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
