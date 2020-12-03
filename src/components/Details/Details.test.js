import React from 'react';
import { cleanup } from '@testing-library/react-native';
import Details from 'components/Details';
import { renderWithProviders } from 'test-utils/render';

const fakeRoute = {
  params: {
    movie: {
      id: 'fakeId',
      backdrop_path: '/bar.jpeg',
      poster_path: '/bar.big.jpeg',
      title: 'Fake Movie',
      original_title: 'Mocked movie',
      release_date: '10/10/2020',
      vote_average: 8,
      overview: 'This is a great mocked movie',
      genre_ids: [1, 2],
    },
  },
};

const fakeRouteWithSameTitle = {
  params: {
    movie: {
      id: 'fakeId',
      backdrop_path: '/bar.jpeg',
      poster_path: '/bar.big.jpeg',
      title: 'Original Title',
      original_title: 'Original Title',
      release_date: '10/10/2020',
      vote_average: 8,
      overview: 'This is a great mocked movie',
      genre_ids: [1, 2],
    },
  },
};

const fakeStore = {
  user: {
    id: 1,
    name: 'John',
    email: 'john.doe@example.com',
  },
  error: {},
  status: {},
  movies: {
    genres: [
      { id: 1, name: 'mockGenre1' },
      { id: 2, name: 'mockGenre2' },
    ],
  },
};

const renderDetails = props => {
  return renderWithProviders(<Details {...props} />, {
    initialState: fakeStore,
  });
};

describe('Details', () => {
  afterEach(cleanup);

  test('render <Details /> without crashing', () => {
    renderDetails({ route: fakeRoute });
  });

  test("it doesn't render the original title when it's the same as the title", () => {
    const { queryByText } = renderDetails({ route: fakeRouteWithSameTitle });
    const movieTitle = queryByText(/Original Title/);
    expect(movieTitle.props.children).toContain('Original Title');
    expect(movieTitle.props.children).not.toContain('(');
  });

  test('it renders the title and the original title', async () => {
    const { findByText } = renderDetails({ route: fakeRoute });
    const movieTitle = await findByText(/Fake Movie/);
    expect(movieTitle.props.children).toContain('Fake Movie');
    expect(movieTitle.props.children).toContain('(Mocked movie)');
  });

  test('renders an image background', async () => {
    const { findByTestId } = renderDetails({ route: fakeRoute });
    const imageBackground = await findByTestId('image-background');
    expect(imageBackground).toBeTruthy();
  });

  test('<Details /> matches inline snapshot', async () => {
    const { findByTestId } = renderDetails({ route: fakeRoute });
    const el = await findByTestId('detail-scroll-view');
    expect(el).toBeDefined();
    expect(el.props).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          undefined,
          <View>
            <ImageBackground
              resizeMode="cover"
              source={
                Object {
                  "uri": "undefined/bar.jpeg",
                }
              }
              style={
                Object {
                  "height": 300,
                }
              }
              testID="image-background"
            />
            <View
              style={
                Array [
                  Object {
                    "flex": 1,
                    "padding": 20,
                    "top": -100,
                  },
                  Object {
                    "backgroundColor": undefined,
                  },
                ]
              }
            >
              <View
                style={
                  Object {
                    "alignItems": "center",
                    "flexDirection": "row",
                    "justifyContent": "space-evenly",
                  }
                }
              >
                <Image
                  resizeMode="contain"
                  source={
                    Object {
                      "uri": "undefined/bar.big.jpeg",
                    }
                  }
                  style={
                    Object {
                      "borderColor": "white",
                      "borderWidth": 0.5,
                      "flex": 1,
                      "height": 190,
                      "width": 200,
                    }
                  }
                />
                <Text
                  style={
                    Array [
                      Object {
                        "color": "rgb(0, 122, 255)",
                      },
                      Object {
                        "color": "coral",
                        "flex": 2,
                        "flexWrap": "wrap",
                        "fontSize": 30,
                        "marginLeft": 2,
                        "marginTop": 65,
                      },
                      Object {
                        "alignSelf": "center",
                        "textAlign": "center",
                      },
                    ]
                  }
                >
                  Fake Movie
                   
                  (Mocked movie)
                </Text>
              </View>
              <MovieInfo
                genres={
                  Array [
                    "mockGenre1",
                    "mockGenre2",
                  ]
                }
                overview="This is a great mocked movie"
                releaseDate="10/10/2020"
                testID="movie-info"
                voteAverage={8}
              />
            </View>
          </View>,
        ],
        "testID": "detail-scroll-view",
      }
    `);
  });
});
