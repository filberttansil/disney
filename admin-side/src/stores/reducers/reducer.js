// IMPORT COMBINE REDUCERS DI ROOT REDUCER
import { combineReducers } from "redux";

// IMPORT REDUCERS UTK DI COMBINE
import movieReducer from "./movieReducer";
import genreReducer from "./genreReducer";
// BUAT ROOT REDUCERS
const rootReducers = combineReducers({
  movie: movieReducer,
  genre: genreReducer,
});

// EXPORT ROOT REDUCER UNTUK DITERIMA DI ROOT STORE (store.js)
export default rootReducers;
