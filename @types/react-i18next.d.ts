// @types/react-i18next.d.ts
import 'react-i18next';

import aspectRatio from '../public/locales/en/aspectRatio.json';
import base64 from '../public/locales/en/base64.json';
import common from '../public/locales/en/common.json';
import css from '../public/locales/en/css.json';
import html from '../public/locales/en/html.json';
import htmlCharCodes from '../public/locales/en/htmlCharCodes.json';
import imageConverter from '../public/locales/en/imageConverter.json';
import jsonFormat from '../public/locales/en/json.json';
import loremIpsum from '../public/locales/en/loremIpsum.json';
import regex from '../public/locales/en/regex.json';
import textDiff from '../public/locales/en/textDiff.json';
import top from '../public/locales/en/top.json';
import urlEncode from '../public/locales/en/urlEncode.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      aspectRatio: typeof aspectRatio;
      common: typeof common;
      top: typeof top;
      base64: typeof base64;
      css: typeof css;
      html: typeof html;
      htmlCharCodes: typeof htmlCharCodes;
      imageConverter: typeof imageConverter;
      jsonFormat: typeof jsonFormat;
      loremIpsum: typeof loremIpsum;
      regex: typeof regex;
      textDiff: typeof textDiff;
      urlEncode: typeof urlEncode;
    };
  }
}
