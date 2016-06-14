describe('Dash Notification', function() {
  it('can be created', () => {
    var element = document.createElement('dash-notification');
    expect(element.outerHTML).to.equal('<dash-notification></dash-notification>');
    expect(element).to.be.an.instanceof(DashNotification);
  });
});
