import template from './label.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashLabel extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-label');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

}
