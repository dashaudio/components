import template from './state.html';
import { DashAuthStorage } from '../storage/storage';
import { DashAuthListener } from '../listener/listener';

export class DashAuthState extends HTMLElement {

  get storage() {
    return this._storage || (this._storage = new DashAuthStorage());
  }

  get message() {
    return this._message || (this._message = this.shadowRoot.querySelector('#message'));
  }

  createdCallback() {
    this.createShadowRoot().innerHTML = template;
    this.listener = new DashAuthListener(this.stateChanged.bind(this));
  }

  stateChanged(state) {
    this.message.textContent = this.messageForState(state);
  }

  messageForState(state) {
    let service = this.nameForService(this.storage.service);
    return state ? `logged in as ${this.storage.user} via ${service}` : 'Not logged in';
  }

  nameForService(service) {
    switch(service) {
      case 'facebook':
        return 'Facebook';
        break;
      case 'twitter':
        return 'Twitter';
        break;
      case 'auth0':
        return 'email';
        break;
      default:
        return 'unknown service';
    }
  }

}
