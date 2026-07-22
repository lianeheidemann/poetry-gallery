import { apiRequest } from "../core/api.js";

export async function listPoems(search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const response = await apiRequest(`/api/poems${query}`);
  return response.poems;
}

export async function addPoem(poem) {
  const response = await apiRequest("/api/poems", {
    method: "POST",
    body: JSON.stringify(poem)
  });
  return response.poem;
}

export async function deletePoem(poemId) {
  return apiRequest(`/api/poems/${poemId}`, { method: "DELETE" });
}
