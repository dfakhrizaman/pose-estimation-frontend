type LocalStorageKey = "access_token"; // Define any key names you need here

export function getLocalStorageItem<T>(key: LocalStorageKey): any {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function setLocalStorageItem<T>(key: LocalStorageKey, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageItem(key: LocalStorageKey): void {
  localStorage.removeItem(key);
}
