import template from './notification.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashNotification extends HTMLElement {

  get title() {
    return this.getAttribute('title');
  }

  set title(title) {
    if (title) {
      this.setAttribute('title', title);
    } else {
      this.removeAttribute('title');
    }
  }

  get dismissed() {
    return this.getAttribute('dismissed');
  }

  set dismissed(dismissed) {
    if (dismissed) {
      this.setAttribute('dismissed', '');
    } else {
      this.removeAttribute('dismissed');
    }
  }

  get titleElement() { return this._title || (this._title = this.shadowRoot.querySelector('#title')); }
  get dismissElement() { return this._dismiss || (this._dismiss = this.shadowRoot.querySelector('#dismiss')); }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, this.tagName);
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attachedCallback() {
    this.update(this.getAttribute('title'));
    this.dismissElement.addEventListener('click', this.dismiss.bind(this));
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute === 'title') { this.update(newValue); }
  }

  update(title) {
    this.titleElement.textContent = title;
  }

  dismiss() {
    this.dismissed = true;
  }

}
