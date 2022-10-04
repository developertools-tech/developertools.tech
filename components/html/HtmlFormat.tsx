import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';
import React from 'react';

import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import type { ToastProps } from '../Toast';

export interface HtmlFormatProps {
  html: string | void;
  formattedHtml: string | void;
  error: string;
  setHtml: (_html: string | void) => void;
  setFormattedHtml: (_formattedHtml: string | void) => void;
  setError: (_error: string) => void;
  setToastMessage: (_toastMessage: string) => void;
  setToastOpen: (_toastOpen: boolean) => void;
  setToastSeverity: (_toastSeverity: ToastProps['severity']) => void;
}

export default function HtmlFormat({
  html,
  formattedHtml,
  error,
  setHtml,
  setFormattedHtml,
  setError,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: HtmlFormatProps) {
  const supportsClipboardRead = useSupportsClipboardRead();
  function calculateFormattedHtml(value: string | void) {
    setHtml(value);
    if (!value) {
      setFormattedHtml('');
    }
    try {
      const formatted = prettier.format(value ?? '', {
        parser: 'html',
        plugins: [parserHtml],
      });

      setError('');
      setFormattedHtml(formatted);
    } catch (e: unknown) {
      setError((e as { message: string })?.message ?? '');
      setFormattedHtml('');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    if (name === 'html') {
      calculateFormattedHtml(value);
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
          label='HTML'
          name='html'
          onChange={handleChange}
          value={html}
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!html}
            onClick={() => {
              setHtml('');
              setFormattedHtml('');
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
                  setHtml(text);
                  calculateFormattedHtml(text);
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
              data-testid='html-error'
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
          label='FormattedHTML'
          name='formattedHtml'
          value={formattedHtml}
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!formattedHtml}
            onClick={() => {
              setFormattedHtml('');
              setHtml('');
            }}
          >
            Clear
          </Button>
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!formattedHtml}
            name='Copy'
            onClick={() => {
              navigator.clipboard.writeText(formattedHtml || '').then(
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
