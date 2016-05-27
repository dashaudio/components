import template from './button.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashButton extends HTMLButtonElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-button');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

}
