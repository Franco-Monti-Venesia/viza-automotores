export const STORAGE_KEYS = {
  vehicles: 'viza-demo-vehicles-v1',
  inquiries: 'viza-demo-inquiries-v1',
  appraisals: 'viza-demo-appraisals-v1',
  settings: 'viza-demo-settings-v1',
};

export function readStoredList(key, fallback = []) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(key, value) {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function getVehicles(seed) {
  return readStoredList(STORAGE_KEYS.vehicles, seed);
}
