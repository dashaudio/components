// import template from './soundcloud.html';
// import config from '../../../config.json';
// import { DashAuthStorage } from '../../storage/storage';
// import { DashAuthListener } from '../../listener/listener';
// import { PersonStore, TokenStore } from 'dash-sdk';
//
// export class DashAuthLoginSoundCloud extends HTMLElement {
//
//   get storage() {
//     return this._storage || (this._storage = new DashAuthStorage());
//   }
//
//   get connectButton() {
//     return this._connectButton || (this._connectButton = this.shadowRoot.querySelector('#connect'));
//   }
//
//   get messageLabel() {
//     return this._messageLabel || (this._messageLabel = this.shadowRoot.querySelector('#message'));
//   }
//
//   createdCallback() {
//     this.createShadowRoot().innerHTML = template;
//
//     this.lock = new Auth0Lock(config.auth0.client, config.auth0.host);
//
//     this.connectButton.addEventListener('click', this.connect.bind(this));
//
//     this.updateMessage();
//   }
//
//   attributeChangedCallback(name, oldValue, newValue) {
//     if (name === '') {
//
//     }
//   }
//
//   connect() {
//     let options = {
//       rememberLastLogin: false,
//       dict: {
//         signin: {
//           title: 'Connect SoundCloud'
//         }
//       },
//       connections: ['soundcloud'],
//       responseType: 'token',
//       sso: false
//     };
//
//     this.lock.show(options, function onLogin(err, profile, token) {
//       if (err) {
//         console.error(err.message);
//         return;
//       }
//
//       let store = new TokenStore({ token: this.storage.token });
//       store.linkToken(token).then((result) => {
//         this.updateMessage();
//       }).catch((error) => {
//         this.updateMessage();
//       });
//
//     }.bind(this));
//
//   }
//
//   updateMessage() {
//     if (!this.storage.token) return;
//
//     let store = new PersonStore({ token: this.storage.token });
//
//     store.fetchByToken().then((person) => {
//       if (person.hasSoundCloudIdentity) {
//         this.messageLabel.textContent = 'SoundCloud account is connected';
//       } else {
//         this.messageLabel.textContent = 'SoundCloud account is not connected';
//       }
//     }).catch((error) => {
//       this.messageLabel.textContent = 'Unable to fetch SoundCloud connection status!';
//     });
//   }
//
//   stateChanged(state) {
//     // if (state) {
//     //   this.loginButton.style.display = 'none';
//     //   this.logoutButton.style.display = 'inline-block';
//     // } else {
//     //   this.loginButton.style.display = 'inline-block';
//     //   this.logoutButton.style.display = 'none';
//     // }
//   }
//
// }
