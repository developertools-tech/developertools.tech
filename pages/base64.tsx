import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import Base64InputOutput from '../components/base64/Base64InputOutput';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocale from '../hooks/useLocale';
import useLocalState from '../hooks/useLocalState';

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
  const texts = useLocale().base64;
  return (
    <Layout title='Base64'>
      <Heading>Base64</Heading>
      <Typography paragraph>{texts.description}</Typography>
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
