import template from './auth.html';

export class DashAuth extends HTMLElement {

  get token() {
    return localStorage.getItem('dash-auth-token');
  }

  get stateElement() {
    return this._stateElement || (this._stateElement = this.shadowRoot.querySelector('#state'));
  }

  createdCallback() {
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
      this.stateElement.textContent = 'logged in';
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
