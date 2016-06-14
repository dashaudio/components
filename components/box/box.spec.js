describe('Dash Box', function() {
  it('can be created', () => {
    var element = document.createElement('dash-box');
    expect(element.outerHTML).to.equal('<dash-box></dash-box>');
    expect(element).to.be.an.instanceof(DashBox);
  });
});
