import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react-native';
import Search from 'components/Search';
import { renderWithProviders } from 'test-utils/render';
import strings from 'localization';
import { searchMovie } from 'controllers/MoviesClient';

const mockMovies = [
  {
    id: 1,
    poster_path: 'path',
    title: 'title',
    original_title: 'original title',
  },
  {
    id: 2,
    poster_path: 'another_path',
    title: 'title',
    original_title: 'original title',
  },
];

jest.mock('controllers/MoviesClient', () => ({
  searchMovie: jest.fn(term => {
    return Promise.resolve(mockMovies);
  }),
}));

describe('Search', () => {
  afterEach(cleanup);

  test('renders <Search /> without crashing', () => {
    renderWithProviders(<Search />);
  });

  test('it shows a search icon and an input', async () => {
    const { getByPlaceholderText, toJSON } = renderWithProviders(<Search />);
    const el = getByPlaceholderText(strings.searchPlaceholder);

    expect(el.props).toMatchInlineSnapshot(`
      Object {
        "allowFontScaling": true,
        "autoFocus": true,
        "clearButtonMode": "while-editing",
        "onChangeText": [Function],
        "placeholder": "Search for a movie that you love...",
        "rejectResponderTermination": true,
        "style": Array [
          Object {
            "color": "rgb(28, 28, 30)",
          },
          Object {
            "fontSize": 15,
            "fontWeight": "normal",
          },
          Object {
            "alignSelf": "stretch",
          },
          Object {
            "borderColor": undefined,
            "borderWidth": 1,
            "color": "rgb(28, 28, 30)",
            "fontSize": 20,
            "marginHorizontal": 20,
            "minWidth": "90%",
            "padding": 10,
          },
        ],
        "testID": "text-input",
        "underlineColorAndroid": "transparent",
      }
    `);
    fireEvent.changeText(el, 'wolverine');
    waitFor(() => expect(searchMovie).toHaveBeenCalledTimes(1));
    waitFor(() => expect(searchMovie).toHaveBeenCalledWith('wolverine'));
  });
});
