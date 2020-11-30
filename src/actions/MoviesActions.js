import {
  fetchMovies as fetchMoviesAsync,
  fetchConfiguration as fetchConfigAsync,
  fetchGenres as fetchGenresAsync,
} from 'controllers/MoviesClient';

export const actionTypes = {
  FETCH_MOVIES_REQUEST: 'FETCH_MOVIES_REQUEST',
  FETCH_MOVIES_SUCCESS: 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_ERROR: 'FETCH_MOVIES_ERROR',
  MOVIES: 'MOVIES',
  FETCH_PREFIX_REQUEST: 'FETCH_PREFIX_REQUEST',
  FETCH_PREFIX_SUCCESS: 'FETCH_PREFIX_SUCCESS',
  FETCH_PREFIXIG_ERROR: 'FETCH_PREFIXIG_ERROR',
  FETCH_GENRES_REQUEST: 'FETCH_GENRES_REQUEST',
  FETCH_GENRES_SUCCESS: 'FETCH_GENRES_SUCCESS',
  FETCH_GENRESIG_ERROR: 'FETCH_GENRESIG_ERROR',
};

const fetchMoviesRequest = () => ({
  type: actionTypes.FETCH_MOVIES_REQUEST,
  payload: null,
});

const fetchMoviesError = error => ({
  type: actionTypes.FETCH_MOVIES_ERROR,
  payload: { error },
});

const fetchMoviesSuccess = movies => ({
  type: actionTypes.FETCH_MOVIES_SUCCESS,
  payload: { movies },
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
  const small = 1;
  dispatch(fetchPrefixRequest());
  try {
    const prefix = await fetchConfigAsync();
    dispatch(
      fetchPrefixSuccess(
        prefix.images.base_url + prefix.images.backdrop_sizes[small]
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
