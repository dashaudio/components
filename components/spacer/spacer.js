import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashSpacer extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-spacer');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>`;
  }

}
