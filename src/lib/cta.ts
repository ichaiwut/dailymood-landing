const APP_URL =
  (import.meta.env.PUBLIC_APP_URL as string | undefined) ?? 'https://my.dailymood.me';

export function loginHref(email?: string): string {
  if (!email) return `${APP_URL}/login`;
  return `${APP_URL}/login?email=${encodeURIComponent(email)}`;
}

export function subscriptionHref(): string {
  return `${APP_URL}/profile/subscription`;
}

// Guest "try the AI" widget: the public analyze endpoint (called cross-origin)…
export function guestAnalyzeUrl(): string {
  return `${APP_URL}/api/guest/analyze`;
}

// …and the login URL that carries the parked-result token across to the app,
// where it's redeemed into the user's first saved mood after Google sign-in.
export function loginWithGuestEntry(token: string): string {
  return `${APP_URL}/login?guestEntry=${encodeURIComponent(token)}`;
}
