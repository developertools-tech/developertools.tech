import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import nextI18NextConfig from '../next-i18next.config.js';

export default function IndexPage() {
  const { t } = useTranslation('top');
  return (
    <Layout>
      <Box textAlign='center'>
        <Heading>{t('welcome')}</Heading>
        <Typography paragraph>{t('chooseFromMenu')}</Typography>
        <Typography
          paragraph
          mt={8}
        >
          {t('dontSeeTheToolYouNeed')}{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech/issues/new?assignees=&labels=feature+request%2Ctriage&template=FEATURE_REQUEST.yml&title=%5BReq%5D%3A+'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('requestItHere')}
          </a>
        </Typography>
        <Typography paragraph>
          {t('foundBug')}{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech/issues/new?assignees=&labels=bug%2Ctriage&template=BUG.yml&title=%5BBug%5D%3A+'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('reportItHere')}
          </a>
        </Typography>
        <Typography paragraph>
          {t('wantToHelp')}{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('contributeOnGit')}
          </a>
        </Typography>
      </Box>
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'top'];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale!,
    i18nextNameSpaces as string[],
    nextI18NextConfig,
    ['en', 'ja'],
  );
  return {
    props: { ...translation },
    revalidate: 3600,
  };
};