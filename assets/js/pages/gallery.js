import { logout, requireSession } from "../services/auth-service.js";
import { addPoem, deletePoem, filterPoems, listPoems } from "../services/poem-service.js";

const session = requireSession();

if (session) {
  const form = document.querySelector("#poem-form");
  const list = document.querySelector("#poem-list");
  const searchInput = document.querySelector("#search-input");
  const emptyMessage = document.querySelector("#empty-message");
  const usernameElement = document.querySelector("#current-username");
  const logoutButton = document.querySelector("#logout-button");

  let poems = listPoems(session.username);
  usernameElement.textContent = session.username;

  function createPoemCard(poem) {
    const card = document.createElement("article");
    card.className = "poem-card";

    const content = document.createElement("div");
    const title = document.createElement("h3");
    const metadata = document.createElement("p");
    const text = document.createElement("p");
    const deleteButton = document.createElement("button");

    title.textContent = poem.title;
    metadata.className = "poem-card__metadata";
    metadata.textContent = `${poem.author} · ${poem.category}`;
    text.className = "poem-card__text";
    text.textContent = poem.text;
    deleteButton.className = "button button--danger poem-card__delete";
    deleteButton.type = "button";
    deleteButton.dataset.poemId = poem.id;
    deleteButton.setAttribute("aria-label", `Excluir o poema ${poem.title}`);
    deleteButton.textContent = "Excluir";

    content.append(title, metadata, text);
    card.append(content, deleteButton);
    return card;
  }

  function render() {
    const filteredPoems = filterPoems(poems, searchInput.value);
    list.replaceChildren(...filteredPoems.map(createPoemCard));
    emptyMessage.hidden = filteredPoems.length > 0;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

    addPoem(session.username, {
      title: data.get("title"),
      author: data.get("author"),
      text: data.get("poem"),
      category: data.get("category")
    });

    poems = listPoems(session.username);
    form.reset();
    searchInput.value = "";
    render();
  });

  list.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-poem-id]");
    if (!deleteButton) return;

    deletePoem(session.username, deleteButton.dataset.poemId);
    poems = listPoems(session.username);
    render();
  });

  searchInput.addEventListener("input", render);
  logoutButton.addEventListener("click", logout);
  render();
}
