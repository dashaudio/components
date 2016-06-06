import template from './box.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashBox extends HTMLElement {

  set loading(value) {
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  get loading() {
    return this.getAttribute('loading') !== null;
  }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-box');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  setInternal(value) {
    console.log('set internal', this);
    this.loading = value;
  }

}
