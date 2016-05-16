class DashBox extends HTMLElement {

  get template() {
    return `<style>@include('box.css')</style>@include('box.html')`;
  }

  createdCallback() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = this.template;
  }

}
