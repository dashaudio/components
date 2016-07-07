import template from './simple.html'
import styles from './host.scss'
import polyfills from '../../common/polyfills'

export class DashBoxSimple extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, this.tagName)
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`
  }

}

document.registerElement('dash-box-simple', { prototype: DashBoxSimple.prototype })
