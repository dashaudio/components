import template from './wrapper.html';
import styles from './host.scss';

export class DashWrapper extends HTMLElement {

  createdCallback() {
    var shadow = this.createShadowRoot().innerHTML = `<style>${styles}</style>${template}`;
  }

}
