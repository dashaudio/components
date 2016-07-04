import template from './wrapper.html'
import styles from './host.scss'
import polyfills from '../common/polyfills'

export class DashWrapper extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-wrapper')
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`
  }

}

document.registerElement('dash-wrapper', { prototype: DashWrapper.prototype })
