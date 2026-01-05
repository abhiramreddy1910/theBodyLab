const KEYS = {
  session: "bodylab_session",
  profile: "bodylab_profile",
  bookings: "bodylab_bookings",
  demoMode: "bodylab_demo_mode"
};

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function getSession() {
  const raw = localStorage.getItem(KEYS.session);
  return safeParse(raw, { isAuthed: false, userId: null });
}

export function setSession(session) {
  localStorage.setItem(KEYS.session, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(KEYS.session);
}

export function getProfile() {
  const raw = localStorage.getItem(KEYS.profile);
  return safeParse(raw, null);
}

export function setProfile(profile) {
  localStorage.setItem(KEYS.profile, JSON.stringify(profile));
}

export function getBookings() {
  const raw = localStorage.getItem(KEYS.bookings);
  return safeParse(raw, []);
}

export function addBooking(booking) {
  const all = getBookings();
  all.unshift(booking);
  localStorage.setItem(KEYS.bookings, JSON.stringify(all));
  return all;
}

export function getDemoMode() {
  const raw = localStorage.getItem(KEYS.demoMode);
  return safeParse(raw, { persona: "founder" });
}

export function setDemoMode(mode) {
  localStorage.setItem(KEYS.demoMode, JSON.stringify(mode));
}
