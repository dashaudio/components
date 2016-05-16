class DashButton extends HTMLElement {

  get template() {
    return `<style>@include("button.css")</style>@include("button.html")`;
  }

  createdCallback() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = this.template;
  }

  foo() {
    return "hi";
  }

}

document.registerElement('dash-button', { prototype: DashButton.prototype });
