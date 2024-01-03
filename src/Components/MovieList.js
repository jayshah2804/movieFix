import React, { useEffect, useState } from "react";

import { TOKEN } from "../utils/constants";
import { getMoviesByYearApiUrl } from "../utils/constants";
import { getMoviesFromSearchStringApiUrl } from "../utils/constants";

import Shimmer from "../utils/Shimmer";
import Movie from "./Movie";
import useHttp from "../utils/useHttp";
import LoadingSpinner from "../utils/LoadingSpinner";
import MovieSuggetion from "./MovieSuggetion";

import "./MovieList.css";

const defaultYear = 2012;
let lastBackVisitedYear = defaultYear;
let lastFrontVisitedYear = defaultYear;
let flag = false;
let pageNo = 1;
let lastScrollTop = 0;
let scrollY = 0;
const movieDataCache = {};
const MovieList = ({ selectedFilterId, searchString }) => {
  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchedMovieList, setSearchedMovieList] = useState([]);

  const { isLoading, sendRequest } = useHttp();

  const movieListResponse = (data) => {
    if (+data.results[0].release_date.split("-")[0] < defaultYear) {
      setMovieList((prev) => [
        { year: lastBackVisitedYear, movies: data.results },
        ...prev,
      ]);
      setFilteredMovieList((prev) => [
        { year: lastBackVisitedYear, movies: data.results },
        ...prev,
      ]);
      window.scrollTo({ top: 960 + window.scrollY, behavior: "auto" });
    } else {
      setMovieList((prev) => [
        ...prev,
        { year: lastFrontVisitedYear, movies: data.results },
      ]);
      setFilteredMovieList((prev) => [
        ...prev,
        { year: lastFrontVisitedYear, movies: data.results },
      ]);
    }
  };

  const searchedMovieResponse = (data) => {
    movieDataCache[searchString] = data.results;
    pageNo++;
    setFilteredMovieList((prev) => [
      ...prev,
      { year: "", movies: data.results },
    ]);
    setSearchedMovieList((prev) => [
      ...prev,
      { year: "", movies: data.results },
    ]);
  };

  useEffect(() => {
    sendRequest(getMoviesByYearApiUrl(defaultYear), movieListResponse);
  }, [sendRequest]);

  useEffect(() => {
    if (selectedFilterId) {
      let data = filterMoviesFromGenre(
        searchString ? searchedMovieList : movieList,
        selectedFilterId
      );
      setFilteredMovieList(data);
      setTimeout(() => {
        if (
          document.getElementById("movie-list-container")?.scrollHeight <
          window.innerHeight
        ) {
          if (searchString) searchStringApiCall(false);
          else {
            lastFrontVisitedYear++;
            sendRequest(
              getMoviesByYearApiUrl(lastFrontVisitedYear),
              movieListResponse
            );
          }
        }
      });
    } else setFilteredMovieList(searchString ? searchedMovieList : movieList);
    if (searchString) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedFilterId, sendRequest]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    const delay = 500;
    let timeoutId;
    if (searchString) {
      setFilteredMovieList([]);
      setSearchedMovieList([]);
      timeoutId = setTimeout(() => {
        searchStringApiCall();
      }, delay);
    } else {
      setFilteredMovieList(movieList);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => clearTimeout(timeoutId);
  }, [searchString]);

  function filterMoviesFromGenre(list, selectedFilterId) {
    let temp = list.reduce((acc, cur) => {
      let obj = {
        year: cur.year,
        movies: cur.movies.filter((mv) =>
          mv.genre_ids.includes(+selectedFilterId)
        ),
      };
      acc.push(obj);
      return acc;
    }, []);
    return temp;
  }

  const handleScroll = () => {
    lastScrollTop = scrollY;
    scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const documentHeight = document.body.scrollHeight;
    if (scrollY > 200) flag = true;
    if (scrollY + windowHeight >= documentHeight - 200 && !isLoading) {
      if (searchString) searchStringApiCall(false);
      else {
        lastFrontVisitedYear++;
        if (lastFrontVisitedYear >= new Date().getFullYear()) return;
        sendRequest(
          getMoviesByYearApiUrl(lastFrontVisitedYear),
          movieListResponse
        );
      }
    } else if (scrollY < 150 && flag && !isLoading && !searchString) {
      lastBackVisitedYear--;
      sendRequest(
        getMoviesByYearApiUrl(lastBackVisitedYear),
        movieListResponse
      );
    }
  };

  const searchStringApiCall = async (shouldUseCache) => {
    if (movieDataCache.hasOwnProperty(searchString) && shouldUseCache) {
      setFilteredMovieList((prev) => [
        ...prev,
        { year: "", movies: movieDataCache[searchString] },
      ]);
      setSearchedMovieList((prev) => [
        ...prev,
        { year: "", movies: movieDataCache[searchString] },
      ]);
    } else {
      sendRequest(
        getMoviesFromSearchStringApiUrl(searchString, pageNo),
        searchedMovieResponse,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        }
      );
    }
  };

  return (
    <div className="main-container">
      {scrollY < lastScrollTop && isLoading && <LoadingSpinner />}
      {!isLoading &&
      searchString &&
      filteredMovieList[0]?.movies?.length === 0 ? (
        <div className="search-string-error-container">
          <p>
            {'Your search for "' + searchString + '" did not find any match'}
          </p>
        </div>
      ) : (
        <div id="movie-list-container">
          {searchString && (
            <MovieSuggetion filteredMovieList={filteredMovieList} />
          )}
          {filteredMovieList?.map((data, index) => {
            if (data?.movies?.length === 0) return <></>;
            return (
              <div className="movie-list-subContainer" key={index}>
                <div
                  className="movie-released-year-text"
                  id={data.year ?? `col-${index}`}
                >
                  {data.year}
                </div>
                <div className="movie-list-box-container">
                  {data?.movies?.map((mv) => (
                    <Movie movie={mv} key={mv.id} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {scrollY > lastScrollTop && isLoading && <LoadingSpinner />}
      {filteredMovieList.length === 0 && <Shimmer />}
    </div>
  );
};

export default MovieList;
