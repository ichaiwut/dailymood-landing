const APP_URL =
  (import.meta.env.PUBLIC_APP_URL as string | undefined) ?? 'https://my.dailymood.me';

export function loginHref(email?: string): string {
  if (!email) return `${APP_URL}/login`;
  return `${APP_URL}/login?email=${encodeURIComponent(email)}`;
}

export function subscriptionHref(): string {
  return `${APP_URL}/profile/subscription`;
}
