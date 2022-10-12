/** @type {import('next').NextConfig} */

const withImages = require('next-images');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
  sw: 'sw.js',
  reloadOnOnline: true,
});

const nextConfig = withImages({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
});

module.exports = withPWA(nextConfig);
