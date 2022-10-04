import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import HtmlFormat from '../components/html/HtmlFormat';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';

export default function HtmlPage() {
  const [html, setHtml] = useLocalState<string | void>({
    key: 'html',
    defaultValue: '',
  });

  const [formattedHtml, setFormattedHtml] = useLocalState<
    string | void
  >({
    key: 'htmlFormatted',
    defaultValue: '',
  });

  const [error, setError] = React.useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  return (
    <Layout title='HTML'>
      <Heading>HTML</Heading>
      <Typography paragraph>
        Paste or type in some unformatted HTML to format it
      </Typography>
      <HtmlFormat
        html={html}
        formattedHtml={formattedHtml}
        error={error}
        setHtml={setHtml}
        setFormattedHtml={setFormattedHtml}
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
