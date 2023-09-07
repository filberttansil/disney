import { GENRES_LOADING, GENRES_SUCCESS } from "../actions/actionType";

const initialState = {
  genres: [],
  genresLoading: true,
  dataGenresLength: null,
};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENRES_SUCCESS:
      // CARA DEBUG
      const objDebug = {
        ...state,
        genres: action.payload.data,
        dataGenresLength: action.payload.dataLength,
      };

      //   console.log("Dari reducer", objDebug);
      return objDebug;
    case GENRES_LOADING:
      return {
        ...state,
        genresLoading: action.payload,
      };
    default:
      return state;
  }
};

export default genreReducer;
