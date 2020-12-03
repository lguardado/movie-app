import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import MyListButton from 'components/MyListButton';
import strings from 'localization';

describe('MyListButton', () => {
  afterEach(cleanup);

  test('shows favourite text and handle pressing correctly', async () => {
    const isFav = false;
    const handlePress = jest.fn();
    const { getByText, getByTestId, queryByText } = render(
      <MyListButton isFavourite={isFav} handleFavouritePress={handlePress} />
    );
    expect(getByText(strings.myList).props).toBeTruthy();
    expect(queryByText(strings.removeFromMyList)).toBeNull();
    const button = getByTestId('pressable');
    fireEvent.press(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  test("shows favourite text correctly when it's not favourite", async () => {
    const isFav = true;
    const handlePress = jest.fn();
    const { getByText, queryByText } = render(
      <MyListButton isFavourite={isFav} handleFavouritePress={handlePress} />
    );
    expect(queryByText(strings.myList)).toBeNull();
    expect(getByText(strings.removeFromMyList).props).toBeTruthy();
  });
});
