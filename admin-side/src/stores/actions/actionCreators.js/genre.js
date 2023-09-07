import { API_URL } from "../../../config/api";
import { GENRE_LOADING, GENRE_SUCCESS } from "../actionType";

export const fetchGenresSuccess = (payload) => {
  return {
    type: GENRE_SUCCESS,
    payload,
  };
};

export const fetchGenresLoading = (payload) => {
  return {
    type: GENRE_LOADING,
    payload,
  };
};

// THUNKS
export function fetchGenres() {
  return async (dispatch) => {
    try {
      dispatch(fetchGenresLoading(true));
      const response = await fetch(API_URL + "/genre", {
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();

      dispatch(fetchGenresSuccess(responseJSON));
    } catch (err) {
      throw err;
    } finally {
      dispatch(fetchGenresLoading(false));
    }
  };
}

export function createGenre(genreData) {
  return async (dispatch) => {
    try {
      dispatch(fetchGenresLoading(true));
      await fetch(API_URL + "/genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(genreData),
      });
      dispatch(fetchGenres());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchGenresLoading(false));
    }
  };
}

export function editGenre(id, genreData) {
  return async (dispatch) => {
    try {
      dispatch(fetchGenresLoading(true));
      await fetch(API_URL + `/genre/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(genreData),
      });
      dispatch(fetchGenres());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchGenresLoading(false));
    }
  };
}

export function deleteGenre(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchGenresLoading(true));
      await fetch(API_URL + `/genre/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(fetchGenres());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchGenresLoading(false));
    }
  };
}
