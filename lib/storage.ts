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
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null && isValid(raw) ? raw : null;
  } catch {
    return null; // no window (prerender) or storage blocked (S4)
  }
}

export function writeStored(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable or full, session-only state is fine (S4)
  }
}
