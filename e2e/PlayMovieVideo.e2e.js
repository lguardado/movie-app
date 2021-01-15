const { by, expect, element } = require('detox');

describe('Play movie video', () => {
  it('should play a video when clicking the play button', async () => {
    await element(by.id('test-Search')).atIndex(0).tap();
    const el = element(by.id('text-input')).atIndex(0);
    await el.replaceText('avatar');
    await el.tapReturnKey();
    await element(by.id('results-item')).atIndex(0).tap();
    const playButton = element(by.id('play-button')).atIndex(0);
    await playButton.tap();
    await expect(element(by.id('webView'))).toBeVisible();
  });
});
