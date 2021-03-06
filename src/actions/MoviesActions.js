import {
  fetchMovies as fetchMoviesAsync,
  fetchConfiguration as fetchConfigAsync,
  fetchGenres as fetchGenresAsync,
} from 'controllers/MoviesClient';
import imageConstants from 'constants/images';

export const actionTypes = {
  ADD_FAVOURITE: 'ADD_FAVOURITE',
  CLEAR_STORE: 'CLEAR_STORE',
  FETCH_MOVIES_REQUEST: 'FETCH_MOVIES_REQUEST',
  FETCH_MOVIES_SUCCESS: 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_ERROR: 'FETCH_MOVIES_ERROR',
  FETCH_MOVIES: 'FETCH_MOVIES',
  FETCH_PREFIX_REQUEST: 'FETCH_PREFIX_REQUEST',
  FETCH_PREFIX_SUCCESS: 'FETCH_PREFIX_SUCCESS',
  FETCH_PREFIXIG_ERROR: 'FETCH_PREFIXIG_ERROR',
  FETCH_GENRES_REQUEST: 'FETCH_GENRES_REQUEST',
  FETCH_GENRES_SUCCESS: 'FETCH_GENRES_SUCCESS',
  FETCH_GENRESIG_ERROR: 'FETCH_GENRESIG_ERROR',
  REMOVE_FAVOURITE: 'REMOVE_FAVOURITE',
  SET_LAST_FETCH_DATE: 'SET_LAST_FETCH_DATE',
  SET_DATA_EXPIRATION_DAYS: 'SET_DATA_EXPIRATION_DAYS',
};

const fetchMoviesRequest = () => ({
  type: actionTypes.FETCH_MOVIES_REQUEST,
  payload: null,
});

const fetchMoviesError = error => ({
  type: actionTypes.FETCH_MOVIES_ERROR,
  payload: { error },
});

export const clearStore = () => ({
  type: actionTypes.CLEAR_STORE,
  payload: null,
});

export const setDataExpirationDays = days => ({
  type: actionTypes.SET_DATA_EXPIRATION_DAYS,
  payload: days,
});

const fetchMoviesSuccess = movies => ({
  type: actionTypes.FETCH_MOVIES_SUCCESS,
  payload: { movies },
});

export const addFavourite = id => ({
  type: actionTypes.ADD_FAVOURITE,
  payload: { id },
});

export const removeFavourite = id => ({
  type: actionTypes.REMOVE_FAVOURITE,
  payload: { id },
});

export const setLastFecthDate = date => ({
  type: actionTypes.SET_LAST_FETCH_DATE,
  payload: { date },
});

export const fetchMovies = page => async dispatch => {
  dispatch(fetchMoviesRequest());
  try {
    const res = await fetchMoviesAsync(page);
    const movies = res.results;
    dispatch(fetchMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchMoviesError(error.message));
  }
};

const fetchPrefixRequest = () => ({
  type: actionTypes.FETCH_PREFIX_REQUEST,
  payload: null,
});

const fetchPrefixError = error => ({
  type: actionTypes.FETCH_PREFIX_ERROR,
  payload: { error },
});

const fetchPrefixSuccess = prefix => ({
  type: actionTypes.FETCH_PREFIX_SUCCESS,
  payload: { prefix },
});

export const fetchPrefix = () => async dispatch => {
  dispatch(fetchPrefixRequest());
  try {
    const prefix = await fetchConfigAsync();
    dispatch(
      fetchPrefixSuccess(
        prefix.images.base_url +
          prefix.images.backdrop_sizes[imageConstants.small]
      )
    );
  } catch (error) {
    dispatch(fetchPrefixError(error.message));
  }
};

const fetchGenresRequest = () => ({
  type: actionTypes.FETCH_GENRES_REQUEST,
  payload: null,
});

const fetchGenresError = error => ({
  type: actionTypes.FETCH_GENRES_ERROR,
  payload: { error },
});

const fetchGenresSuccess = genres => ({
  type: actionTypes.FETCH_GENRES_SUCCESS,
  payload: { genres },
});

export const fetchGenres = () => async dispatch => {
  dispatch(fetchGenresRequest());
  try {
    const { genres } = await fetchGenresAsync();
    dispatch(fetchGenresSuccess(genres));
  } catch (error) {
    dispatch(fetchGenresError(error.message));
  }
};
