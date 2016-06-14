import config from '../config.json';

export class DashAuthStorage {

    get logged() {
      return !! window.localStorage.getItem(config.keys.storage.auth.logged);
    }

    set logged(logged) {
      if (logged) {
        window.localStorage.setItem(config.keys.storage.auth.logged, true);
      } else {
        window.localStorage.removeItem(config.keys.storage.auth.logged);
      }
    }

    get token() {
      return window.localStorage.getItem(config.keys.storage.auth.token);
    }

    set token(token) {
      if (token) {
        window.localStorage.setItem(config.keys.storage.auth.token, token);
      } else {
        window.localStorage.removeItem(config.keys.storage.auth.token);
      }
    }

    get user() {
      return window.localStorage.getItem(config.keys.storage.auth.user);
    }

    set user(user) {
      if (user) {
        window.localStorage.setItem(config.keys.storage.auth.user, user);
      } else {
        window.localStorage.removeItem(config.keys.storage.auth.user);
      }
    }

}
