import template from './label.html';
import styles from './host.scss';

export class DashLabel extends HTMLElement {

  createdCallback() {
    var shadow = this.createShadowRoot().innerHTML = `<style>${styles}</style>${template}`;
  }

}
