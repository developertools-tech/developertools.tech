/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const withImages = require('next-images');
const withYaml = require('next-plugin-yaml');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
  },
  i18n,
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
  sw: 'sw.js',
  reloadOnOnline: true,
});

module.exports = withPWA(withImages(withYaml(nextConfig)));
