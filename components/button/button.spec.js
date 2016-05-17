describe('Dash Button', function() {
  it('should be instantiated on a <dash-button> element', () => {

    var element = document.createElement('dash-button');
    document.body.appendChild(element);

    var button = document.querySelector('dash-button');

    expect(button).not.to.be.null;
    expect(button.foo()).to.equal('hi');

    console.log(button.foo());
    console.log(button.boxFunc());

    var box = button.shadowRoot.querySelector('dash-box');
    console.log(box);

    expect(box).not.to.be.null;
    expect(box.boxFunc()).to.equal('box func');



    var nestedButton = box.shadowRoot.querySelector('dash-button');
    console.log(nestedButton);

    expect(nestedButton).not.to.be.null;
    expect(nestedButton.foo()).to.equal('hi');


  });



});
