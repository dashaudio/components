import template from './sparkline.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

const ATTRIBUTE_DATA = 'data';
const ATTRIBUTE_INVALID = 'invalid';

const ELEMENT_PATH = '.dash-sparkline-path';

export class DashSparkline extends HTMLElement {

  get path() {
    return this._path || (this._path = this.shadowRoot.querySelector(ELEMENT_PATH));
  }

  // Lifecycle

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-sparkline');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attachedCallback() {
    this.update(this.getAttribute(ATTRIBUTE_DATA));
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute === ATTRIBUTE_DATA) { this.update(newValue); }
  }

  // Rendering

  update(data) {
    this.render(this.validate(data));
  }

  validate(data) {

    if (!data) {
      this.updateValidity(true);
      return null;
    }

    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch (error) {
        console.warn(`dash-sparkline: invalid data parameter (${error})`);
        this.updateValidity(false);
        return null;
      }
    }

    if (data instanceof Array === false) {
      console.warn(`dash-sparkline: data parameter must be an array, was ${result}`);
      this.updateValidity(false);
      return null;
    }

    for (let value in data) {
      if (typeof data[value] !== 'number') {
        console.warn(`dash-sparkline: data parameter must only contain numbers, found ${value}`);
        this.updateValidity(false);
        return null;
      }
    }

    this.updateValidity(true);
    return data;

  }

  render(data) {
    this.path.setAttribute('d', this.pathAttributeForData(data));
  }

  // Helpers

  pathAttributeForData(data) {
    return data ? `M0,${data[0]}` + data.map((v, i) => `L${i / (data.length - 1)},${v}`).join('') : '';
  }

  updateValidity(validity) {
    if (this.validity !== validity) {
      if (validity) {
        this.removeAttribute(ATTRIBUTE_INVALID);
      } else {
        this.setAttribute(ATTRIBUTE_INVALID, '');
      }
      this.validity = validity;
    }
  }

}
