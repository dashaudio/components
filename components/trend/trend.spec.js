describe('Dash Trend', function() {
  it('can be created', () => {
    var element = document.createElement('dash-trend');
    expect(element.outerHTML).to.equal('<dash-trend></dash-trend>');
    expect(element).to.be.an.instanceof(DashTrend);
  });
});
