const CONTENT_KEY = "siteContentV1";
const AUTH_KEY = "siteAuthV1";
const TOKEN_KEY = "siteTokenV1";

const defaultCreds = { username: "admin", password: "admin123" };

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getContent() {
  return readJSON(CONTENT_KEY, {});
}
export function getSection(section) {
  const all = getContent();
  return all?.[section] || null;
}
export function setSection(section, data) {
  const all = getContent();
  const next = { ...all, [section]: { ...(all?.[section] || {}), ...data } };
  writeJSON(CONTENT_KEY, next);
  return next[section];
}

export function setProjects(projects) {
  const all = getContent();
  const work = { ...(all.work || {}), projects };
  writeJSON(CONTENT_KEY, { ...all, work });
}

export function currentUser() {
  return readJSON(AUTH_KEY, defaultCreds);
}
export function saveUser(creds) {
  writeJSON(AUTH_KEY, creds);
}
export function isAuthed() {
  return !!localStorage.getItem(TOKEN_KEY);
}
export function login(username, password) {
  const { username: u, password: p } = currentUser();
  if (username === u && password === p) {
    localStorage.setItem(TOKEN_KEY, "ok");
    return true;
  }
  return false;
}
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

