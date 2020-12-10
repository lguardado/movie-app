describe('Home screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have an image', async () => {
    await expect(element(by.id('movie-image')).atIndex(0)).toBeVisible();
  });

  it('should have a movies list', async () => {
    await expect(element(by.id('movies-list')).atIndex(0)).toBeVisible();
  });

  it('should show the movies details screen after tap', async () => {
    await element(by.id('movies-list')).atIndex(0).tap();
    await expect(element(by.id('detail-scroll-view'))).toBeVisible();
    await expect(element(by.id('image-background'))).toBeVisible();
    await expect(element(by.id('movie-info'))).toBeVisible();
  });

  it('should show the configuration screen after tap', async () => {
    await element(by.id('test-Configuration')).atIndex(0).tap();
    await expect(element(by.id('configuration-view'))).toBeVisible();
  });
});