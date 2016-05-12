var button = Object.create(HTMLElement.prototype);

button.createdCallback = function() {
  // Adding a Shadow DOM
  var root = this.createShadowRoot();
  // Adding a template
  // var template = document.querySelector('#template');
  // var clone = document.importNode(template.content, true);
  // root.appendChild(clone);
  root.innerHTML = templates['dash-button'];
}

document.registerElement('dash-button', { prototype: button });
