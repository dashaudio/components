// TODO: Deprecated
// import config from '../config.json';
// import { DashAuthStorage } from './storage';
//
// // TODO: Don't poll for login state, do something cleverer :)
//
// export class DashAuth {
//
//   get storage() { return this._storage || (this._storage = new DashAuthStorage()); }
//
//   constructor() {
//     this.update();
//   }
//
//   update() {
//     this.state = this.storage.logged;
//
//     if (this.state !== this.previousState) {
//       this.previousState = this.state;
//       this.fireUpdateEvent();
//     }
//
//     window.setTimeout(this.update.bind(this), 1000);
//   }
//
//   fireUpdateEvent() {
//     let event = new CustomEvent('change', { logged: this.state });
//     this.dispatchEvent(event);
//     console.log('auth state changed: ', this.state);
//   }
//
// }
