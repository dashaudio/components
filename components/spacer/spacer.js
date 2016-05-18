import styles from './host.scss';

export class DashSpacer extends HTMLElement {

  createdCallback() {
    var shadow = this.createShadowRoot().innerHTML = `<style>${styles}</style>`;
  }

}
