import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react-native';
import MoviesListItem from 'components/MoviesListItem';
import { renderWithProviders } from 'test-utils/render';

describe('MoviesListItem', () => {
  afterEach(cleanup);

  const fakeStore = {
    user: {
      id: 1,
      name: 'John',
      email: 'john.doe@example.com',
    },
    error: {},
    status: {},
    movies: {
      data: [
        { id: 1, poster_path: 'path' },
        { id: 2, poster_path: 'another_path' },
      ],
      genres: [
        { id: 1, name: 'mockGenre1' },
        { id: 2, name: 'mockGenre2' },
      ],
      favourites: [2],
    },
  };

  test('renders the <MoviesListItem /> correctly with a passed uri', async () => {
    const uri = 'https://fakeUri.com';
    const { findByTestId } = renderWithProviders(
      <MoviesListItem uri={uri} id={2} />,
      {
        initialState: fakeStore,
      }
    );
    const image = await findByTestId('movie-image');
    expect(image.props).toMatchInlineSnapshot(`
      Object {
        "children": undefined,
        "onLoadEnd": [Function],
        "resizeMode": "contain",
        "source": Object {
          "uri": "https://fakeUri.com",
        },
        "style": Object {
          "height": 600,
          "margin": 5,
        },
        "testID": "movie-image",
      }
    `);
  });

  test('does NOT render the <MoviesListItem /> when there is no uri passed to it', () => {
    const { queryByTestId } = renderWithProviders(<MoviesListItem />, {
      initialState: fakeStore,
    });
    expect(queryByTestId('movie-image')).toBeNull();
  });

  test('handles tapping in a movie', () => {
    const mockMoviePressHandler = jest.fn();
    const { getByTestId } = renderWithProviders(
      <MoviesListItem uri="uri" handleMoviePress={mockMoviePressHandler} />,
      {
        initialState: fakeStore,
      }
    );
    const el = getByTestId('movie-image');
    fireEvent.press(el);
    expect(mockMoviePressHandler).toHaveBeenCalledTimes(1);
  });
});
