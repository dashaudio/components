describe('Dash Sparkline', function() {
  it('can be created', () => {
    var element = document.createElement('dash-sparkline');
    expect(element.outerHTML).to.equal('<dash-sparkline></dash-sparkline>');
    expect(element).to.be.an.instanceof(DashSparkline);
  });
});
