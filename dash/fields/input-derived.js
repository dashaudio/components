class DashInputDerived extends DashInput {

  createdCallback() {
    let root = this.createShadowRoot();
    root.innerHTML = 'This is a derived dash input!';
  }

}
