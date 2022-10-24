/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

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
  i18n,
});

module.exports = withPWA(nextConfig);
