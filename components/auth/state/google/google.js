// import template from './google.html';
// import { DashAuthStorage } from '../../storage/storage';
// import { DashAuthListener } from '../../listener/listener';
//
// export class DashAuthStateGoogle extends HTMLElement {
//
//   get storage() {
//     return this._storage || (this._storage = new DashAuthStorage());
//   }
//
//   get message() {
//     return this._message || (this._message = this.shadowRoot.querySelector('#message'));
//   }
//
//   createdCallback() {
//     this.createShadowRoot().innerHTML = template;
//     this.listener = new DashAuthListener(this.stateChanged.bind(this));
//   }
//
//   stateChanged(person) {
//     this.message.textContent = this.messageForState((person && person.hasGoogleIdentity));
//   }
//
//   messageForState(state) {
//     switch (state) {
//       case true: return 'Google is connected'; break;
//       case false: return 'Google is not connected'; break;
//       case null: return 'Login to connect Google';
//     }
//   }
//
// }
