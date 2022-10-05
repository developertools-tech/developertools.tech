import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import prettier from 'prettier';
import parserCss from 'prettier/parser-postcss';
import React from 'react';

import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import type { ToastProps } from '../Toast';

export interface MinifyCssProps {
  css: string | void;
  formattedCss: string | void;
  error: string;
  setCss: (_css: string | void) => void;
  setFormattedCss: (_formattedCss: string | void) => void;
  setError: (_error: string) => void;
  setToastMessage: (_toastMessage: string) => void;
  setToastOpen: (_toastOpen: boolean) => void;
  setToastSeverity: (_toastSeverity: ToastProps['severity']) => void;
}

export default function MinifyCss({
  css,
  formattedCss,
  error,
  setCss,
  setFormattedCss,
  setError,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: MinifyCssProps) {
  const supportsClipboardRead = useSupportsClipboardRead();
  function calculateFormattedCss(value: string | void) {
    setCss(value);
    if (!value) {
      setFormattedCss('');
    }
    try {
      const formatted = prettier.format(value ?? '', {
        parser: 'css',
        plugins: [parserCss],
      });

      setError('');
      setFormattedCss(formatted);
    } catch (e: unknown) {
      setError((e as { message: string })?.message ?? '');
      setFormattedCss('');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    if (name === 'css') {
      calculateFormattedCss(value);
    }
  }

  return (
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
          error={error.length > 0}
          label='Css'
          name='css'
          onChange={handleChange}
          value={css}
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!css}
            onClick={() => {
              setCss('');
              setFormattedCss('');
            }}
          >
            Clear
          </Button>
          {!!supportsClipboardRead && (
            <Button
              startIcon={<ContentPasteGoIcon />}
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                if (text) {
                  setCss(text);
                  calculateFormattedCss(text);
                }
              }}
            >
              Paste
            </Button>
          )}
        </Box>
        {error && (
          <pre>
            <Typography
              paragraph
              color='#ff6246'
              data-testid='css-error'
            >
              {error}
            </Typography>
          </pre>
        )}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <TextField
          multiline
          label='FormattedCss'
          name='formattedCss'
          value={formattedCss}
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!formattedCss}
            onClick={() => {
              setFormattedCss('');
              setCss('');
            }}
          >
            Clear
          </Button>
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!formattedCss}
            name='Copy'
            onClick={() => {
              navigator.clipboard.writeText(formattedCss || '').then(
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
    </Box>
  );
}
