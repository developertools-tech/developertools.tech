import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

export default function URLEncodeDecode() {
  const supportsClipboardRead = useSupportsClipboardRead();
  const [encoded, setEncoded] = useLocalState<string>({
    key: 'urlEncode',
    defaultValue: '',
  });
  const [decoded, setDecoded] = useLocalState<string>({
    key: 'urlDecode',
    defaultValue: '',
  });

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  const handleClear = () => {
    setEncoded('');
    setDecoded('');
  };

  const handlePasteEncode = async () => {
    const textCopied = await navigator.clipboard.readText();
    setEncoded(textCopied);
    setDecoded(decodeURIComponent(textCopied));
  };

  const handlePasteDecode = async () => {
    const textCopied = await navigator.clipboard.readText();
    setDecoded(textCopied);
    setEncoded(encodeURIComponent(textCopied));
  };

  return (
    <Layout>
      <Heading>URL Encode/Decode</Heading>
      <Typography paragraph>
        Paste or Type an URL to Encode or Decode it
      </Typography>

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
        >
          <TextField
            label='Encoded'
            value={encoded}
            onChange={(e) => {
              setDecoded(decodeURIComponent(e.target.value));
              setEncoded(e.target.value);
            }}
            multiline
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
          >
            <Button
              startIcon={<ClearIcon />}
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!encoded}
              onClick={() => {
                navigator.clipboard.writeText(encoded || '').then(
                  () => {
                    setToastMessage('Copied to clipboard');
                    setToastSeverity('success');
                    setToastOpen(true);
                  },
                  () => {
                    setToastMessage('Failed to copy to clipboard');
                    setToastSeverity('error');
                    setToastOpen(true);
                  },
                );
              }}
            >
              Copy
            </Button>

            {supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handlePasteEncode}
              >
                Paste
              </Button>
            )}
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
        >
          <TextField
            label='Decoded'
            value={decoded}
            onChange={(e) => {
              setDecoded(e.target.value);
              setEncoded(encodeURIComponent(e.target.value));
            }}
            multiline
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
          >
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!decoded}
              onClick={() => {
                navigator.clipboard.writeText(decoded || '').then(
                  () => {
                    setToastMessage('Copied to clipboard');
                    setToastSeverity('success');
                    setToastOpen(true);
                  },
                  () => {
                    setToastMessage('Failed to copy to clipboard');
                    setToastSeverity('error');
                    setToastOpen(true);
                  },
                );
              }}
            >
              Copy
            </Button>

            {supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handlePasteDecode}
              >
                Paste
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Layout>
  );
}
