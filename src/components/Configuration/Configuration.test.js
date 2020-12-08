import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react-native';
import Configuration from 'components/Configuration';
import { renderWithProviders } from 'test-utils/render';
import strings from 'localization';

describe('MoviesListItem', () => {
  afterEach(cleanup);

  const fakeStore = {
    error: {},
    status: {},
    movies: {
      data: [
        { id: 1, poster_path: 'path' },
        { id: 2, poster_path: 'another_path' },
      ],
      favourites: [2],
      dataExpirationDays: 3,
    },
  };

  test('renders the <Configuration /> correctly', async () => {
    const {
      getByText,
      queryByText,
      getByPlaceholderText,
    } = renderWithProviders(<Configuration />, {
      initialState: fakeStore,
    });
    expect(getByText(strings.dataExpirationDescription)).toBeTruthy();
    expect(getByText(strings.setDataExpirationDays)).toBeTruthy();
    expect(queryByText(strings.changesSaved)).toBeNull();
    expect(getByPlaceholderText(strings.days)).toBeTruthy();

    const expirationText = getByText(
      /Current expiration days/
    ).props.children.join('');
    expect(expirationText).toContain(strings.currentExpirationDays);
    expect(expirationText).toContain(fakeStore.movies.dataExpirationDays);
  });

  test('changes the expiration days correctly', async () => {
    const newExpirationDays = 5;
    const {
      getByPlaceholderText,
      getByText,
      queryByText,
    } = renderWithProviders(<Configuration />, {
      initialState: fakeStore,
    });

    const daysInput = getByPlaceholderText(strings.days);
    const button = getByText(strings.save);

    // - There is no success text on the screen,
    expect(queryByText(strings.changesSaved)).toBeNull();

    // Fire changing expiration days
    await fireEvent.changeText(daysInput, newExpirationDays);
    await fireEvent.press(button);

    const expirationText = getByText(
      /Current expiration days/
    ).props.children.join('');

    // The success message is on the screen and the expiration days are changed.
    expect(queryByText(strings.changesSaved)).toBeTruthy();
    expect(expirationText).toContain(strings.currentExpirationDays);
    expect(expirationText).not.toContain(fakeStore.movies.dataExpirationDays);
    expect(expirationText).toContain(newExpirationDays);
  });
});
