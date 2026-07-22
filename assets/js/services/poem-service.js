import { STORAGE_KEYS } from "../core/constants.js";
import { localStore } from "../core/storage.js";

function readCollection() {
  return localStore.get(STORAGE_KEYS.poems, {});
}

function writeCollection(collection) {
  localStore.set(STORAGE_KEYS.poems, collection);
}

export function listPoems(username) {
  const collection = readCollection();
  return Array.isArray(collection[username]) ? collection[username] : [];
}

export function addPoem(username, poem) {
  const collection = readCollection();
  const userPoems = listPoems(username);
  const newPoem = {
    id: crypto.randomUUID(),
    title: poem.title.trim(),
    author: poem.author.trim(),
    text: poem.text.trim(),
    category: poem.category,
    createdAt: new Date().toISOString()
  };

  collection[username] = [newPoem, ...userPoems];
  writeCollection(collection);
  return newPoem;
}

export function deletePoem(username, poemId) {
  const collection = readCollection();
  collection[username] = listPoems(username).filter((poem) => poem.id !== poemId);
  writeCollection(collection);
}

export function filterPoems(poems, searchTerm) {
  const normalizedTerm = searchTerm.trim().toLocaleLowerCase("pt-BR");
  if (!normalizedTerm) return poems;

  return poems.filter((poem) =>
    [poem.title, poem.author, poem.text, poem.category].some((value) =>
      value.toLocaleLowerCase("pt-BR").includes(normalizedTerm)
    )
  );
}
