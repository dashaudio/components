import template from './box.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashBox extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-box');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

}
