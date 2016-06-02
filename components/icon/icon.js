import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashIcon extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-icon');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>`;
  }

}
