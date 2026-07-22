(function initializeGallery(storage) {
  "use strict";

  const form = document.getElementById("poemForm");
  const list = document.getElementById("poemList");
  const searchInput = document.getElementById("searchInput");
  const emptyMessage = document.getElementById("emptyMessage");
  const currentUsername = document.getElementById("currentUsername");
  const logoutButton = document.getElementById("logoutButton");

  let poems = storage.getPoems();
  const credentials = storage.getCredentials();
  currentUsername.textContent = credentials.username || "Visitante";

  function createPoemCard(poem, index) {
    const article = document.createElement("article");
    article.className = "poem-card";

    const content = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const text = document.createElement("p");
    const category = document.createElement("small");
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("img");

    title.textContent = poem.title;
    author.textContent = `Autor: ${poem.author}`;
    text.textContent = poem.text;
    text.className = "poem-text";
    category.textContent = `Categoria: ${poem.category}`;

    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.setAttribute("aria-label", `Excluir ${poem.title}`);
    deleteButton.dataset.index = index;
    deleteIcon.src = "Imagens/deleteIcon.png";
    deleteIcon.alt = "";

    deleteButton.appendChild(deleteIcon);
    content.append(title, author, text, category);
    article.append(content, deleteButton);
    return article;
  }

  function renderPoems(filter = "") {
    const normalizedFilter = filter.trim().toLowerCase();
    list.replaceChildren();

    const matches = poems
      .map((poem, index) => ({ poem, index }))
      .filter(({ poem }) =>
        Object.values(poem).some((value) =>
          String(value).toLowerCase().includes(normalizedFilter)
        )
      );

    matches.forEach(({ poem, index }) => {
      list.appendChild(createPoemCard(poem, index));
    });

    emptyMessage.hidden = matches.length > 0;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

    poems.push({
      title: data.get("title").trim(),
      author: data.get("author").trim(),
      text: data.get("poem").trim(),
      category: data.get("category")
    });

    storage.savePoems(poems);
    form.reset();
    searchInput.value = "";
    renderPoems();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest(".delete-button");
    if (!button) return;

    poems.splice(Number(button.dataset.index), 1);
    storage.savePoems(poems);
    renderPoems(searchInput.value);
  });

  searchInput.addEventListener("input", () => renderPoems(searchInput.value));

  logoutButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  renderPoems();
})(window.AppStorage);
