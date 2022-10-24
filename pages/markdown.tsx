import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Namespace } from 'i18next';
import { marked } from 'marked';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import nextI18NextConfig from '../next-i18next.config.js';

export default function MarkDownPreview() {
  const { t } = useTranslation('markdown');
  const [output, setOutput] = useState('');

  return (
    <Layout title={t('title')}>
      <Typography
        paragraph
        textAlign='center'
      >
        {t('description')}
      </Typography>
      <Box
        className='mainBox'
        display='flex'
        justifyContent='stretch'
        gap={3}
        width='80%'
        sx={{
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
        <TextField
          label={t('inputLabel')}
          id='inputText'
          multiline
          rows={10}
          value={output}
          onChange={(ev) => setOutput(ev.target.value)}
          sx={{
            width: { md: '60%', xs: '100%' },
            minWidth: '50%',
          }}
        />
        {/* eslint-disable react/no-danger */}
        <Typography
          data-testid='markdown-output'
          className='markdownOutput'
          paragraph
          dangerouslySetInnerHTML={{ __html: marked(output) }}
        />
      </Box>
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['markdown', 'common'];

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
