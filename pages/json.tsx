import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import jsonFix from 'json-fixer-browser';
import jsonFormat from 'json-format';
import React, { useCallback, useState } from 'react';

import Editor from '../components/Editor';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

export default function JsonPage() {
  const supportsClipboardRead = useSupportsClipboardRead();

  const [error, setError] = React.useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const [input, setInput] = useLocalState<string | void>({
    key: 'jsonInput',
    defaultValue: '',
  });

  const handleFormat = useCallback(() => {
    setError('');
    if (input) {
      try {
        const { data } = jsonFix(input);
        const formatted = jsonFormat(data, { type: 'space', size: 2 });
        setInput(formatted);
      } catch (_e) {
        try {
          JSON.parse(input);
        } catch (e) {
          /* @ts-expect-error : error object is of type unknown */
          setError(e?.message || 'Unknown error');
        }
      }
    }
  }, [input, setInput]);

  function handleChange(value: string) {
    if (!value) setError('');
    setInput(value || '');
  }

  return (
    <Layout title='JSON'>
      <Heading>JSON</Heading>
      <Typography
        paragraph
        textAlign='center'
      >
        Paste or type JSON to validate and format it.
      </Typography>
      <Editor
        value={input || ''}
        extensions={['json']}
        onChange={handleChange}
      />
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='end'
        gap={2}
        my={2}
      >
        <Button
          startIcon={<ClearIcon />}
          disabled={!input}
          onClick={() => {
            setInput('');
          }}
        >
          Clear
        </Button>
        <Button
          startIcon={<ContentCopyIcon />}
          disabled={!input}
          onClick={() => {
            navigator.clipboard.writeText(input || '').then(
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
        {!!supportsClipboardRead && (
          <Button
            startIcon={<ContentPasteGoIcon />}
            onClick={async () => {
              const text = await navigator.clipboard.readText();
              if (text) {
                setInput(text);
                handleFormat();
              }
            }}
          >
            Paste
          </Button>
        )}
        <Button
          startIcon={<PlayArrowIcon />}
          disabled={!input}
          onClick={handleFormat}
        >
          Format
        </Button>
      </Box>
      <Typography
        color='#ff6246'
        paragraph
        data-testid='json-error'
      >
        {error}
      </Typography>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Layout>
  );
}
