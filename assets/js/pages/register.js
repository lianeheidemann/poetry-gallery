import { ROUTES } from "../core/constants.js";
import { register } from "../services/auth-service.js";

const form = document.querySelector("#register-form");
const feedback = document.querySelector("#form-feedback");
const submitButton = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  feedback.textContent = "";
  submitButton.disabled = true;

  try {
    const data = new FormData(form);
    await register(data.get("username"), data.get("password"));
    window.location.replace(ROUTES.login);
  } catch (error) {
    feedback.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
