// @types/react-i18next.d.ts
import 'react-i18next';

import aspectRatio from '../i18n/en/aspectRatio.json';
import base64 from '../i18n/en/base64.json';
import common from '../i18n/en/common.json';
import css from '../i18n/en/css.json';
import html from '../i18n/en/html.json';
import htmlCharCodes from '../i18n/en/htmlCharCodes.json';
import imageConverter from '../i18n/en/imageConverter.json';
import jsonFormat from '../i18n/en/jsonFormat.json';
import loremIpsum from '../i18n/en/loremIpsum.json';
import notFound from '../i18n/en/notFound.json';
import regex from '../i18n/en/regex.json';
import textDiff from '../i18n/en/textDiff.json';
import top from '../i18n/en/top.json';
import urlEncode from '../i18n/en/urlEncode.json';
import uuid from '../i18n/en/uuid.json';

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
      uuid: typeof uuid;
      notFound: typeof notFound;
    };
  }
}
