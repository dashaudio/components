import template from './toolbar.html'
import styles from './host.scss'
import polyfills from '../common/polyfills'

export class DashToolbar extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-toolbar')
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`
  }

}

document.registerElement('dash-toolbar', { prototype: DashToolbar.prototype })
