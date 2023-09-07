import { GENRES_LOADING, GENRES_SUCCESS } from "../actionType";
import { API_URL } from "../../../config/api";

export function fetchGenresSuccess(payload) {
  return {
    type: GENRES_SUCCESS,
    payload,
  };
}

export function fetchGenresLoading(payload) {
  return {
    type: GENRES_LOADING,
    payload,
  };
}
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
    } catch (error) {
      console.log(err);
    } finally {
      dispatch(fetchGenresLoading(false));
    }
  };
}
