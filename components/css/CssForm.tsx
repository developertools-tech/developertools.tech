import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { minify } from 'csso';
import prettier from 'prettier';
import parserCss from 'prettier/parser-postcss';
import React from 'react';
import useLocale from '../../hooks/useLocale';

import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import type { ToastProps } from '../Toast';

export interface CssFormProps {
  css: string | void;
  formattedCss: string | void;
  error: string;
  minifyCss: boolean;
  setCss: (_css: string | void) => void;
  setFormattedCss: (_formattedCss: string | void) => void;
  setError: (_error: string) => void;
  setMinifyCss: (_minifyCss: boolean) => void;
  setToastMessage: (_toastMessage: string) => void;
  setToastOpen: (_toastOpen: boolean) => void;
  setToastSeverity: (_toastSeverity: ToastProps['severity']) => void;
}

export default function CssForm({
  css,
  formattedCss,
  error,
  minifyCss,
  setCss,
  setFormattedCss,
  setError,
  setMinifyCss,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: CssFormProps) {
  const supportsClipboardRead = useSupportsClipboardRead();
  const texts = useLocale();
  function calculateFormattedCss(
    value: string | void,
    minification: boolean | false,
  ) {
    setCss(value);
    if (!value) {
      setFormattedCss('');
    }
    try {
      const formatted = prettier.format(value ?? '', {
        parser: 'css',
        plugins: [parserCss],
      });

      if (minification) {
        const minified = minify(formatted).css;
        setFormattedCss(minified);
      } else {
        setFormattedCss(formatted);
      }
      setError('');
    } catch (e: unknown) {
      setError((e as { message: string })?.message ?? '');
      setFormattedCss('');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    if (name === 'css') {
      calculateFormattedCss(value, minifyCss);
    }
    if (name === 'minifySwitch') {
      calculateFormattedCss(css, !minifyCss);
      setMinifyCss(!minifyCss);
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
          label='CSS'
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
            {texts.common.clear}
          </Button>
          {!!supportsClipboardRead && (
            <Button
              startIcon={<ContentPasteGoIcon />}
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                if (text) {
                  setCss(text);
                  calculateFormattedCss(text, minifyCss);
                }
              }}
            >
              {texts.common.paste}
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
      <Grid
        component='label'
        container
        alignItems='center'
        spacing={1}
      >
        <Grid item>{texts.css.format}</Grid>
        <Grid item>
          <Switch
            checked={minifyCss}
            name='minifySwitch'
            onChange={handleChange}
          />
        </Grid>
        <Grid item>{texts.css.minify}</Grid>
      </Grid>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <TextField
          multiline
          label={
            minifyCss ? texts.css.minifiedCss : texts.css.formattedCss
          }
          name='outputCss'
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
            {texts.common.clear}
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
            {texts.common.copy}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
