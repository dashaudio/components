import template from './box.html';
import styles from './box.scss';

export class DashBox extends HTMLElement {

  createdCallback() {
    this.createShadowRoot().innerHTML = `<style>${styles}</style>${template}`;
  }

}
