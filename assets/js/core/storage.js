function read(storage, key, fallback) {
  try {
    const value = storage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error(`Não foi possível ler a chave "${key}".`, error);
    return fallback;
  }
}

function write(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Não foi possível salvar a chave "${key}".`, error);
    throw new Error("Não foi possível salvar os dados no navegador.");
  }
}

function remove(storage, key) {
  storage.removeItem(key);
}

export const localStore = Object.freeze({
  get: (key, fallback = null) => read(localStorage, key, fallback),
  set: (key, value) => write(localStorage, key, value),
  remove: (key) => remove(localStorage, key)
});

export const sessionStore = Object.freeze({
  get: (key, fallback = null) => read(sessionStorage, key, fallback),
  set: (key, value) => write(sessionStorage, key, value),
  remove: (key) => remove(sessionStorage, key)
});
