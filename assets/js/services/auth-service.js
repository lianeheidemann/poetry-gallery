import { apiRequest } from "../core/api.js";

export async function register(username, password) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}

export async function login(username, password) {
  const response = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
  return response.user;
}

export async function getSession() {
  const response = await apiRequest("/api/auth/session");
  return response.user;
}

export async function logout() {
  await apiRequest("/api/auth/logout", { method: "POST" });
}
