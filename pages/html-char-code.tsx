import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import Base64InputOutput from '../components/base64/Base64InputOutput';
import Heading from '../components/Heading';
import HtmlCharCode from '../components/html-char-code/HtmlCharCode';
import Layout from '../components/Layout';
import TextFieldWithCopyOrPaste from '../components/TextFieldWithCopyOrPaste';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';

export default function Base64Page() {
  const [ascii, setAscii] = useLocalState<string>({
    key: 'base64Ascii',
    defaultValue: '',
  });

  return (
    <Layout title='HTML Character Codes'>
      <Heading>HTML Character Codes</Heading>
      <Typography paragraph>
        Paste or type in some text and it will be encode or decode all
        HTML character codes
      </Typography>
      <HtmlCharCode />
    </Layout>
  );
}
