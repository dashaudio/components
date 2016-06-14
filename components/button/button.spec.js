describe('Dash Button', function() {
  it('can be created', () => {
    var element = document.createElement('dash-button');
    expect(element.outerHTML).to.equal('<dash-button></dash-button>');
    expect(element).to.be.an.instanceof(DashButton);
  });
});
