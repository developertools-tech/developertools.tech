import Typography from '@mui/material/Typography';
import React from 'react';

import Heading from '../components/Heading';
import HtmlCharCodes from '../components/html-char-code/HtmlCharCode';
import Layout from '../components/Layout';

export default function HtmlCharCodesPage() {
  return (
    <Layout title='HTML Character Codes'>
      <Heading>HTML Character Codes</Heading>
      <Typography paragraph>
        Paste or type each to escape or unescape HTML character codes
        from each other
      </Typography>
      <HtmlCharCodes />
    </Layout>
  );
}
