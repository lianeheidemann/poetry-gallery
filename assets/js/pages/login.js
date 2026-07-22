import { ROUTES } from "../core/constants.js";
import { getSession, login } from "../services/auth-service.js";

if (getSession()) {
  window.location.replace(ROUTES.gallery);
}

const form = document.querySelector("#login-form");
const feedback = document.querySelector("#form-feedback");
const submitButton = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  feedback.textContent = "";
  submitButton.disabled = true;

  try {
    const data = new FormData(form);
    const authenticated = await login(data.get("username"), data.get("password"));

    if (!authenticated) {
      feedback.textContent = "Usuário ou senha incorretos.";
      return;
    }

    window.location.replace(ROUTES.gallery);
  } catch (error) {
    feedback.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
