import Typography from '@mui/material/Typography';
import React from 'react';

import Heading from '../components/Heading';
import HtmlCharCodes from '../components/html-char-code/HtmlCharCode';
import Layout from '../components/Layout';
import useLocale from '../hooks/useLocale';

export default function HtmlCharCodesPage() {
  return (
    <Layout title='HTML Character Codes'>
      <Heading>HTML Character Codes</Heading>
      <Typography paragraph>
        {useLocale().htmlCharCode.description}
      </Typography>
      <HtmlCharCodes />
    </Layout>
  );
}
