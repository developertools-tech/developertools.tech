import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import CssForm from '../components/css/CssForm';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocale from '../hooks/useLocale';
import useLocalState from '../hooks/useLocalState';

export default function CssPage() {
  const [css, setCss] = useLocalState<string | void>({
    key: 'css',
    defaultValue: '',
  });
  const [formattedCss, setFormattedCss] = useLocalState<string | void>({
    key: 'cssFormatted',
    defaultValue: '',
  });
  const [minifyCss, setMinifyCss] = useLocalState<boolean>({
    key: 'cssMinify',
    defaultValue: false,
  });

  const [error, setError] = React.useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const texts = useLocale().css;
  return (
    <Layout title='CSS'>
      <Heading>Minify CSS</Heading>
      <Typography paragraph>{texts.description}</Typography>
      <Typography paragraph>{texts.note}</Typography>
      <CssForm
        css={css}
        formattedCss={formattedCss}
        error={error}
        minifyCss={minifyCss}
        setCss={setCss}
        setFormattedCss={setFormattedCss}
        setError={setError}
        setMinifyCss={setMinifyCss}
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
