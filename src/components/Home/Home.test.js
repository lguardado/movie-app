import React from 'react';
import Home from 'components/Home';
import { renderWithProviders } from 'test-utils/render';
import useFetchMovies from 'components/common/hooks/useFetchMovies';

jest.mock('components/common/hooks/useFetchMovies');

const fakeStore = {
  user: {
    id: 1,
    name: 'John',
    email: 'john.doe@example.com',
  },
  error: {},
  status: {},
};

const mockMovies = [
  { id: 'foo', poster_path: 'path' },
  { id: 'bar', poster_path: 'another_path' },
];

describe('Home', () => {
  test('should render a movies container', async () => {
    useFetchMovies.mockReturnValue({
      movies: mockMovies,
      fetchMore: jest.fn(),
      isFetching: false,
      error: null,
    });

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
          false,
        ],
        "style": Object {
          "backgroundColor": "black",
        },
        "testID": "moviesContainer",
      }
    `);
  });

  // todo: fix this test, the error element isn't being found in the dom.
  // test('should show an error if movies can\t be fetched', () => {
  //   useFetchMovies.mockReturnValue({
  //     movies: [],
  //     fetchMore: jest.fn(),
  //     isFetching: false,
  //     error: { message: 'error fetching movies' },
  //   });
  //   const { getByTestId } = renderWithProviders(<Home />, {
  //     initialState: fakeStore,
  //   });
  //   expect(getByTestId('error').props).toBeTruthy();
  // });
});
