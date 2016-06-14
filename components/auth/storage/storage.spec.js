describe('Dash Auth Storage', function() {
  it('should store its "logged" property', () => {
    var storage = new DashAuthStorage();
    storage.logged = true;
    expect(storage.logged).to.be.true;
  });

  it('should store its "token" property', () => {
    var storage = new DashAuthStorage();
    storage.token = '12345';
    expect(storage.token).to.equal('12345');
  });

  it('should store its "user" property', () => {
    var storage = new DashAuthStorage();
    var user = 'user@domain.com';
    storage.user = user;
    expect(storage.user).to.equal(user);
  });
});
