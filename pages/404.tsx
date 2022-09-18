import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

export default function IndexPage() {
  return (
    <Layout>
      <Box textAlign='center'>
        <Heading>Oof! Page not found!</Heading>
        <Typography paragraph>
          Choose a tool from the menu to get started!
        </Typography>
      </Box>
    </Layout>
  );
}
