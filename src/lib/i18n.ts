import th from '../../messages/th.json';
import en from '../../messages/en.json';

export type Locale = 'th' | 'en';

const MESSAGES = { th, en } as const;

export type Messages = (typeof MESSAGES)['th'];

export function getMessages(locale: string | undefined): Messages {
  if (locale === 'en') return MESSAGES.en as Messages;
  return MESSAGES.th as Messages;
}

export function asLocale(locale: string | undefined): Locale {
  return locale === 'en' ? 'en' : 'th';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'th' ? 'en' : 'th';
}

export function localeHref(locale: Locale): string {
  return locale === 'th' ? '/' : '/en/';
}
