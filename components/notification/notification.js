import template from './notification.html'
import styles from './host.scss'
import polyfills from '../common/polyfills'

export class DashNotification extends HTMLElement {

  get title() {
    return this.getAttribute('title')
  }

  set title(title) {
    if (title) {
      this.setAttribute('title', title)
    } else {
      this.removeAttribute('title')
    }
  }

  get dismissed() {
    return this.getAttribute('dismissed')
  }

  set dismissed(dismissed) {
    if (dismissed) {
      this.setAttribute('dismissed', '')
    } else {
      this.removeAttribute('dismissed')
    }
  }

  get timeout() {
    return this.getAttribute('timeout')
  }

  set timeout(timeout) {
    if (timeout) {
      this.setAttribute('timeout', Number(timeout))
    } else {
      this.removeAttribute('timeout')
    }
  }

  get titleElement() { return this._title || (this._title = this.shadowRoot.querySelector('#title')) }
  get dismissElement() { return this._dismiss || (this._dismiss = this.shadowRoot.querySelector('#dismiss')) }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, this.tagName)
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`
  }

  attachedCallback() {
    this.update(this.getAttribute('title'))
    this.dismissElement.addEventListener('click', this.dismiss.bind(this))

    let timeout = this.getAttribute('timeout')
    if (timeout) window.setTimeout(this.dismiss.bind(this), timeout * 1000)
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute === 'title') { this.update(newValue) }
  }

  update(title) {
    this.titleElement.textContent = title
    this.dismissed = false
  }

  dismiss() {
    this.dismissed = true
  }

}

document.registerElement('dash-notification', { prototype: DashNotification.prototype })
