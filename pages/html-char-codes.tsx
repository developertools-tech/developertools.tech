import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Heading from '../components/Heading';
import HtmlCharCodes from '../components/html-char-code/HtmlCharCode';
import Layout from '../components/Layout';
import nextI18NextConfig from '../next-i18next.config.js';

export default function HtmlCharCodesPage() {
  const { t } = useTranslation('htmlCharCodes');
  return (
    <Layout title='HTML Character Codes'>
      <Heading>HTML Character Codes</Heading>
      <Typography paragraph>{t('description')}</Typography>
      <HtmlCharCodes />
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'htmlCharCodes'];

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
