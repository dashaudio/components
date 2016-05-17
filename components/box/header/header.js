import template from './header.html';
import styles from './header.scss';

export class DashBoxHeader extends HTMLElement {

  createdCallback() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = `<style>${styles}</style>${template}`;
  }

}
