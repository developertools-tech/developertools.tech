// @ts-check
/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'hi', 'ja', 'pt'],
  },
  fallbackLng: {
    default: ['en'],
  },
  nonExplicitSupportedLngs: true,
  localePath: 'i18n',
};
