import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import createEmotionCache from '../utility/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='icon'
            href='/favicon.ico?v=2'
          />
          <link
            rel='icon'
            type='image/svg+xml'
            href='/favicon.svg?v=2'
          />
          <link
            rel='icon'
            type='image/png'
            href='/favicon.png?v=2'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png?v=2'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png?v=2'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png?v=2'
          />
          <link
            rel='manifest'
            href='/site.webmanifest?v=2'
          />
          <link
            rel='mask-icon'
            href='/safari-pinned-tab.svg?v=2'
            color='#272727'
          />
          <meta
            name='msapplication-TileColor'
            content='#272727'
          />
          <meta
            name='theme-color'
            content='#272727'
          />
          <link
            rel='shortcut icon'
            href='/favicon.ico?v=2'
          />
          <meta
            name='apple-mobile-web-app-title'
            content='Developer Tools'
          />
          <meta
            name='application-name'
            content='Developer Tools'
          />
          <meta
            name='msapplication-TileColor'
            content='#2b5797'
          />
          <meta
            property='og:title'
            content='DeveloperTools.Tech'
          />
          <meta
            property='og:url'
            content='https://www.developertools.tech/'
          />
          <meta
            name='twitter:title'
            content='DeveloperTools.Tech'
          />
          <meta
            name='twitter:card'
            content='summary_large_image'
          />
          <meta
            name='twitter:url'
            content='https://www.developertools.tech/'
          />
          <meta
            name='web_author'
            content='Dan Ford, https://www.dlford.io'
          />
          <meta
            property='og:site_name'
            content='DeveloperTools.Tech'
          />
          <meta
            property='og:description'
            content='Utilities for developers'
          />
          <meta
            name='twitter:description'
            content='Utilities for developers'
          />
          <meta
            property='og:type'
            content='website'
          />
          <meta
            property='og:image'
            content='/og-image.png'
          />
          <meta
            name='twitter:image'
            content='/og-image.png'
          />
          <meta
            property='og:image:width'
            content='2000'
          />
          <meta
            property='og:image:height'
            content='1333'
          />
          <meta
            property='og:image:alt'
            content='A screenshot of the Developer Tools website'
          />
          <meta
            name='twitter:image:alt'
            content='A screenshot of the Developer Tools website'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  /* eslint-disable-next-line testing-library/render-result-naming-convention */
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
