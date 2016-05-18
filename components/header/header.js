import template from './header.html';
import styles from './host.scss';

export class DashHeader extends HTMLElement {

  createdCallback() {
    var shadow = this.createShadowRoot().innerHTML = `<style>${styles}</style>${template}`;
  }

}
