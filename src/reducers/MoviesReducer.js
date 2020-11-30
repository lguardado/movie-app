import { actionTypes } from 'actions/MoviesActions';

const initialState = {
  data: [],
  page: 1,
  prefixUrl: '',
  genres: [],
};

const addNewMovies = (prevMovies, moviesToAdd) => {
  const newArray = [...prevMovies];
  // Verifying the items in the new array are not existing before ading them
  moviesToAdd.forEach(element => {
    if (!prevMovies.includes(el => el.id === element.id)) {
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
    default:
      return state;
  }
};

export default moviesReducer;
