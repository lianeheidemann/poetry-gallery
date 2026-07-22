const formCadastro = document.getElementById("formCadastro");

formCadastro.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    window.alert("Campos de usuário ou senha não preenchidos!");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  window.alert("Cadastro efetuado com sucesso! Você será redirecionado para fazer o login.");
  window.location.href = "login.html";
});
