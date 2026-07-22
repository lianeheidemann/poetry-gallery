import { createSalt, hashPassword } from "../core/crypto.js";
import { ROUTES, STORAGE_KEYS, VALIDATION } from "../core/constants.js";
import { localStore, sessionStore } from "../core/storage.js";

function normalizeUsername(username) {
  return username.trim();
}

function validateCredentials(username, password) {
  if (username.length < VALIDATION.usernameMinLength) {
    throw new Error(`O usuário deve ter pelo menos ${VALIDATION.usernameMinLength} caracteres.`);
  }

  if (password.length < VALIDATION.passwordMinLength) {
    throw new Error(`A senha deve ter pelo menos ${VALIDATION.passwordMinLength} caracteres.`);
  }
}

export async function register(usernameInput, password) {
  const username = normalizeUsername(usernameInput);
  validateCredentials(username, password);

  const salt = createSalt();
  const passwordHash = await hashPassword(password, salt);
  localStore.set(STORAGE_KEYS.user, { username, passwordHash, salt });
}

export async function login(usernameInput, password) {
  const username = normalizeUsername(usernameInput);
  const user = localStore.get(STORAGE_KEYS.user);

  if (!user || user.username !== username) {
    return false;
  }

  const passwordHash = await hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    return false;
  }

  sessionStore.set(STORAGE_KEYS.session, { username });
  return true;
}

export function getSession() {
  return sessionStore.get(STORAGE_KEYS.session);
}

export function requireSession() {
  const session = getSession();
  if (!session) {
    window.location.replace(ROUTES.login);
    return null;
  }
  return session;
}

export function logout() {
  sessionStore.remove(STORAGE_KEYS.session);
  window.location.replace(ROUTES.login);
}
