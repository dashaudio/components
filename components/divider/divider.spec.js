describe('Dash Divider', function() {
  it('can be created', () => {
    var element = document.createElement('dash-divider');
    expect(element.outerHTML).to.equal('<dash-divider></dash-divider>');
    expect(element).to.be.an.instanceof(DashDivider);
  });
});
