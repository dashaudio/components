describe('Dash Note', function() {
  it('can be created', () => {
    var element = document.createElement('dash-note');
    expect(element.outerHTML).to.equal('<dash-note></dash-note>');
    expect(element).to.be.an.instanceof(DashNote);
  });
});
