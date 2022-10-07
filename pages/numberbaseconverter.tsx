import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import NumberBase from '../components/NumberBase/NumberBase';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';

export default function Base64Page() {
  const [inputBase, setInputBase] = useLocalState<string | void>({
    key: 'inputBase',
    defaultValue: '',
  });

  const [desiredBase, setDesiredBase] = useLocalState<string | void>({
    key: 'desiredBase',
    defaultValue: '',
  });

  const [isError, setIsError] = React.useState(false);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  return (
    <Layout title='NumberBaseConverter'>
      <Heading>Number Base Converter</Heading>
      <Typography paragraph>
        Paste a number in any base and convert it to any other base you want
      </Typography>
      <NumberBase
        inputBase={inputBase}
        desiredBase={desiredBase}
        isError={isError}
        setInputBase={setInputBase}
        setDesiredBase={setDesiredBase}
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
