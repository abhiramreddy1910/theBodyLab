export function initials(name = "BodyLab") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0]?.toUpperCase() ?? "").join("");
}

export function nowISO() {
  return new Date().toISOString();
}
