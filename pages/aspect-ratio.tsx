import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import Layout from '../components/Layout';

export default function IndexPage() {
  return (
    <Layout>
      <Box padding={3}>
        <Typography
          variant='h5'
          component='h1'
        >
          Aspect Ratio Calculator
        </Typography>
      </Box>
    </Layout>
  );
}
