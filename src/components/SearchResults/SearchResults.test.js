import React from 'react';
import { cleanup } from '@testing-library/react-native';
import SearchResults from 'components/SearchResults';
import { renderWithProviders } from 'test-utils/render';
import strings from 'localization';

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

describe('Search', () => {
  afterEach(cleanup);

  test('renders <Search /> without crashing', () => {
    renderWithProviders(<SearchResults />);
  });

  test('it renders a movies list with the movies passed to it', () => {
    const { queryByTestId, queryByText } = renderWithProviders(
      <SearchResults movies={mockMovies} />
    );
    const el = queryByTestId('movies-search-results');
    expect(el.props.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": 1,
          "original_title": "original title",
          "poster_path": "path",
          "title": "title",
        },
        Object {
          "id": 2,
          "original_title": "original title",
          "poster_path": "another_path",
          "title": "title",
        },
      ]
    `);
    expect(queryByText(strings.noMoviesFound)).toBeNull();
  });
  test('it shows the right message when there are no movies', () => {
    const { queryByTestId, queryByText } = renderWithProviders(
      <SearchResults />
    );
    expect(queryByTestId('movies-search-results')).toBeNull();
    expect(queryByText(strings.noMoviesFound)).toBeTruthy();
  });
});
