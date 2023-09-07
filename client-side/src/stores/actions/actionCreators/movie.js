import {
  MOVIES_LOADING,
  MOVIES_SUCCESS,
  MOVIE_DETAIL_LOADING,
  MOVIE_DETAIL_SUCCESS,
} from "../actionType";

import { API_URL } from "../../../config/api";

export function fetchMoviesSuccess(payload) {
  return {
    type: MOVIES_SUCCESS,
    payload,
  };
}

export function fetchMoviesLoading(payload) {
  return {
    type: MOVIES_LOADING,
    payload,
  };
}

export function fetchMovieDetailSuccess(payload) {
  return {
    type: MOVIE_DETAIL_SUCCESS,
    payload,
  };
}
export function fetchMovieDetailLoading(payload) {
  return {
    type: MOVIE_DETAIL_LOADING,
    payload,
  };
}

export function fetchMovies() {
  return async (dispatch) => {
    try {
      dispatch(fetchMoviesLoading(true));
      const response = await fetch(API_URL + "/movie", {
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(fetchMoviesSuccess(responseJSON));
    } catch (error) {
      console.log(err);
    } finally {
      dispatch(fetchMoviesLoading(false));
    }
  };
}

export function fetchMoviesById(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchMovieDetailLoading(true));
      const response = await fetch(API_URL + `/movie/${id}`, {
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(fetchMovieDetailSuccess(responseJSON));
    } catch (error) {
      console.log(err);
    } finally {
      dispatch(fetchMovieDetailLoading(false));
    }
  };
}

/*
export function fetchMovies(){
  return async (dispatch)=>{
    try {
      
    } catch (error) {
      console.log(err)
    } finally {
      
    }
  }
}
*/
