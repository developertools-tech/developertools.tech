import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocale from '../hooks/useLocale';

export default function IndexPage() {
  const texts = useLocale().home;
  return (
    <Layout>
      <Box textAlign='center'>
        <Heading>{texts.welcome}</Heading>
        <Typography paragraph>
          {texts.chooseFromMenu}
        </Typography>
        <Typography
          paragraph
          mt={8}
        >
          {texts.dontSeeTheToolYouNeed}{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech/issues/new?assignees=&labels=feature+request%2Ctriage&template=FEATURE_REQUEST.yml&title=%5BReq%5D%3A+'
            target='_blank'
            rel='noopener noreferrer'
          >
            {texts.requestItHere}
          </a>
        </Typography>
        <Typography paragraph>
          {texts.foundBug}{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech/issues/new?assignees=&labels=bug%2Ctriage&template=BUG.yml&title=%5BBug%5D%3A+'
            target='_blank'
            rel='noopener noreferrer'
          >
           {texts.reportItHere}
          </a>
        </Typography>
        <Typography paragraph>
          {texts.wantToHelp}{' '}
          <a
            href='https://github.com/developertools-tech/developertools.tech'
            target='_blank'
            rel='noopener noreferrer'
          >
           {texts.contributeOnGit}
          </a>
        </Typography>
      </Box>
    </Layout>
  );
}
