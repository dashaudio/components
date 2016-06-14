describe('Dash Label', function() {
  it('can be created', () => {
    var element = document.createElement('dash-label');
    expect(element.outerHTML).to.equal('<dash-label></dash-label>');
    expect(element).to.be.an.instanceof(DashLabel);
  });
});
