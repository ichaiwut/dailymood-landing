import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://dailymood.me',
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
