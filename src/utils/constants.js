export const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDMxY2M1OGFhN2Q2YjM1YzhhODhiMzUwNTNhNDU5NiIsInN1YiI6IjY1M2RlMmExNTkwN2RlMDExYmM1MGZiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4_owJwkmsNp64kdJ9qXThThayPtteJB9TpGFaaMWGs";

export const FILTERS = [
  {
    name: "All",
    id: "",
  },
  {
    name: "Adventure",
    id: "12",
  },
  {
    name: "Action",
    id: "28",
  },
  {
    name: "Fantasy",
    id: "14",
  },
  {
    name: "Family",
    id: "10751",
  },
];

const BASE_URL = "https://api.themoviedb.org/3/";

export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/w500/";

export function getMoviesByYearApiUrl(releaseYear) {
  return `${BASE_URL}discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${releaseYear}&page=1&vote_count.gte=100`;
}

export function getMoviesFromSearchStringApiUrl(searchString, pageNo) {
  return `${BASE_URL}search/movie?query=${searchString}&include_adult=false&language=en-US&page=${pageNo}`;
}
