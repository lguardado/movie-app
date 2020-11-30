import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as moviesActions from 'actions/MoviesActions';
import {
  fetchMovies,
  fetchConfiguration,
  fetchGenres,
} from 'controllers/MoviesClient';

jest.mock('controllers/MoviesClient');

// mocking responses from server
fetchMovies.mockReturnValueOnce(
  Promise.resolve({
    results: [
      { id: 'foo', poster_path: 'path' },
      { id: 'bar', poster_path: 'another_path' },
    ],
  })
);
fetchConfiguration.mockReturnValueOnce(
  Promise.resolve({
    images: {
      base_url: 'http://foo.bar/',
      backdrop_sizes: ['w300', 'w780'],
    },
  })
);
fetchGenres.mockReturnValueOnce(
  Promise.resolve({
    genres: [
      { id: 1, name: 'mockGenre1' },
      { id: 2, name: 'mockGenre2' },
    ],
  })
);

// Actions
const movieActions = [
  {
    type: moviesActions.actionTypes.FETCH_MOVIES_REQUEST,
    payload: null,
  },
  {
    type: moviesActions.actionTypes.FETCH_MOVIES_SUCCESS,
    payload: {
      movies: [
        { id: 'foo', poster_path: 'path' },
        { id: 'bar', poster_path: 'another_path' },
      ],
    },
  },
];

const prefixActions = [
  {
    type: moviesActions.actionTypes.FETCH_PREFIX_REQUEST,
    payload: null,
  },
  {
    type: moviesActions.actionTypes.FETCH_PREFIX_SUCCESS,
    payload: { prefix: 'http://foo.bar/w780' },
  },
];
const genresActions = [
  {
    type: moviesActions.actionTypes.FETCH_GENRES_REQUEST,
    payload: null,
  },
  {
    type: moviesActions.actionTypes.FETCH_GENRES_SUCCESS,
    payload: {
      genres: [
        { id: 1, name: 'mockGenre1' },
        { id: 2, name: 'mockGenre2' },
      ],
    },
  },
];

describe('UserActions', () => {
  const mockStore = configureStore([thunk]);

  it('should create an action for fetchMovies', async () => {
    const store = mockStore({});

    await store.dispatch(moviesActions.fetchMovies());
    const actions = store.getActions();
    expect(actions).toEqual(movieActions);
  });

  it('should create an action for fetchPrefix', async () => {
    const store = mockStore({});

    await store.dispatch(moviesActions.fetchPrefix());
    const actions = store.getActions();
    expect(actions).toEqual(prefixActions);
  });

  it('should create an action for fetchGenres', async () => {
    const store = mockStore({});

    await store.dispatch(moviesActions.fetchGenres());
    const actions = store.getActions();
    expect(actions).toEqual(genresActions);
  });
});
