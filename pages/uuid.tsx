import Box from '@mui/material/Box';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { Namespace } from 'react-i18next';

import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import UuidAbout from '../components/uuid/About';
import UuidCreate from '../components/uuid/Create';
import UuidValidate from '../components/uuid/Validate';
import nextI18NextConfig from '../next-i18next.config.js';

export default function UuidPage() {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  return (
    <Layout title='UUID'>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        gap={4}
        mb={6}
        maxWidth='100%'
      >
        <UuidCreate
          setToastMessage={setToastMessage}
          setToastSeverity={setToastSeverity}
          setToastOpen={setToastOpen}
        />
        <UuidValidate />
      </Box>
      <UuidAbout />
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'uuid'];

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
