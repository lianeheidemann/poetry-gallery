(function initializeRegister(storage) {
  "use strict";

  const form = document.getElementById("registerForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const username = data.get("username").trim();
    const password = data.get("password");

    if (!username || !password) {
      message.textContent = "Preencha o usuário e a senha.";
      return;
    }

    storage.saveCredentials(username, password);
    window.location.href = "login.html";
  });
})(window.AppStorage);
