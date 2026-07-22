import { ROUTES } from "../core/constants.js";
import { getSession, logout } from "../services/auth-service.js";
import { addPoem, deletePoem, listPoems } from "../services/poem-service.js";

const form = document.querySelector("#poem-form");
const list = document.querySelector("#poem-list");
const searchInput = document.querySelector("#search-input");
const emptyMessage = document.querySelector("#empty-message");
const feedback = document.querySelector("#gallery-feedback");
const usernameElement = document.querySelector("#current-username");
const logoutButton = document.querySelector("#logout-button");

let searchTimer;

function createPoemCard(poem) {
  const card = document.createElement("article");
  card.className = "poem-card";

  const content = document.createElement("div");
  const title = document.createElement("h3");
  const metadata = document.createElement("p");
  const text = document.createElement("p");

  title.textContent = poem.title;
  metadata.className = "poem-card__metadata";
  metadata.textContent = `${poem.author} · ${poem.category}`;
  text.className = "poem-card__text";
  text.textContent = poem.text;
  content.append(title, metadata, text);

  if (poem.sourceUrl) {
    const source = document.createElement("a");
    source.className = "poem-card__source";
    source.href = poem.sourceUrl;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.textContent = "Consultar fonte";
    content.appendChild(source);
  }

  card.appendChild(content);

  if (!poem.isSeed) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "button button--danger poem-card__delete";
    deleteButton.type = "button";
    deleteButton.dataset.poemId = poem.id;
    deleteButton.setAttribute("aria-label", `Excluir o poema ${poem.title}`);
    deleteButton.textContent = "Excluir";
    card.appendChild(deleteButton);
  }

  return card;
}

async function render(search = "") {
  feedback.textContent = "";
  try {
    const poems = await listPoems(search);
    list.replaceChildren(...poems.map(createPoemCard));
    emptyMessage.hidden = poems.length > 0;
  } catch (error) {
    if (error.status === 401) {
      window.location.replace(ROUTES.login);
      return;
    }
    feedback.textContent = error.message;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  try {
    const data = new FormData(form);
    await addPoem({
      title: data.get("title"),
      author: data.get("author"),
      text: data.get("poem"),
      category: data.get("category")
    });
    form.reset();
    searchInput.value = "";
    await render();
  } catch (error) {
    feedback.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});

list.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-poem-id]");
  if (!deleteButton) return;

  deleteButton.disabled = true;
  try {
    await deletePoem(deleteButton.dataset.poemId);
    await render(searchInput.value);
  } catch (error) {
    feedback.textContent = error.message;
    deleteButton.disabled = false;
  }
});

searchInput.addEventListener("input", () => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => render(searchInput.value), 250);
});

logoutButton.addEventListener("click", async () => {
  await logout();
  window.location.replace(ROUTES.login);
});

async function initialize() {
  try {
    const user = await getSession();
    if (!user) {
      window.location.replace(ROUTES.login);
      return;
    }
    usernameElement.textContent = user.username;
    await render();
  } catch (error) {
    feedback.textContent = error.message;
  }
}

initialize();
