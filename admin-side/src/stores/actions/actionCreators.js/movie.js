import {
  MOVIES_SUCCESS,
  MOVIES_LOADING,
  MOVIE_LOADING,
  MOVIE_SUCCESS,
} from "../actionType";
import { API_URL } from "../../../config/api";

export const fetchMoviesSuccess = (payload) => {
  return {
    type: MOVIES_SUCCESS,
    payload,
  };
};

export const fetchMoviesLoading = (payload) => {
  return {
    type: MOVIES_LOADING,
    payload,
  };
};

export const fetchMovieByIdLoading = (payload) => {
  return {
    type: MOVIE_LOADING,
    payload,
  };
};

export const fetchMoviesByIdSuccess = (payload) => {
  return {
    type: MOVIE_SUCCESS,
    payload,
  };
};

export function fetchMovies() {
  // The `extraArgument` is the third arg for thunk functions
  return async (dispatch, getState) => {
    // you can use api here
    try {
      dispatch(fetchMoviesLoading(true));
      const response = await fetch(API_URL + "/movie", {
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      //   .json() <= utk baca
      const responseJSON = await response.json();

      dispatch(fetchMoviesSuccess(responseJSON));
    } catch (error) {
      throw error;
    } finally {
      dispatch(fetchMoviesLoading(false));
    }
  };
}
export function fetchMovieById(id) {
  return async (dispatch) => {
    try {
      console.log("masuk actionCreator", id);
      dispatch(fetchMovieByIdLoading(true));
      const response = await fetch(API_URL + `/movie/${id}`, {
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const responseJson = await response.json();

      dispatch(fetchMoviesByIdSuccess(responseJson));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchMovieByIdLoading(false));
    }
  };
}
export function createMovie(movieData) {
  return async (dispatch) => {
    try {
      dispatch(fetchMoviesLoading(true));
      await fetch(API_URL + "/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(movieData),
      });
      dispatch(fetchMovies());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchMoviesLoading(false));
    }
  };
}

export function updateMovie(id, movieData) {
  return async (dispatch) => {
    try {
      dispatch(fetchMoviesLoading(true));
      await fetch(API_URL + `/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(movieData),
      });
      dispatch(fetchMovies());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchMoviesLoading(false));
    }
  };
}

export function deleteMovie(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchMoviesLoading(true));
      await fetch(API_URL + `/movie/${id}`, {
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(fetchMovies());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchMoviesLoading(false));
    }
  };
}
