import template from './login.html';

const AUTH0_HOST = 'dash.eu.auth0.com';
const AUTH0_CLIENT = 'HzXlNs8cuC1NO6uPxpOkc6MpsjOQx7MD';

export class DashLogin extends HTMLElement {

  get loginButton() {
    return this._loginButton || (this._loginButton = this.shadowRoot.querySelector('#login'));
  }

  get logoutButton() {
    return this._logoutButton || (this._logoutButton = this.shadowRoot.querySelector('#logout'));
  }

  get auth() {
    return this._auth || (this._auth = this.shadowRoot.querySelector('#auth'));
  }

  createdCallback() {
    this.createShadowRoot().innerHTML = template;

    this.lock = new Auth0Lock(AUTH0_CLIENT, AUTH0_HOST);

    this.loginButton.addEventListener('click', this.login.bind(this));
    this.logoutButton.addEventListener('click', this.logout.bind(this));
    this.auth.addEventListener('change', this.change.bind(this));

  }

  login() {

    this.lock.show({
      responseType: 'token'
    }, function onLogin(err, profile, id_token) {
      if (err) {
        console.error(err.message);
        return;
      }
      // console.log('logged in!', profile, id_token);

      localStorage.setItem('dash-auth-token', id_token);

    });

  }

  logout() {
    localStorage.removeItem('dash-auth-token');
    this.lock.logout({ responseType: 'token', returnTo: window.location.href, client_id: AUTH0_CLIENT });
  }

  change(logged) {
    if (logged) {
      this.loginButton.style.display = 'none';
      this.logoutButton.style.display = 'inline-block';
    } else {
      this.loginButton.style.display = 'inline-block';
      this.logoutButton.style.display = 'none';
    }
  }

}
