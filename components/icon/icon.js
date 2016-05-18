import styles from './host.scss';

export class DashIcon extends HTMLElement {

  createdCallback() {
    var shadow = this.createShadowRoot().innerHTML = `<style>${styles}</style>`;
  }

}
