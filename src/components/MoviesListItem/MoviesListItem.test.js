import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import MoviesListItem from 'components/MoviesListItem';

describe('MoviesListItem', () => {
  afterEach(cleanup);

  test('renders the <MoviesListItem /> correctly with a passed uri', () => {
    const uri = 'https://fakeUri.com';
    const { getByTestId } = render(<MoviesListItem uri={uri} />);
    expect(getByTestId('movieImage').props).toMatchInlineSnapshot(`
      Object {
        "children": undefined,
        "resizeMode": "contain",
        "source": Object {
          "uri": "https://fakeUri.com",
        },
        "style": Object {
          "height": 600,
          "margin": 5,
        },
        "testID": "movieImage",
      }
    `);
  });

  test('does NOT render the <MoviesListItem /> when there is no uri passed to it', () => {
    const { queryByTestId } = render(<MoviesListItem />);
    expect(queryByTestId('movieImage')).toBeNull();
  });
});
