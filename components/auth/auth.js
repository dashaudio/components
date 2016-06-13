import template from './auth.html';
import config from '../config.json';

// TODO: Don't poll for login state, do something cleverer :)

export class DashAuth extends HTMLElement {

  state = 4;
  static other = 54;

  get logged() { return localStorage.getItem(config.keys.storage.auth.logged); }
  get token() { return localStorage.getItem(config.keys.storage.auth.token); }
  get user() { return localStorage.getItem(config.keys.storage.auth.user); }

  get stateElement() {
    return this._stateElement || (this._stateElement = this.shadowRoot.querySelector('#state'));
  }

  createdCallback() {
    let x = new DashAuthStorage();
    x.foo();
    this.createShadowRoot().innerHTML = template;
  }

  attachedCallback() {
    // start tracking here...
    this.update();
    this.fireUpdateEvent();
  }

  detachedCallback() {
    // suspend tracking here...
  }

  update() {
    this.state = (this.token != null);

    if (this.state !== this.previousState) {
      this.previousState = this.state;
      this.fireUpdateEvent();
    }

    if (this.token) {
      this.stateElement.textContent = `logged in [${this.user}]`;
      this.stateElement.style.color = 'white';
      this.stateElement.style.backgroundColor = 'green';
    } else {
      this.stateElement.textContent = 'logged out';
      this.stateElement.style.color = 'white';
      this.stateElement.style.backgroundColor = 'gray';
    }

    window.setTimeout(this.update.bind(this), 1000);
  }

  fireUpdateEvent() {
    let event = new CustomEvent('change', { logged: this.state });
    this.dispatchEvent(event);
  }

}

class DashAuthStorage {
  foo() {
    console.log('123');
  }
}
