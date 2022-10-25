// @ts-check
/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      'ja',
      'pt-BR',
      'pt-PT', // fallback to pt-BR
      'pt', // fallback to pt-BR
      'sw', // fallback to en
    ],
  },
  fallbackLng: {
    default: ['en'],
    pt: ['pt-BR', 'en'],
    'pt-PT': ['pt-BR', 'en'],
  },
  localePath: 'i18n',
};
