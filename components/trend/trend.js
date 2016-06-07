import template from './trend.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashTrend extends HTMLElement {

  get value() {
    return this._value || (this._value = this.shadowRoot.querySelector('#value'));
  }

  get direction() {
    return this.getAttribute('direction');
  }

  set direction(direction) {
    if (direction === 'up') {
      this.setAttribute('direction', 'up');
    } else if (direction === 'down') {
      this.setAttribute('direction', 'down');
    } else if (direction === 'flat') {
      this.setAttribute('direction', 'flat');
    } else {
      this.removeAttribute('direction');
    }
  }

  get meaning() {
    return this.getAttribute('meaning');
  }

  set meaning(meaning) {
    if (meaning === 'positive') {
      this.setAttribute('meaning', 'positive');
    } else if (meaning === 'negative') {
      this.setAttribute('meaning', 'negative');
    } else {
      this.removeAttribute('meaning');
    }
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(label) {
    this.setAttribute('label', label);
    this.update();
  }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-trend');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attachedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    this.value.textContent = this.getAttribute('label');
  }

}
