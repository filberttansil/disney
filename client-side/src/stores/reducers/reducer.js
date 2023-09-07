import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import genreReducer from "./genreReducer";

const rootReducer = combineReducers({
  movie: movieReducer,
  genre: genreReducer,
});

export default rootReducer;
