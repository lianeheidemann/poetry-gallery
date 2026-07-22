(function initializeStorage(global) {
  "use strict";

  const KEYS = {
    username: "username",
    password: "password",
    poems: "poems"
  };

  global.AppStorage = Object.freeze({
    saveCredentials(username, password) {
      localStorage.setItem(KEYS.username, username);
      localStorage.setItem(KEYS.password, password);
    },

    getCredentials() {
      return {
        username: localStorage.getItem(KEYS.username),
        password: localStorage.getItem(KEYS.password)
      };
    },

    getPoems() {
      try {
        return JSON.parse(localStorage.getItem(KEYS.poems)) || [];
      } catch {
        return [];
      }
    },

    savePoems(poems) {
      localStorage.setItem(KEYS.poems, JSON.stringify(poems));
    }
  });
})(window);
