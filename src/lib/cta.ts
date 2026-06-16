const APP_URL =
  (import.meta.env.PUBLIC_APP_URL as string | undefined) ?? 'https://my.dailymood.me';

// Native app store listings. iOS is live (App Store) so its URL is the default;
// Android is not published yet, so it stays empty and its helper falls back to
// the in-page "#download" anchor (scroll to the download section). Both can be
// overridden per-environment via PUBLIC_IOS_URL / PUBLIC_ANDROID_URL.
const IOS_URL =
  (import.meta.env.PUBLIC_IOS_URL as string | undefined) ??
  'https://apps.apple.com/th/app/id6778759803';
const ANDROID_URL = (import.meta.env.PUBLIC_ANDROID_URL as string | undefined) ?? '';

/** App Store listing URL. Falls back to the in-page #download anchor. */
export function appStoreHref(): string {
  return IOS_URL || '#download';
}

/** Google Play listing URL. Falls back to the in-page #download anchor. */
export function playStoreHref(): string {
  return ANDROID_URL || '#download';
}

/**
 * Whether the Android app is published yet (i.e. PUBLIC_ANDROID_URL is set).
 * While this is false, the Google Play badge renders greyed-out and
 * non-clickable with an "Android coming soon" hint. Set the env var to flip
 * the badge live — no code change needed.
 */
export function isAndroidLive(): boolean {
  return Boolean(ANDROID_URL);
}

/** The browser version of DailyMood — promoted as a secondary option in the footer. */
export function webAppHref(): string {
  return APP_URL;
}

// Legacy web-app entry points. The landing now drives store downloads, so these
// are unused by the current sections — kept as the documented cross-domain surface
// for if a "Sign in" / subscription link returns to the page.
export function loginHref(email?: string): string {
  if (!email) return `${APP_URL}/login`;
  return `${APP_URL}/login?email=${encodeURIComponent(email)}`;
}

export function subscriptionHref(): string {
  return `${APP_URL}/profile/subscription`;
}
