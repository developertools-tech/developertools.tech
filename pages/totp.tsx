import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import Totp from '../components/totp/Totp';
import useLocalState from '../hooks/useLocalState';
import nextI18NextConfig from '../next-i18next.config.js';

export default function TotpPage() {
  const [secret, setSecret] = useLocalState<string>({
    key: 'totp:secret',
    defaultValue: Math.random().toString(36),
  });
  const [uri, setUri] = useLocalState<string>({
    key: 'totp:uri',
    defaultValue: '',
  });
  const [error, setError] = React.useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const { t } = useTranslation('totp');

  return (
    <Layout title={t('title')}>
      <Typography paragraph>{t('description')}</Typography>
      <Totp
        secret={secret}
        uri={uri}
        error={error}
        setSecret={setSecret}
        setUri={setUri}
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

const i18nextNameSpaces: Namespace[] = ['common', 'totp'];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale || 'en',
    i18nextNameSpaces as string[],
    nextI18NextConfig,
  );
  return {
    props: { ...translation },
  };
};
