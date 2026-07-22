(function initializeLogin(storage) {
  "use strict";

  const form = document.getElementById("loginForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const enteredUsername = data.get("username").trim();
    const enteredPassword = data.get("password");
    const credentials = storage.getCredentials();

    if (
      credentials.username === enteredUsername &&
      credentials.password === enteredPassword
    ) {
      window.location.href = "galeria.html";
      return;
    }

    message.textContent = "Usuário ou senha incorretos.";
  });
})(window.AppStorage);
