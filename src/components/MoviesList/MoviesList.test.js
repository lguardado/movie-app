import { cleanup } from '@testing-library/react-native';
import React from 'react';
import MoviesList from 'components/MoviesList';
import { renderWithProviders } from 'test-utils/render';

const mockMovies = [
  { id: 1, poster_path: 'path' },
  { id: 2, poster_path: 'another_path' },
];

const fakeStore = {
  movies: {
    data: [
      { id: 1, poster_path: 'path' },
      { id: 2, poster_path: 'another_path' },
    ],
    genres: [
      { id: 1, name: 'mockGenre1' },
      { id: 2, name: 'mockGenre2' },
    ],
  },
};

afterEach(cleanup);

const renderMoviesList = props => {
  return renderWithProviders(<MoviesList testID="list" {...props} />, {
    initialState: fakeStore,
  });
};

describe('Movies List', () => {
  const props = {
    movies: mockMovies,
    fetchMore: jest.fn(),
    isFetching: false,
    error: null,
    handleMoviePress: jest.fn(),
  };

  test('it renders the movies list correctly', async () => {
    const { findByTestId } = renderMoviesList(props);
    const el = await findByTestId('movies-flatlist');
    expect(el.props.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": 1,
          "poster_path": "path",
        },
        Object {
          "id": 2,
          "poster_path": "another_path",
        },
      ]
    `);
  });

  test('it does NOT render a <MoviesList />  when there are no movies', async () => {
    const noMovieProps = {
      movies: [],
      fetchMore: jest.fn(),
      isFetching: false,
      error: null,
      handleMoviePress: jest.fn(),
    };
    const { queryByTestId } = renderMoviesList(noMovieProps);
    expect(queryByTestId('movies-flatlist')).toBeNull();
  });
});
