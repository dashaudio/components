class DashButton extends HTMLElement {

  createdCallback() {
    console.log('created!');
    var shadow = this.createShadowRoot();
    // shadow.innerHTML = '<a href="#">Link</a>';
    shadow.innerHTML = 'the button <content select="dash-icon"></content>';
  }

  bar() {
    console.log('bar() called on dash-button');
  }

}
