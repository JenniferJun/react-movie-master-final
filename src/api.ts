const API_KEY = "8ea55c61ae706950c17649d211cd2732";
export const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IMovieDetail {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  budget: string;
  genres: [{ id: number; name: string }];
  runtime: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  release_date: string;
  rating: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWE1NWM2MWFlNzA2OTUwYzE3NjQ5ZDIxMWNkMjczMiIsIm5iZiI6MTc0MDk3OTE0Mi4xNTIsInN1YiI6IjY3YzUzYmM2NTY0ZDI1NzVkOTkxZWUxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.boEEWEKtahlZdQAdgDEYpF5v3Xg1rU3_llGj2Ex2Q6k",
  },
};

//https://api.themoviedb.org/3/movie/now_playing
export function getNowPlaying() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

//https://api.themoviedb.org/3/movie/popular
export function getPopular() {
  return fetch(`${BASE_PATH}/movie/popular`, getOptions).then((response) =>
    response.json()
  );
}

//https://api.themoviedb.org/3/movie/
export function getCommingSoon() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

//https://api.themoviedb.org/3/movie/{movie_id}
export function getMovieInfo(movie_id: string | undefined) {
  const a = fetch(`${BASE_PATH}/movie/${movie_id}`, getOptions).then(
    (response) => response.json()
  );
  //console.log(a);
  return a;
}
