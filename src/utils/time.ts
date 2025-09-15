export function isOverdue(dateIso?: string | null) {
  if (!dateIso) return false;
  const due = new Date(dateIso).getTime();
  return Date.now() > due;
}

export function hoursUntil(dateIso?: string | null) {
  if (!dateIso) return Infinity;
  const diffMs = new Date(dateIso).getTime() - Date.now();
  return diffMs / (1000 * 60 * 60);
}

export function isUrgent(dateIso?: string | null) {
  const h = hoursUntil(dateIso);
  return h <= 24 && h >= 0;
}
