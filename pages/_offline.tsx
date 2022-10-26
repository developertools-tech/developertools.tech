import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Namespace } from 'i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import nextI18NextConfig from '../next-i18next.config.js';

export default function IndexPage() {
  const { t } = useTranslation('offline');

  return (
    <Layout title={t('heading')}>
      <Box textAlign='center'>
        <Typography paragraph>{t('message')}</Typography>
      </Box>
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['offline', 'common'];

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
