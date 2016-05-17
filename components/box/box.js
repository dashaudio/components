import template from './box.html';
import styles from './box.scss';

export class DashBox extends HTMLElement {

  get template() {
    return `<style>${styles}</style>${template}`;
  }

  createdCallback() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = this.template;
  }

  boxFunc() {
    return 'box func';
  }

}
