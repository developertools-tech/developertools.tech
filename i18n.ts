import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import aspectRatio from './i18n/en/aspectRatio.json';
import base64 from './i18n/en/base64.json';
import common from './i18n/en/common.json';
import css from './i18n/en/css.json';
import html from './i18n/en/html.json';
import htmlCharCodes from './i18n/en/htmlCharCodes.json';
import imageConverter from './i18n/en/imageConverter.json';
import jsonFormat from './i18n/en/jsonFormat.json';
import loremIpsum from './i18n/en/loremIpsum.json';
import markdown from './i18n/en/markdown.json';
import notFound from './i18n/en/notFound.json';
import offline from './i18n/en/offline.json';
import queryString from './i18n/en/queryString.json';
import regex from './i18n/en/regex.json';
import textDiff from './i18n/en/textDiff.json';
import top from './i18n/en/top.json';
import urlEncode from './i18n/en/urlEncode.json';
import uuid from './i18n/en/uuid.json';

export const defaultNS = 'common';
export const resources = {
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
    queryString,
    regex,
    textDiff,
    urlEncode,
    uuid,
    notFound,
    offline,
    markdown,
  },
} as const;

// Used for Jest
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  ns: Object.keys(resources.en),
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },

  resources,
});

export default i18n;
