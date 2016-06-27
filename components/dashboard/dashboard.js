import template from './dashboard.html';
import config from '../config.json';

import { Person, PersonStore, TokenStore } from 'dash-sdk';

export class DashDashboard extends HTMLElement {

  createdCallback() {
    this.user = null;
    this.token = null; // TODO: Refactor into Person model
    this.message = null;

    this.createShadowRoot();
    this.render();

    this.lock = new Auth0Lock(config.auth0.client, config.auth0.host);
    this.login();
  }

  //

  get shouldShowSoundCloudConnectInstruction() {
    return this.user && !this.user.hasSoundCloudIdentity;
  }

  get shouldShowGoogleConnectInstruction() {
    return this.user && this.user.hasSoundCloudIdentity && !this.user.hasGoogleIdentity;
  }

  get shouldShowFlowCompleteInstruction() {
    return this.user && this.user.hasSoundCloudIdentity && this.user.hasGoogleIdentity;
  }

  //

  login() {
    var options = { rememberLastLogin: false, responseType: 'token', sso: false };
    this.lock.show(options, this.loginHandler.bind(this));
  }

  loginHandler(error, profile, token) {
    if (profile && token && !error) {
      this.loginSucceeded(profile, token);
    } else {
      this.loginFailed(error);
    }
  }

  loginSucceeded(profile, token) {
    this.message = 'You are now logged in';
    this.user = new Person(profile);
    this.token = token;
    this.render();
  }

  loginFailed(error) {
    this.message = 'Login failed!';
    this.user = new Person();
    this.render();
  }

  logout() {
    this.lock.logout({
      responseType: 'token',
      returnTo: window.location.href,
      client_id: config.auth0.client
    });
  }

  //

  connectSoundCloud() {
    let options = {
      rememberLastLogin: false,
      dict: { signin: { title: 'Connect SoundCloud' } },
      connections: ['soundcloud'],
      responseType: 'token',
      sso: false
    };

    this.lock.show(options, this.connectSoundCloudHandler.bind(this));
  }

  connectSoundCloudHandler(error, profile, token) {
    if (profile && token && !error) {
      let tokenStore = new TokenStore({ token: this.token });
      let personStore = new PersonStore({ token: this.token });

      tokenStore.linkToken(token)
        .then(identities => personStore.fetchByToken())
        .then(person => this.connectSoundCloudSucceeded(person))
        .catch(error => this.connectSoundCloudFailed(error));
    } else {
      this.connectSoundCloudFailed(error);
    }
  }

  connectSoundCloudSucceeded(person) {
    this.message = 'SoundCloud connected successfully';
    this.user = person;
    this.render();
  }

  connectSoundCloudFailed(error) {
    this.message = 'Failed to connect SoundCloud!';
    this.render();
  }

  //

  connectGoogle() {
    let options = {
      rememberLastLogin: false,
      dict: { signin: { title: 'Connect Google Analytics' } },
      connections: ['google-oauth2'],
      responseType: 'token',
      sso: false
    };

    this.lock.show(options, this.connectGoogleHandler.bind(this));
  }

  connectGoogleHandler(error, profile, token) {
    if (profile && token && !error) {
      let tokenStore = new TokenStore({ token: this.token });
      let personStore = new PersonStore({ token: this.token });

      tokenStore.linkToken(token)
        .then(identities => personStore.fetchByToken())
        .then(person => this.connectSoundCloudSucceeded(person))
        .catch(error => this.connectSoundCloudFailed(error));
    } else {
      this.connectSoundCloudFailed(error);
    }
  }

  connectGoogleSucceeded(person) {
    this.message = 'Google Analytics connected successfully';
    this.user = person;
    this.render();
  }

  connectGoogleFailed(error) {
    this.message = 'Failed to connect Google Analytics!';
    this.render();
  }

  //

  render() {
    this.shadowRoot.innerHTML = Handlebars.compile(template)(this);

    let events = {
      '#logout': 'logout',
      '#connect-soundcloud': 'connectSoundCloud',
      '#connect-google': 'connectGoogle'
    };

    for (let key in events) {
      let el = this.shadowRoot.querySelector(key);
      if (el) {
        el.addEventListener('click', this[events[key]].bind(this));
      }
    }
  }
}
