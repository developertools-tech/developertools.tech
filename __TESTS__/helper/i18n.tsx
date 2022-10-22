// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import i18n from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import aspectRatio from '../../i18n/en/aspectRatio.json';
import base64 from '../../i18n/en/base64.json';
import common from '../../i18n/en/common.json';
import css from '../../i18n/en/css.json';
import html from '../../i18n/en/html.json';
import htmlCharCodes from '../../i18n/en/htmlCharCodes.json';
import imageConverter from '../../i18n/en/imageConverter.json';
import jsonFormat from '../../i18n/en/jsonFormat.json';
import loremIpsum from '../../i18n/en/loremIpsum.json';
import regex from '../../i18n/en/regex.json';
import textDiff from '../../i18n/en/textDiff.json';
import top from '../../i18n/en/top.json';
import urlEncode from '../../i18n/en/urlEncode.json';
import uuid from '../../i18n/en/uuid.json';

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
