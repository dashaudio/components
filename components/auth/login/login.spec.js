describe('Dash Auth Login', function() {
  it('can be created', () => {
    var element = document.createElement('dash-auth-login');
    expect(element.outerHTML).to.equal('<dash-auth-login></dash-auth-login>');
    expect(element).to.be.an.instanceof(DashAuthLogin);
  });
});
