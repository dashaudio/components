describe('Dash Toolbar', function() {
  it('can be created', () => {
    var element = document.createElement('dash-toolbar');
    expect(element.outerHTML).to.equal('<dash-toolbar></dash-toolbar>');
    expect(element).to.be.an.instanceof(DashToolbar);
  });
});
