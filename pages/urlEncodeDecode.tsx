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
  const [text, setText] = useLocalState<string>({
    key: 'urlEncodeDecodeText',
    defaultValue: '',
  });
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

  const handleEncode = () => {
    setEncoded(encodeURIComponent(text));
  };

  const handleDecode = () => {
    setDecoded(decodeURIComponent(text));
  };

  const handleClear = () => {
    setText('');
    setEncoded('');
    setDecoded('');
  };

  const handlePaste = async () => {
    const textCopied = await navigator.clipboard.readText();
    setText(textCopied);
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
          gap={2}
        >
          <TextField
            label='Text'
            data-testid='Text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
            gap={2}
          >
            <Button
              name='Encode'
              onClick={handleEncode}
              disabled={!text}
            >
              Encode
            </Button>
            <Button
              name='Decode'
              onClick={handleDecode}
              disabled={!text}
            >
              Decode
            </Button>
            <Button
              startIcon={<ClearIcon />}
              onClick={handleClear}
              disabled={!text}
            >
              Clear
            </Button>
            {supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handlePaste}
              >
                Paste
              </Button>
            )}
          </Box>
        </Box>

        <TextField
          label='Encoded'
          data-testid='Output - Encoded'
          value={encoded}
          onChange={(e) => setEncoded(e.target.value)}
          multiline
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!text}
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
        </Box>
        <TextField
          label='Decoded'
          data-testid='Output - Decoded'
          value={decoded}
          onChange={(e) => setDecoded(e.target.value)}
          multiline
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!text}
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
