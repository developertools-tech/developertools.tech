import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import Layout from '../components/Layout';

export default function IndexPage() {
  return (
    <Layout>
      <Box
        padding={3}
        textAlign='center'
        color='text.secondary'
      >
        <Typography
          variant='h3'
          component='h1'
          marginBottom={2}
        >
          Welcome!
        </Typography>
        <Typography
          variant='h5'
          component='p'
        >
          Choose a tool from the menu to get started.
        </Typography>
      </Box>
    </Layout>
  );
}
