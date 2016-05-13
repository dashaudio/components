class DashInput extends HTMLInputElement {

  createdCallback() {
    let root = this.createShadowRoot();
    root.innerHTML = 'This is a dash input!';
  }

  foo() {
    console.log('foo method called');
  }

}
