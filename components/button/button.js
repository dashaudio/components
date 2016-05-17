import template from './button.html';
import styles from './button.scss';

export class DashButton extends HTMLElement {

  get template() {
    return `<style>${styles}</style>${template}`;
  }

  createdCallback() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = this.template;
    console.log('button created');
  }

  foo() {
    return "hi";
  }

}
