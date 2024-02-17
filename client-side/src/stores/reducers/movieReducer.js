// IMPORT ACTION TYPE FOR REDUCER
import {
  MOVIES_LOADING,
  MOVIES_SUCCESS,
  MOVIE_DETAIL_LOADING,
  MOVIE_DETAIL_SUCCESS,
} from "../actions/actionType";

// INITIAL STATE
const initialState = {
  movie: null,
  movies: [],
  dataMoviesLength: null,
  moviesLoading: false,
  movieLoading: true,
};

// REDUCER FUNCTION
const movieReducer = (state = initialState, action) => {
  // SWITCH CASE FOR ACTION TYPE
  switch (action.type) {
    case MOVIES_SUCCESS:
      // RETURN NEW STATE
      return {
        ...state,
        movies: action.payload,
        dataMoviesLength: action.payload.dataLength,
      };
    case MOVIES_LOADING:
      return {
        ...state,
        moviesLoading: action.payload,
      };

    // MOVIE SINGULAR
    case MOVIE_DETAIL_LOADING:
      return {
        ...state,
        movieLoading: action.payload,
      };

    case MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        movie: action.payload.data,
      };

    default:
      return state;
  }
};

// EXPORT REDUCER FUNCTION
export default movieReducer;
