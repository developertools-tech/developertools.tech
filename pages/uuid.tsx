import Box from '@mui/material/Box';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import UuidAbout from '../components/uuid/About';
import UuidCreate from '../components/uuid/Create';
import UuidValidate from '../components/uuid/Validate';

export default function UuidPage() {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  return (
    <Layout title='UUID'>
      <Heading>UUID</Heading>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        gap={4}
        mb={6}
        maxWidth='100%'
      >
        <UuidCreate
          setToastMessage={setToastMessage}
          setToastSeverity={setToastSeverity}
          setToastOpen={setToastOpen}
        />
        <UuidValidate />
      </Box>
      <UuidAbout />
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
    </Layout>
  );
}
