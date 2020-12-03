import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as moviesActions from 'actions/MoviesActions';
import {
  fetchMovies,
  fetchConfiguration,
  fetchGenres,
} from 'controllers/MoviesClient';

jest.mock('controllers/MoviesClient');

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

const movieErrorActions = [
  {
    type: moviesActions.actionTypes.FETCH_MOVIES_REQUEST,
    payload: null,
  },
  {
    type: moviesActions.actionTypes.FETCH_MOVIES_ERROR,
    payload: {
      error: 'error fetching',
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

describe('MoviesActions', () => {
  fetchMovies.mockReturnValueOnce(
    Promise.resolve({
      results: [
        { id: 'foo', poster_path: 'path' },
        { id: 'bar', poster_path: 'another_path' },
      ],
    })
  );
  const mockStore = configureStore([thunk]);

  it('should create an action for fetchMovies', async () => {
    const store = mockStore({});

    await store.dispatch(moviesActions.fetchMovies());
    const actions = store.getActions();
    expect(actions).toEqual(movieActions);
  });

  it('should create an action for fetchMovies when errored', async () => {
    // mocking error response from server
    fetchMovies.mockReturnValueOnce(
      Promise.reject(new Error('error fetching'))
    );
    const store = mockStore({});

    await store.dispatch(moviesActions.fetchMovies());
    const actions = store.getActions();
    expect(actions).toEqual(movieErrorActions);
  });

  it('should create an action for fetchPrefix', async () => {
    fetchConfiguration.mockReturnValueOnce(
      Promise.resolve({
        images: {
          base_url: 'http://foo.bar/',
          backdrop_sizes: ['w300', 'w780'],
        },
      })
    );
    const store = mockStore({});

    await store.dispatch(moviesActions.fetchPrefix());
    const actions = store.getActions();
    expect(actions).toEqual(prefixActions);
  });

  it('should create an action for fetchGenres', async () => {
    fetchGenres.mockReturnValueOnce(
      Promise.resolve({
        genres: [
          { id: 1, name: 'mockGenre1' },
          { id: 2, name: 'mockGenre2' },
        ],
      })
    );
    const store = mockStore({});

    await store.dispatch(moviesActions.fetchGenres());
    const actions = store.getActions();
    expect(actions).toEqual(genresActions);
  });
});
