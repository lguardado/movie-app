import React from 'react';
import Home from 'components/Home';
import { renderWithProviders } from 'test-utils/render';

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
    prefixUrl: 'http://foo.bar/w780',
  },
};

describe('Home', () => {
  test('should render a movies container', () => {
    const { getByTestId } = renderWithProviders(<Home />, {
      initialState: fakeStore,
    });
    expect(getByTestId('moviesContainer').props).toMatchInlineSnapshot(`
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
});
