// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import i18n from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import aspectRatio from '../../public/locales/en/aspectRatio.json';
import base64 from '../../public/locales/en/base64.json';
import common from '../../public/locales/en/common.json';
import css from '../../public/locales/en/css.json';
import html from '../../public/locales/en/html.json';
import htmlCharCodes from '../../public/locales/en/htmlCharCodes.json';
import imageConverter from '../../public/locales/en/imageConverter.json';
import jsonFormat from '../../public/locales/en/jsonFormat.json';
import loremIpsum from '../../public/locales/en/loremIpsum.json';
import regex from '../../public/locales/en/regex.json';
import textDiff from '../../public/locales/en/textDiff.json';
import top from '../../public/locales/en/top.json';
import urlEncode from '../../public/locales/en/urlEncode.json';
import uuid from '../../public/locales/en/uuid.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  ns: [
    'aspectRatio',
    'common',
    'top',
    'base64',
    'css',
    'html',
    'htmlCharCodes',
    'imageConverter',
    'jsonFormat',
    'loremIpsum',
    'regex',
    'textDiff',
    'urlEncode',
    'uuid',
  ],

  debug: true,

  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {
      aspectRatio,
      common,
      top,
      base64,
      css,
      html,
      htmlCharCodes,
      imageConverter,
      jsonFormat,
      loremIpsum,
      regex,
      textDiff,
      urlEncode,
      uuid,
    },
  },
});

export default i18n;

export const renderWithI18n = (component: React.ReactElement) =>
  render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
