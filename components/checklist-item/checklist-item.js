import styles from './host.scss';
import template from './checklist-item.html';
import polyfills from '../common/polyfills';

export class DashChecklistItem extends HTMLElement {
  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, this.tagName);
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
    this.setTitle(this.getAttribute('title') || '');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title' && newValue !== oldValue) {
      this.setTitle(newValue);
    }
  }

  setTitle(title) {
    this.shadowRoot.querySelector('#title').textContent = title;
  }
}
