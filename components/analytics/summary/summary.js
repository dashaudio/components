import template from './summary.html';
import styles from './host.scss';
import polyfills from '../../common/polyfills';

export class DashAnalyticsSummary extends HTMLElement {

  get box() { return this._box || (this._box = this.shadowRoot.querySelector('#box')); }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-analytics-summary');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attachedCallback() {
    this.update();
  }

  update() {
    console.log(this.box.loading);
    this.box.loading = true;
    console.log(this.box.loading);
  }

}
