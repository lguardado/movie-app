describe.skip('Configuration screen', () => {
  it('should show the configuration screen after tap in the config tab', async () => {
    await element(by.id('test-Configuration')).atIndex(0).tap();
    await expect(element(by.id('configuration-view'))).toBeVisible();
  });
});
