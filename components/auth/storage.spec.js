describe('Dash Auth Storage', function() {
  it('should store its logged property', () => {
    var storage = new DashAuthStorage();
    storage.logged = true;
    expect(storage.logged).to.be.true;
  });
});
