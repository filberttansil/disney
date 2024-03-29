import { LOGIN_SUCCESS, REGISTER_SUCCESS } from "../actionType";
import { API_URL } from "../../../config/api";

export function login(userData) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw data.message;
      }
      localStorage.setItem("access_token", data.message);
      return dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function register(userData) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = response.json();
      if (!response.ok) {
        throw data.message;
      }
      return dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}
