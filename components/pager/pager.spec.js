describe('Dash Pager', function() {
  it('can be created', () => {
    var element = document.createElement('dash-pager');
    expect(element.outerHTML).to.equal('<dash-pager></dash-pager>');
    expect(element).to.be.an.instanceof(DashPager);
  });
});
