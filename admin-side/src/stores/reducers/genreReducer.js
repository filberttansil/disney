import {
  EDIT_GENRE_SUCCESS,
  GENRE_LOADING,
  GENRE_SUCCESS,
} from "../actions/actionType";

const initialState = {
  genres: [],
  dataGenresLength: null,
  genresLoading: false,
  GenreId: null,
};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENRE_SUCCESS:
      // CARA DEBUG
      const objDebug = {
        ...state,
        genres: action.payload.data,
        dataGenresLength: action.payload.dataLength,
      };

      //   console.log("Dari reducer", objDebug);
      return objDebug;
    case GENRE_LOADING:
      return {
        ...state,
        genresLoading: action.payload,
      };
    case EDIT_GENRE_SUCCESS:
      // VARIABLE PENAMPUNG HASIL MAP YG REASSIGN VALUE TARGETED ELEMENT YG AKAN DIUPDATE
      const updatedGenres = state.genres.map((genre) =>
        genre.id === action.payload.GenreId
          ? action.payload.updatedGenre
          : genre
      );
      return {
        ...state,
        // GANTI ISI INITIAL STATE GENRES DENGAN VARIABLE DIATAS
        genres: updatedGenres,
      };
    default:
      return state;
  }
};

export default genreReducer;
