import template from './login.html';
import * as config from '../config';

export class DashLogin extends HTMLElement {

  get loginButton() {
    return this._loginButton || (this._loginButton = this.shadowRoot.querySelector('#login'));
  }

  get logoutButton() {
    return this._logoutButton || (this._logoutButton = this.shadowRoot.querySelector('#logout'));
  }

  createdCallback() {
    this.createShadowRoot().innerHTML = template;

    this.lock = new Auth0Lock(config.AUTH0_CLIENT, config.AUTH0_HOST);

    this.loginButton.addEventListener('click', this.login.bind(this));
    this.logoutButton.addEventListener('click', this.logout.bind(this));

  }

  login() {

    this.lock.show({
      responseType: 'token'
    }, function onLogin(err, profile, id_token) {
      if (err) {
        console.error(err.message);
        return;
      }

      localStorage.setItem(config.DASH_AUTH_STORAGE_KEY_TOKEN, id_token);
      localStorage.setItem(config.DASH_AUTH_STORAGE_KEY_USER, profile.email);

    });

  }

  logout() {
    localStorage.removeItem(config.DASH_AUTH_STORAGE_KEY_TOKEN);
    localStorage.removeItem(config.DASH_AUTH_STORAGE_KEY_USER);
    this.lock.logout({ responseType: 'token', returnTo: window.location.href, client_id: config.AUTH0_CLIENT });
  }

}
