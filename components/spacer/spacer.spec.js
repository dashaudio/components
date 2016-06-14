describe('Dash Spacer', function() {
  it('can be created', () => {
    var element = document.createElement('dash-spacer');
    expect(element.outerHTML).to.equal('<dash-spacer></dash-spacer>');
    expect(element).to.be.an.instanceof(DashSpacer);
  });
});
