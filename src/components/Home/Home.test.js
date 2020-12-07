import React from 'react';
import { waitFor } from '@testing-library/react-native';

import Home from 'components/Home';
import { renderWithProviders } from 'test-utils/render';

const fakeStore = {
  movies: {
    data: [
      { id: 1, poster_path: 'path' },
      { id: 2, poster_path: 'another_path' },
    ],
    prefixUrl: 'http://foo.bar/w780',
    lastFetchDate: new Date(),
    dataExpirationDays: 1,
  },
};

const fakeStoreWithExpirationDate = {
  movies: {
    data: [
      { id: 1, poster_path: 'path' },
      { id: 2, poster_path: 'another_path' },
    ],
    prefixUrl: 'http://foo.bar/w780',
    lastFetchDate: 'Mon Dec 02 2020 15:50:01',
    dataExpirationDays: 1,
  },
};

describe('Home', () => {
  test('should render a movies container', async () => {
    const { findByTestId } = renderWithProviders(<Home />, {
      initialState: fakeStore,
    });
    const container = await findByTestId('moviesContainer');

    // The movies array has the right length
    await waitFor(() =>
      expect(container.props.children[1].props.movies).toHaveLength(2)
    );
    expect(container.props).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          <Center
            style={Object {}}
          >
            <Image
              source={
                Object {
                  "testUri": "../../../src/assets/ic_logo/ic_logo.png",
                }
              }
              style={
                Object {
                  "marginTop": 50,
                }
              }
            />
          </Center>,
          <MoviesList
            fetchMore={[Function]}
            handleMoviePress={[Function]}
            isFetchingMovies={false}
            movies={
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
            }
            urlPrefix="http://foo.bar/w780"
          />,
        ],
        "style": Object {
          "backgroundColor": "black",
        },
        "testID": "moviesContainer",
      }
    `);
  });

  test('deletes the movies when the last fetch date is old', async () => {
    const { findByTestId } = renderWithProviders(<Home />, {
      initialState: fakeStoreWithExpirationDate,
    });
    const container = await findByTestId('moviesContainer');

    // The movies array has the right length
    await waitFor(() =>
      expect(container.props.children[1].props.movies).toHaveLength(0)
    );
  });
});
