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

      localStorage.setItem(config.AUTH_LOCAL_STORAGE_KEY, id_token);

    });

  }

  logout() {
    localStorage.removeItem('dash-auth-token');
    this.lock.logout({ responseType: 'token', returnTo: window.location.href, client_id: config.AUTH0_CLIENT });
  }

  // change(logged) {
  //   if (logged) {
  //     this.loginButton.style.display = 'none';
  //     this.logoutButton.style.display = 'inline-block';
  //   } else {
  //     this.loginButton.style.display = 'inline-block';
  //     this.logoutButton.style.display = 'none';
  //   }
  // }

}
