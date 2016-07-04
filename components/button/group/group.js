import template from './group.html';
import styles from './host.scss';
import polyfills from '../../common/polyfills';

export class DashButtonGroup extends HTMLButtonElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-button-group');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

}

document.registerElement('dash-button-group', { prototype: DashButtonGroup.prototype })
