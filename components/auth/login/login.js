import template from './login.html';
import config from '../../config.json';
import { DashAuthStorage } from '../storage/storage';
import { DashAuthListener } from '../listener/listener';

export class DashAuthLogin extends HTMLElement {

  get storage() {
    return this._storage || (this._storage = new DashAuthStorage());
  }

  get loginButton() {
    return this._loginButton || (this._loginButton = this.shadowRoot.querySelector('#login'));
  }

  get logoutButton() {
    return this._logoutButton || (this._logoutButton = this.shadowRoot.querySelector('#logout'));
  }

  createdCallback() {
    this.createShadowRoot().innerHTML = template;

    this.lock = new Auth0Lock(config.auth0.client, config.auth0.host);

    this.loginButton.addEventListener('click', this.login.bind(this));
    this.logoutButton.addEventListener('click', this.logout.bind(this));

    this.listener = new DashAuthListener(this.stateChanged.bind(this));
  }

  login() {

    this.lock.show({
      responseType: 'token',
      sso: false
    }, function onLogin(err, profile, id_token) {
      if (err) {
        console.error(err.message);
        this.storage.logged = false;
        return;
      }

      this.storage.logged = true;
      this.storage.token = id_token;
      this.storage.user = profile.name || profile.email;

    }.bind(this));

  }

  logout() {

    this.storage.logged = false;
    this.storage.token = null;
    this.storage.user = null;

    this.lock.logout({
      responseType: 'token',
      returnTo: window.location.href,
      client_id: config.auth0.client
    });

  }

  stateChanged(state) {
    if (state) {
      this.loginButton.style.display = 'none';
      this.logoutButton.style.display = 'inline-block';
    } else {
      this.loginButton.style.display = 'inline-block';
      this.logoutButton.style.display = 'none';
    }
  }

}
