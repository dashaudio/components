describe('Dash Auth State', function() {
  it('can be created', () => {
    var element = document.createElement('dash-auth-state');
    expect(element.outerHTML).to.equal('<dash-auth-state></dash-auth-state>');
  });
});
