import template from './summary.html';
import styles from './host.scss';
import polyfills from '../../common/polyfills';

const ATTRIBUTE_TITLE = 'title';
const ATTRIBUTE_VALUE = 'value';

const ELEMENT_TITLE = '.dash-analytics-summary-title';
const ELEMENT_VALUE = '.dash-analytics-summary-value';

export class DashAnalyticsSummary extends HTMLElement {

  get title() {
    return this._title || (this._title = this.shadowRoot.querySelector(ELEMENT_TITLE))
  }

  get value() {
    return this._value || (this._value = this.shadowRoot.querySelector(ELEMENT_VALUE));
  }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-analytics-summary');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attachedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    this.title.textContent = this.getAttribute(ATTRIBUTE_TITLE);
    this.value.textContent = this.getAttribute(ATTRIBUTE_VALUE);
  }

}
