import template from './header.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashHeader extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-header');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

}
