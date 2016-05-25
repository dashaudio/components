import template from './note.html';
import styles from './host.scss';

export class DashNote extends HTMLElement {

  createdCallback() {
    var shadow = this.createShadowRoot().innerHTML = `<style>${styles}</style>${template}`;
  }

}
