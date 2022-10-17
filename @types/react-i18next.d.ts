// @types/react-i18next.d.ts
import 'react-i18next';

import base64 from '../public/locales/en/base64.json';
import common from '../public/locales/en/common.json';
import css from '../public/locales/en/css.json';
import html from '../public/locales/en/html.json';
import htmlCharCodes from '../public/locales/en/htmlCharCodes.json';
import top from '../public/locales/en/top.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      top: typeof top;
      base64: typeof base64;
      css: typeof css;
      html: typeof html;
      htmlCharCodes: typeof htmlCharCodes;
    };
  }
}
