import { cleanup, render } from '@testing-library/react-native';
import React from 'react';
import MoviesList from 'components/MoviesList';

const mockMovies = [
  { id: 'foo', poster_path: 'path' },
  { id: 'bar', poster_path: 'another_path' },
];

jest.mock('components/common/hooks/useFetchMovies');

afterEach(cleanup);

describe('Movies List', () => {
  const props = {
    movies: mockMovies,
    fetchMore: jest.fn(),
    isFetching: false,
    error: null,
  };

  test('it renders the movies list correctly', () => {
    const { queryByTestId } = render(<MoviesList {...props} />);
    const el = queryByTestId('moviesflatList');
    expect(el.props.data).toEqual(mockMovies);
  });

  test('it does NOT render a <MoviesList />  when there are no movies', () => {
    const { queryByTestId } = render(<MoviesList />);
    expect(queryByTestId('moviesflatList')).toBeNull();
  });
});
