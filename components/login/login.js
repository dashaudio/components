import template from './login.html';
import config from '../config.json';

export class DashLogin extends HTMLElement {

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

  }

  login() {

    this.lock.show({
      responseType: 'token'
    }, function onLogin(err, profile, id_token) {
      if (err) {
        console.error(err.message);
        localStorage.removeItem(config.keys.storage.auth.logged);
        return;
      }

      localStorage.setItem(config.keys.storage.auth.logged, true);
      localStorage.setItem(config.keys.storage.auth.token, id_token);
      localStorage.setItem(config.keys.storage.auth.user, profile.email);

    });

  }

  logout() {

    localStorage.removeItem(config.keys.storage.auth.logged);
    localStorage.removeItem(config.keys.storage.auth.token);
    localStorage.removeItem(config.keys.storage.auth.user);

    this.lock.logout({ responseType: 'token', returnTo: window.location.href, client_id: config.auth0.client });

  }

}
