/**
 * Simple client-side helpers for detecting mobile / tablet devices.
 * Keep these utilities lightweight—no external libraries required.
 *
 * NOTE: They run only in the browser.  When rendered on the server
 * (e.g. during Next.js SSR) they default to “desktop” so pages don’t crash.
 */

/**
 * Returns true if the current user-agent looks like a mobile or tablet.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera

  // iOS / Android / generic mobile checks
  return /android/i.test(ua) || /iPad|iPhone|iPod/.test(ua) || /Mobile|Tablet|Phone/i.test(ua)
}

/**
 * Provides a human-readable device label (“Android”, “iPhone”, “iPad”, “Desktop”, …)
 */
export function getMobileDeviceType(): string | null {
  if (typeof window === "undefined") return null

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera

  if (/android/i.test(ua)) return "Android"
  if (/iPad/i.test(ua)) return "iPad"
  if (/iPhone/i.test(ua)) return "iPhone"
  if (/iPod/i.test(ua)) return "iPod"
  if (/Mobile/i.test(ua)) return "Mobile"
  if (/Tablet/i.test(ua)) return "Tablet"

  return "Desktop"
}
