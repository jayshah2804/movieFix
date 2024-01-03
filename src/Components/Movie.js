import React, { useState } from "react";

import { BASE_URL_IMAGE } from "../utils/constants";
import noImage from "../utils/no_image_placeholder.png";

import "./Movie.css";

const Movie = ({ movie }) => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageLoadedError, setIsImageLoadedError] = useState(false);

  return (
    <div
      className="movie-details-main-container"
      onMouseEnter={() => setIsImageHovered(true)}
      onMouseLeave={() => setIsImageHovered(false)}
    >
      <div className="movie-details-sub-container">
        <img
          className={`movie-image ${
            !isImageLoaded ? "movie-image-loading" : ""
          }`}
          src={
            isImageLoadedError ? noImage : BASE_URL_IMAGE + movie.backdrop_path
          }
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoadedError(true)}
        />
        {isImageHovered && (
          <div className="movie-info-container">
            <div className="movie-action-container">
              <div className="movie-play-container">
                <div className="movie-play-icon">
                  <svg
                    width="30"
                    height="25"
                    viewBox="0 0 24 22"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Play"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <span>Play</span>
              </div>
              <div className="movie-more-actions-container">
                <div className="movie-watchlist-icon">
                  <svg
                    width="26"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Plus"
                    aria-hidden="true"
                    className="watchlist-svg"
                    onMouseOver={(e) => {
                      if (e.target?.parentElement?.children[1])
                        e.target.parentElement.children[1].style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      if (e.target?.parentElement?.children[1])
                        e.target.parentElement.children[1].style.opacity = 0;
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="tooltip-watchlist">Watchlist</span>
                </div>
                <div>
                  <div className="movie-more-icon">
                    <svg
                      width="26"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="more-svg"
                      onMouseOver={(e) => {
                        if (e.target?.parentElement?.children[1])
                          e.target.parentElement.children[1].style.opacity = 1;
                      }}
                      onMouseLeave={(e) => {
                        if (e.target?.parentElement?.children[1])
                          e.target.parentElement.children[1].style.opacity = 0;
                      }}
                    >
                      <path
                        d="M11.580 3.047 C 10.859 3.185,10.199 3.848,10.044 4.592 C 9.789 5.816,10.751 7.000,12.000 7.000 C 13.080 7.000,14.000 6.080,14.000 5.000 C 14.000 4.477,13.790 3.983,13.404 3.596 C 12.913 3.106,12.277 2.914,11.580 3.047 M11.580 10.047 C 10.707 10.214,10.000 11.087,10.000 12.000 C 10.000 12.920,10.690 13.768,11.592 13.956 C 12.816 14.211,14.000 13.249,14.000 12.000 C 14.000 11.477,13.790 10.983,13.404 10.596 C 12.913 10.106,12.277 9.914,11.580 10.047 M11.580 17.047 C 10.859 17.185,10.199 17.848,10.044 18.592 C 9.789 19.816,10.751 21.000,12.000 21.000 C 13.080 21.000,14.000 20.080,14.000 19.000 C 14.000 18.477,13.790 17.983,13.404 17.596 C 12.913 17.106,12.277 16.914,11.580 17.047 "
                        fill="currentColor"
                        stroke="none"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    <span className="tooltip-more">More</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="movie-title">{movie.title}&nbsp;&nbsp;</span>
              <span className="movie-votes">
                {movie.vote_average * 10 + "% Match"}
              </span>
            </div>
            <div className="movie-release-info">
              <span>{movie.release_date.split("-")[0]}</span>
              <span>{"2h " + Math.round(Math.random() * 59) + "m"}</span>
              <span className="movie-type-info">
                {movie.adult ? "A" : "U/A"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
