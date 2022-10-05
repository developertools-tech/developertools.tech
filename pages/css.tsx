import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import CssForm from '../components/css/CssForm';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';

export default function CssMinifyPage() {
  const [css, setCss] = useLocalState<string | void>({
    key: 'html',
    defaultValue: '',
  });
  const [formattedCss, setFormattedCss] = useLocalState<string | void>({
    key: 'cssFormatted',
    defaultValue: '',
  });

  const [error, setError] = React.useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  return (
    <Layout>
      <Heading>Minify CSS</Heading>
      <Typography paragraph>
        Paste or type in some CSS to format or minify it
      </Typography>
      <CssForm
        css={css}
        formattedCss={formattedCss}
        error={error}
        setCss={setCss}
        setFormattedCss={setFormattedCss}
        setError={setError}
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
