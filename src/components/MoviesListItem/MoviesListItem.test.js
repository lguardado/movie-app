import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react-native';
import MoviesListItem from 'components/MoviesListItem';
import { renderWithProviders } from 'test-utils/render';

describe('MoviesListItem', () => {
  afterEach(cleanup);

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
      favourites: [2],
    },
  };

  test('renders the <MoviesListItem /> correctly with a passed uri', async () => {
    const uri = 'https://fakeUri.com';
    const { findByTestId, getByTestId } = renderWithProviders(
      <MoviesListItem uri={uri} id={2} />,
      {
        initialState: fakeStore,
      }
    );
    const image = await findByTestId('movie-image');
    const placeholder = getByTestId('movie-placeholder');
    expect(placeholder.props).toMatchInlineSnapshot(`
      Object {
        "children": <Image
          resizeMode="center"
          source={
            Object {
              "testUri": "../../../src/assets/img_placeholder/not-found.png",
            }
          }
        />,
        "style": Object {
          "alignItems": "center",
          "alignSelf": "center",
          "backgroundColor": "transparent",
          "borderBottomColor": "rgb(0, 122, 255)",
          "borderTopColor": "rgb(0, 122, 255)",
          "borderWidth": 0.5,
          "flex": 1,
          "height": 600,
          "justifyContent": "center",
          "padding": 20,
          "position": "absolute",
          "width": "96%",
        },
        "testID": "movie-placeholder",
      }
    `);
    expect(image.props).toMatchInlineSnapshot(`
      Object {
        "children": undefined,
        "onFastImageError": undefined,
        "onFastImageLoad": undefined,
        "onFastImageLoadEnd": [Function],
        "onFastImageLoadStart": undefined,
        "onFastImageProgress": undefined,
        "resizeMode": "contain",
        "source": Object {
          "uri": "https://fakeUri.com",
        },
        "style": Object {
          "bottom": 0,
          "left": 0,
          "position": "absolute",
          "right": 0,
          "top": 0,
        },
        "testID": "movie-image",
        "tintColor": undefined,
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
