import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashDivider extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-divider');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>`;
  }

}
