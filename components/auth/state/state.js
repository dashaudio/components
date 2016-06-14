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
    return state ? `logged in as ${this.storage.user}` : 'Not logged in';
  }

}
