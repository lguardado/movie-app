import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import Details from 'components/Details';

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
    },
    genres: ['mockGenre1, mockGenre2'],
  },
};

const fakeRouteWithSameTitle = {
  ...fakeRoute,
  params: {
    ...fakeRoute.params,
    movie: {
      ...fakeRoute.params.movie,
      original_title: fakeRoute.params.movie.title,
    },
  },
};

const renderDetails = props => {
  return render(<Details {...props} />);
};

describe('Details', () => {
  afterEach(cleanup);

  test('render <Details /> without crashing', () => {
    render(<Details route={fakeRoute} />);
  });

  test("it doesn't render the original title when it's the same as the title", () => {
    const { queryByText } = renderDetails({ route: fakeRouteWithSameTitle });
    const movieTitle = queryByText(/Fake Movie/);
    expect(movieTitle.props.children).toContain('Fake Movie');
    expect(movieTitle.props.children).not.toContain('(');
  });

  test('it renders the title and the original title', () => {
    const { queryByText } = renderDetails({ route: fakeRoute });
    const movieTitle = queryByText(/Fake Movie/);
    expect(movieTitle.props.children).toContain('Fake Movie');
    expect(movieTitle.props.children).toContain('(Mocked movie)');
  });

  test('renders an image background', () => {
    const { queryByTestId } = renderDetails({ route: fakeRoute });
    const imageBackground = queryByTestId('image-background');
    expect(imageBackground).toBeTruthy();
  });

  test('<Details /> matches inline snapshot', () => {
    const { queryByTestId } = renderDetails({ route: fakeRoute });
    const el = queryByTestId('detail-scroll-view');
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
                    "mockGenre1, mockGenre2",
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
