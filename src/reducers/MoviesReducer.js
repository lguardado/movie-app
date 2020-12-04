import { actionTypes } from 'actions/MoviesActions';

const initialState = {
  data: [],
  page: 1,
  prefixUrl: '',
  genres: [],
  favourites: [],
};

const addNewMovies = (prevMovies, moviesToAdd) => {
  const newArray = prevMovies ? [...prevMovies] : [];
  // Verifying the items in the new array are not existing before ading them
  moviesToAdd.forEach(element => {
    if (!newArray.find(el => el.id === element.id)) {
      newArray.push(element);
    }
  });
  return newArray;
};

const moviesReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case actionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        data: addNewMovies(state.data, payload.movies),
        page: state.page + 1,
      };
    case actionTypes.FETCH_PREFIX_SUCCESS:
      return { ...state, prefixUrl: payload.prefix };
    case actionTypes.FETCH_GENRES_SUCCESS:
      return { ...state, genres: payload.genres };
    case actionTypes.CLEAR_STORE:
      return initialState;
    case actionTypes.ADD_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites
          ? state.favourites.concat(payload.id)
          : [payload.id],
      };
    case actionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites.filter(id => id !== payload.id),
      };
    default:
      return state;
  }
};

export default moviesReducer;
