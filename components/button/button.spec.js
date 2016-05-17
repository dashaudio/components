describe('Dash Button', function() {
  it('should be instantiated on a <dash-button> element', () => {

    var element = document.createElement('dash-button');
    document.body.appendChild(element);

    var button = document.querySelector('dash-button');

    expect(button).not.to.be.null;
    expect(button.foo()).to.equal('hi');

    console.log(button.foo());

  });
});
