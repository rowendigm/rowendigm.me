/** Safe client-storage access (rules/client-storage.md).
 *
 * S1: components never touch localStorage directly; these helpers are the
 * only access path, and they never crash, prerender included. S2 still
 * applies to callers: read stored preferences in an effect, after mount,
 * never in render bodies or lazy initializers, or hydration will mismatch.
 * S3: reads are validated before they are trusted. S4: failures degrade
 * silently, reads fall back and writes are best-effort.
 */

export function readStored<T extends string>(
  key: string,
  isValid: (raw: string) => raw is T,
): T | null {
  if (typeof window === "undefined") {
    return null; // prerender
  }
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return null; // storage blocked (S4)
  }
  return raw !== null && isValid(raw) ? raw : null;
}

export function writeStored(key: string, value: string): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable or full, session-only state is fine (S4)
  }
}
