import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import MovieInfo from 'components/MovieInfo';

const fakeProps = {
  releaseDate: '10/10/2020',
  voteAverage: 8.3,
  overview: 'This is a great mocked movie',
  genres: ['mockGenre1, mockGenre2'],
};

const renderMovieInfo = props => {
  return render(<MovieInfo {...props} />);
};

describe('<MovieInfo />', () => {
  afterEach(cleanup);
  test('render <MovieInfo /> without crashing', () => {
    renderMovieInfo(fakeProps);
  });

  test('it renders the genres proprely', () => {
    const { queryByText } = renderMovieInfo(fakeProps);
    const genres = queryByText(/mockGenre1, mockGenre2/);
    expect(genres.props.children).toMatch('mockGenre1, mockGenre2');
  });

  test('it shows the correct voteAverage', async () => {
    const { findByText } = renderMovieInfo(fakeProps);
    const vote = await findByText('8.3');
    expect(vote.props.children).toMatch(fakeProps.voteAverage.toString());
  });

  test('it renders the stars rate', async () => {
    const { findByTestId } = renderMovieInfo(fakeProps);
    const genres = await findByTestId('star-rate');
    expect(genres.props).toMatchInlineSnapshot(`
      Object {
        "children": <Star
          score={4.15}
          style={
            Array [
              Object {
                "alignSelf": "center",
                "textAlign": "center",
              },
              Object {
                "alignItems": "center",
                "flexDirection": "row",
                "justifyContent": "center",
              },
            ]
          }
          totalScore={5}
        />,
        "testID": "star-rate",
      }
    `);
  });
});
