import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

export default function IndexPage() {
  return (
    <Layout>
      <Box textAlign='center'>
        <Heading>Welcome</Heading>
        <Typography paragraph>
          Choose a tool from the menu to get started!
        </Typography>
        <Typography
          paragraph
          mt={8}
        >
          Don&apos;t see the tool you need?{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech/issues/new?assignees=&labels=feature+request%2Ctriage&template=FEATURE_REQUEST.yml&title=%5BReq%5D%3A+'
            target='_blank'
            rel='noopener noreferrer'
          >
            request it here
          </a>
        </Typography>
        <Typography paragraph>
          Found a bug?{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech/issues/new?assignees=&labels=bug%2Ctriage&template=BUG.yml&title=%5BBug%5D%3A+'
            target='_blank'
            rel='noopener noreferrer'
          >
            report it here
          </a>
        </Typography>
        <Typography paragraph>
          Want to help?{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech'
            target='_blank'
            rel='noopener noreferrer'
          >
            contribute on GitHub
          </a>
        </Typography>
        <Button
          variant='outlined'
          startIcon={<FavoriteIcon />}
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/sponsors/dlford'
          sx={{ mt: 4 }}
        >
          Sponsor
        </Button>
      </Box>
    </Layout>
  );
}
