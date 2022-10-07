import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

export default function YamlPage() {
  const supportsClipboardRead = useSupportsClipboardRead();

  const [error, setError] = React.useState<string>('');

  return (
    <Layout title='YAML'>
      <Box textAlign='center'>
        <Heading>YAML</Heading>
        <Typography paragraph>
          Paste or type YAML to validate and format it.
        </Typography>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='stretch'
        gap={6}
        width={1000}
        maxWidth='100%'
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <TextField
            multiline
            label='Input'
            name='input'
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
            gap={2}
          >
            <Button startIcon={<ClearIcon />}>Clear</Button>
            <Button startIcon={<ContentCopyIcon />}>Copy</Button>
            {!!supportsClipboardRead && (
              <Button startIcon={<ContentPasteGoIcon />}>Paste</Button>
            )}
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <Box
            padding='16.5px 14px'
            borderRadius='4px'
            border='1px solid #494949'
            sx={{
              '& .bad-line': {
                backgroundColor: '#ff330050',
              },
              '& .bad-letter': {
                backgroundColor: '#ff000080',
              },
              '& pre': {
                fontsize: '1rem',
                lineHeight: '1.4375em',
                letterSpacing: '0.00938em',
              },
              '& .placeholder': {
                opacity: 0.7,
              },
            }}
          >
            {/* eslint-disable react/no-danger */}
            <pre
              data-testid='json-output'
              dangerouslySetInnerHTML={{
                __html: '<span class="placeholder">Output</span>',
              }}
            />
            {/* eslint-enable react/no-danger */}
          </Box>
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
            gap={2}
          >
            <Button startIcon={<ClearIcon />}>Clear</Button>
            <Button startIcon={<ContentCopyIcon />}>Copy</Button>
            {!!supportsClipboardRead && (
              <Button startIcon={<ContentPasteGoIcon />}>Paste</Button>
            )}
          </Box>
        </Box>
        <Typography
          color='#ff6246'
          paragraph
          data-testid='json-error'
        >
          {error}
        </Typography>
      </Box>
    </Layout>
  );
}
