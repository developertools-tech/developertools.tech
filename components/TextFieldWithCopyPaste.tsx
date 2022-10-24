import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import Toast, { ToastProps } from './Toast';

export type TextFieldWithCopyPasteProps = {
  hasCopy: boolean;
  label: string;
  value: string;
  onClearClick?: () => void;
  onPasteCleck?: (text: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

export default function TextFieldWithCopyPaste(
  props: TextFieldWithCopyPasteProps,
) {
  const {
    hasCopy,
    label,
    value,
    onClearClick,
    onPasteCleck,
    onChange,
    onBlur,
  } = props;

  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const { t } = useTranslation('common');
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
    >
      <TextField
        multiline
        label={label}
        value={value}
        name={label}
        onChange={onChange}
        onBlur={onBlur}
        disabled={onChange === undefined}
      />
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='end'
        gap={2}
      >
        {!!onClearClick && (
          <Button
            startIcon={<ClearIcon />}
            disabled={!value}
            onClick={onClearClick}
          >
            {t('clear')}
          </Button>
        )}
        {hasCopy && (
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!value}
            onClick={() => {
              navigator.clipboard.writeText(value || '').then(
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
            {t('copy')}
          </Button>
        )}
        {!!supportsClipboardRead && !!onPasteCleck && (
          <Button
            startIcon={<ContentPasteGoIcon />}
            onClick={async () => {
              const text = await navigator.clipboard.readText();
              if (text) {
                onPasteCleck?.(text);
              }
            }}
          >
            {t('paste')}
          </Button>
        )}
      </Box>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Box>
  );
}
