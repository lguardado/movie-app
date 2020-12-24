import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Play from 'components/Play';

const mockFunction = jest.fn();

describe('<Play /> button', () => {
  it('should match the inline snapshot', async () => {
    const { findByTestId } = render(<Play onPress={mockFunction} />);
    const playButton = await findByTestId('play-button');
    expect(playButton.props.children).toMatchInlineSnapshot(`
      Array [
        <Image
          source={
            Object {
              "testUri": "../../../src/assets/ic_play/ic_play.png",
            }
          }
        />,
        <PressabilityDebugView
          color="red"
        />,
      ]
    `);
  });

  it("should call the button's function when the play button is pressed", async () => {
    const { findByTestId } = render(<Play onPress={mockFunction} />);
    const playButton = await findByTestId('play-button');
    fireEvent.press(playButton);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
