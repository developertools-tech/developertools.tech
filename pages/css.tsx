import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import CssForm from '../components/css/CssForm';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import nextI18NextConfig from '../next-i18next.config.js';

export default function CssPage() {
  const [css, setCss] = useLocalState<string | void>({
    key: 'css',
    defaultValue: '',
  });
  const [formattedCss, setFormattedCss] = useLocalState<string | void>({
    key: 'cssFormatted',
    defaultValue: '',
  });
  const [minifyCss, setMinifyCss] = useLocalState<boolean>({
    key: 'cssMinify',
    defaultValue: false,
  });

  const [error, setError] = React.useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const { t } = useTranslation('css');
  return (
    <Layout title='CSS'>
      <Heading>Minify CSS</Heading>
      <Typography paragraph>{t('description')}</Typography>
      <Typography paragraph>{t('note')}</Typography>
      <CssForm
        css={css}
        formattedCss={formattedCss}
        error={error}
        minifyCss={minifyCss}
        setCss={setCss}
        setFormattedCss={setFormattedCss}
        setError={setError}
        setMinifyCss={setMinifyCss}
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

const i18nextNameSpaces: Namespace[] = ['common', 'css'];

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
