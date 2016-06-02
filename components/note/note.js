import template from './note.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashNote extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-note');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

}
