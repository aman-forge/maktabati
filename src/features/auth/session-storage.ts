export const HAS_SESSION_KEY = "auth:hasSession";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

export function readHasSessionHint(): boolean {
  return getStorage()?.getItem(HAS_SESSION_KEY) === "1";
}

export function writeHasSessionHint() {
  getStorage()?.setItem(HAS_SESSION_KEY, "1");
}

export function clearHasSessionHint() {
  getStorage()?.removeItem(HAS_SESSION_KEY);
}
