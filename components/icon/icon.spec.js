describe('Dash Icon', function() {
  it('can be created', () => {
    var element = document.createElement('dash-icon');
    expect(element.outerHTML).to.equal('<dash-icon></dash-icon>');
    expect(element).to.be.an.instanceof(DashIcon);
  });
});
