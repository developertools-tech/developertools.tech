import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { decode, encode } from 'js-base64';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

export default function Base64Page() {
  const supportsClipboardRead = useSupportsClipboardRead();

  const [ascii, setAscii] = useLocalState<string | void>({
    key: 'base64Ascii',
    defaultValue: '',
  });

  const [base64, setBase64] = useLocalState<string | void>({
    key: 'base64Base64',
    defaultValue: '',
  });

  const [isError, setIsError] = React.useState(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<string>('success');

  function convertToAscii(value = base64) {
    try {
      setIsError(false);
      setAscii(decode(value || ''));
    } catch (e) {
      setIsError(true);
    }
  }

  function convertToBase64(value = ascii) {
    setIsError(false);
    setBase64(encode(value || ''));
  }

  function calculateAscii(value: string | void) {
    setBase64(value);
    if (!value) {
      setAscii('');
    }
    convertToAscii(value);
  }

  function calculateBase64(value: string | void) {
    setAscii(value);
    if (!value) {
      setBase64('');
    }
    convertToBase64(value);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    if (name === 'ascii') {
      calculateBase64(value);
    } else {
      calculateAscii(value);
    }
  }

  return (
    <Layout title='Base64'>
      <Heading>Base64</Heading>
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
            label='ASCII'
            value={ascii}
            name='ascii'
            onChange={handleChange}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
            gap={2}
          >
            <Button
              startIcon={<ClearIcon />}
              disabled={!ascii}
              onClick={() => {
                setAscii('');
                setBase64('');
              }}
            >
              Clear
            </Button>
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!ascii}
              onClick={() => {
                navigator.clipboard.writeText(ascii || '').then(
                  () => {
                    setAlertMessage('Copied to clipboard');
                    setAlertSeverity('success');
                    setAlertOpen(true);
                  },
                  () => {
                    setAlertMessage('Failed to copy to clipboard');
                    setAlertSeverity('error');
                    setAlertOpen(true);
                  },
                );
              }}
            >
              Copy
            </Button>
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setAscii(text);
                    calculateBase64(text);
                  }
                }}
              >
                Paste
              </Button>
            )}
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <TextField
            multiline
            label='Base64'
            value={base64}
            name='base64'
            onChange={handleChange}
            error={isError}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
            gap={2}
          >
            <Button
              startIcon={<ClearIcon />}
              disabled={!base64}
              onClick={() => {
                setBase64('');
                setAscii('');
              }}
            >
              Clear
            </Button>
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!base64}
              onClick={() => {
                navigator.clipboard.writeText(base64 || '').then(
                  () => {
                    setAlertMessage('Copied to clipboard');
                    setAlertSeverity('success');
                    setAlertOpen(true);
                  },
                  () => {
                    setAlertMessage('Failed to copy to clipboard');
                    setAlertSeverity('error');
                    setAlertOpen(true);
                  },
                );
              }}
            >
              Copy
            </Button>
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setBase64(text);
                    calculateAscii(text);
                  }
                }}
              >
                Paste
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          variant='filled'
          severity={alertSeverity as 'success' | 'error'}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
}
