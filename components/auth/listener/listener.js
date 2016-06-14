import { DashAuthStorage } from '../storage/storage';

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
      this.stateChanged(this.logged);
    }

    window.setTimeout(this.checkState.bind(this), TIMEOUT);
  }

  stateChanged(state) {
    this.callback(state);
  }

}
