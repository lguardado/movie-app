describe('Search screen', () => {
  it('should show the search screen after tap in the search tab', async () => {
    await element(by.id('test-Search')).atIndex(0).tap();
    await expect(element(by.id('search-view'))).toBeVisible();
  });

  it('should show a movies list when entering a search term', async () => {
    await element(by.id('text-input')).atIndex(0).replaceText('wolverine');
    await expect(element(by.id('movies-search-results'))).toBeVisible();
    await expect(element(by.id('results-item')).atIndex(0)).toBeVisible();
  });
  it('should show a not found message when there are no matching movies.', async () => {
    await element(by.id('text-input')).atIndex(0).clearText();
    await element(by.id('text-input'))
      .atIndex(0)
      .replaceText('notexistingmovie');
    await expect(element(by.id('movies-search-results'))).not.toBeVisible();
    await expect(element(by.id('results-item')).atIndex(0)).not.toBeVisible();
    await expect(element(by.id('no-movies-found'))).toBeVisible();
  });
});
