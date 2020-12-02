import { cleanup, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import MoviesList from 'components/MoviesList';

const mockMovies = [
  { id: 'foo', poster_path: 'path' },
  { id: 'bar', poster_path: 'another_path' },
];

afterEach(cleanup);

const renderMoviesList = props => {
  return render(<MoviesList {...props} />);
};

describe('Movies List', () => {
  const props = {
    movies: mockMovies,
    fetchMore: jest.fn(),
    isFetching: false,
    error: null,
    handleMoviePress: jest.fn(),
  };

  test('it renders the movies list correctly', () => {
    const { queryByTestId } = renderMoviesList(props);
    const el = queryByTestId('movies-flatlist');
    expect(el.props.data).toEqual(mockMovies);
  });

  test('handles tapping in a movie', () => {
    const { queryAllByTestId } = renderMoviesList(props);
    const el = queryAllByTestId('movie-image')[0];
    fireEvent.press(el);
    expect(props.handleMoviePress).toHaveBeenCalledTimes(1);
  });

  test('it does NOT render a <MoviesList />  when there are no movies', () => {
    const { queryByTestId } = renderMoviesList();
    expect(queryByTestId('movies-flatlist')).toBeNull();
  });
});
