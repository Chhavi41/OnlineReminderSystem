import { getCurrentUser } from "./api.js";

export async function ensureAuthOrRedirect() {
  try {
    await getCurrentUser();
    // user is authenticated
  } catch {
    window.location.href = "login.html";
  }
}
