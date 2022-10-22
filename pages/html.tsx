import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Heading from '../components/Heading';
import HtmlFormat from '../components/html/HtmlFormat';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import nextI18NextConfig from '../next-i18next.config.js';

export default function HtmlPage() {
  const [html, setHtml] = useLocalState<string | void>({
    key: 'html',
    defaultValue: '',
  });

  const [formattedHtml, setFormattedHtml] = useLocalState<
    string | void
  >({
    key: 'htmlFormatted',
    defaultValue: '',
  });

  const [error, setError] = React.useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const { t } = useTranslation('html');

  return (
    <Layout title='HTML'>
      <Heading>HTML</Heading>
      <Typography paragraph>{t('description')}</Typography>
      <HtmlFormat
        html={html}
        formattedHtml={formattedHtml}
        error={error}
        setHtml={setHtml}
        setFormattedHtml={setFormattedHtml}
        setError={setError}
        setToastMessage={setToastMessage}
        setToastOpen={setToastOpen}
        setToastSeverity={setToastSeverity}
      />
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'html'];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale!,
    i18nextNameSpaces as string[],
    nextI18NextConfig,
    ['en', 'ja'],
  );
  return {
    props: { ...translation },
  };
};
