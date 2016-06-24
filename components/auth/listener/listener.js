import { DashAuthStorage } from '../storage/storage';
import { PersonStore } from 'dash-sdk';

// TODO In time, this should all be moved out to the SDK

const TIMEOUT = 1000; // TODO: Don't poll for state; get some events going!

export class DashAuthListener {

  get storage() {
    return this._storage || (this._storage = new DashAuthStorage());
  }

  constructor(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function argument is required');
    }
    this.callback = callback;
    this.checkState();
  }

  checkState() {
    this.logged = this.storage.logged;

    if (this.logged != this.wasLogged) {
      this.wasLogged = this.logged;

      this.stateChanged(null);

      if (this.storage.token) {
        let store = new PersonStore({ token: this.storage.token });
        store.fetchByToken().then(person => {
          this.stateChanged(person);
        });
      }
    }

    window.setTimeout(this.checkState.bind(this), TIMEOUT);
  }

  stateChanged(person) {
    this.callback(person);
  }

}
