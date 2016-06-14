describe('Dash Wrapper', function() {
  it('can be created', () => {
    var element = document.createElement('dash-wrapper');
    expect(element.outerHTML).to.equal('<dash-wrapper></dash-wrapper>');
    expect(element).to.be.an.instanceof(DashWrapper);
  });
});
