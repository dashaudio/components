// import template from './soundcloud.html';
// import { DashAuthStorage } from '../../storage/storage';
// import { DashAuthListener } from '../../listener/listener';
//
// export class DashAuthStateSoundCloud extends HTMLElement {
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
//     this.message.textContent = this.messageForState((person && person.hasSoundCloudIdentity));
//   }
//
//   messageForState(state) {
//     switch (state) {
//       case true: return 'SoundCloud is connected'; break;
//       case false: return 'SoundCloud is not connected'; break;
//       case null: return 'Login to connect SoundCloud';
//     }
//   }
//
// }
