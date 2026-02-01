const DEFAULT_BASE_URL = "http://localhost:5174";

export const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL || DEFAULT_BASE_URL;

const buildUrl = (path) => {
  if (!path.startsWith("/")) return `${API_BASE_URL}/${path}`;
  return `${API_BASE_URL}${path}`;
};

export const apiFetchJson = async (
  path,
  { method = "GET", body, token } = {},
) => {
  const res = await fetch(buildUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore non-json
  }

  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
};
