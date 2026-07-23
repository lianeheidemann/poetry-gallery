const USUARIO_TESTE = "user";
const SENHA_TESTE = "password";
const formLogin = document.getElementById("formLogin");

if (
  !localStorage.getItem("username") ||
  !localStorage.getItem("password")
) {
  localStorage.setItem("username", "user");
  localStorage.setItem("password", "password");
}

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const usernameSalvo = localStorage.getItem("username");
  const passwordSalvo = localStorage.getItem("password");

  const usernameInformado = document
    .getElementById("username")
    .value
    .trim();

  const passwordInformado = document
    .getElementById("password")
    .value;

  if (
  (
    usernameSalvo === usernameInformado &&
    passwordSalvo === passwordInformado
  ) ||
  (
    usernameInformado === USUARIO_TESTE &&
    passwordInformado === SENHA_TESTE
  )
) {
  window.alert("Login bem-sucedido!");
  localStorage.setItem("username", usernameInformado);
  window.location.href = "galeria.html";
  return;
}

  window.alert("Usuário ou senha incorretos!");
});