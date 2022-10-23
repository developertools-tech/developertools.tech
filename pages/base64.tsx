import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Base64InputOutput from '../components/base64/Base64InputOutput';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import nextI18NextConfig from '../next-i18next.config.js';

export default function Base64Page() {
  const [ascii, setAscii] = useLocalState<string | void>({
    key: 'base64Ascii',
    defaultValue: '',
  });

  const [base64, setBase64] = useLocalState<string | void>({
    key: 'base64Base64',
    defaultValue: '',
  });

  const [isError, setIsError] = React.useState(false);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const { t } = useTranslation('base64');

  const pageTitle = t('title');

  return (
    <Layout title={pageTitle}>
      <Heading>{pageTitle}</Heading>
      <Typography paragraph>{t('description')}</Typography>
      <Base64InputOutput
        ascii={ascii}
        base64={base64}
        isError={isError}
        setAscii={setAscii}
        setBase64={setBase64}
        setIsError={setIsError}
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

const i18nextNameSpaces: Namespace[] = ['common', 'base64'];

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
