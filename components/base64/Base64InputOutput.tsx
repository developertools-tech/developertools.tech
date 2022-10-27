import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { decode, encode } from 'js-base64';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import type { ToastProps } from '../Toast';

export interface Base64InputOutputProps {
  ascii: string | void;
  base64: string | void;
  isError: boolean;
  setAscii: (_ascii: string | void) => void;
  setBase64: (_base64: string | void) => void;
  setIsError: (_isError: boolean) => void;
  setToastMessage: (_toastMessage: string) => void;
  setToastOpen: (_toastOpen: boolean) => void;
  setToastSeverity: (_toastSeverity: ToastProps['severity']) => void;
}

export default function Base64InputOutput({
  ascii,
  base64,
  isError,
  setAscii,
  setBase64,
  setIsError,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: Base64InputOutputProps) {
  const supportsClipboardRead = useSupportsClipboardRead();
  const { t } = useTranslation(['common', 'base64']);

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
          label={t('base64:ascii')}
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
            {t('common:clear')}
          </Button>
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!ascii}
            onClick={() => {
              navigator.clipboard.writeText(ascii || '').then(
                () => {
                  setToastMessage(t('common:copiedToClipboard'));
                  setToastSeverity('success');
                  setToastOpen(true);
                },
                () => {
                  setToastMessage(t('common:failedToCopyToClipboard'));
                  setToastSeverity('error');
                  setToastOpen(true);
                },
              );
            }}
          >
            {t('common:copy')}
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
              {t('common:paste')}
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
          label={t('base64:title')}
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
            {t('common:clear')}
          </Button>
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!base64}
            onClick={() => {
              navigator.clipboard.writeText(base64 || '').then(
                () => {
                  setToastMessage(t('common:copiedToClipboard'));
                  setToastSeverity('success');
                  setToastOpen(true);
                },
                () => {
                  setToastMessage(t('common:failedToCopyToClipboard'));
                  setToastSeverity('error');
                  setToastOpen(true);
                },
              );
            }}
          >
            {t('common:copy')}
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
              {t('common:paste')}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
