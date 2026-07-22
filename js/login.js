const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const usernameSalvo = localStorage.getItem("username");
  const passwordSalvo = localStorage.getItem("password");
  const usernameInformado = document.getElementById("username").value;
  const passwordInformado = document.getElementById("password").value;

  if (usernameSalvo === usernameInformado && passwordSalvo === passwordInformado) {
    window.alert("Login bem-sucedido!");
    window.location.href = "galeria.html";
    return;
  }

  window.alert("Informações incorretas ou ausentes!");
});
