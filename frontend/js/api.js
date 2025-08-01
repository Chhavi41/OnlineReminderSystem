const API_BASE = "http://localhost:5000/api"; // adjust if needed

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", // important for cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || res.statusText);
  }
  return res.json();
}

export async function login(emailId, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ emailId, password }),
  });
}

export async function register(firstName, lastName, emailId, password) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, emailId, password }),
  });
}

export async function getCurrentUser() {
  return request("/auth/me", { method: "GET" });
}

export async function getReminders() {
  return request("/reminders", { method: "GET" });
}

export async function createReminder(payload) {
  return request("/reminders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
