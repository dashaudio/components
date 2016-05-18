import template from './box.html';
import styles from './host.scss';

export class DashBox extends HTMLElement {

  createdCallback() {
    this.createShadowRoot().innerHTML = `<style>${styles}</style>${template}`;
  }

}
