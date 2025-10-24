export async function loginService({ id, email, password }) {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id, email, password })
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function logoutService() {
  const res = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include"
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function checkSessionService() {
  const res = await fetch("http://localhost:3000/auth/me", {
    method: "GET",
    credentials: "include"
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

