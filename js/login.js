const USUARIO_TESTE = "user";
const SENHA_TESTE = "password";
const formLogin = document.getElementById("formLogin");

if (
  !sessionStorage.getItem("username") ||
  !sessionStorage.getItem("password")
) {
  sessionStorage.setItem("username", "user");
  sessionStorage.setItem("password", "password");
}

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const usernameSalvo = sessionStorage.getItem("username");
  const passwordSalvo = sessionStorage.getItem("password");

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
  sessionStorage.setItem("username", usernameInformado);
  window.location.href = "galeria.html";
  return;
}

  window.alert("Usuário ou senha incorretos!");
});