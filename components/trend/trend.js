import template from './trend.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

const ATTRIBUTE_VALUE = 'value';
const ELEMENT_VALUE = '.dash-trend-value';

export class DashTrend extends HTMLElement {

  get value() {
    return this._value || (this._value = this.shadowRoot.querySelector(ELEMENT_VALUE));
  }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-trend');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attachedCallback() {
    this.update();
  }

  update() {
    this.value.textContent = this.getAttribute(ATTRIBUTE_VALUE);
  }

}
