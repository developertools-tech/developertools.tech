import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import Toast, { ToastProps } from './Toast';

type Props = {
  isCopy: boolean;
  label: string;
  value: string;
  onClearClick?: () => void;
  onPasteCleck?: (text: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextFieldWithCopyOrPaste(props: Props) {
  const { isCopy, label, value, onClearClick, onPasteCleck, onChange } =
    props;

  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  let copyOrPaste: false | JSX.Element;
  if (isCopy) {
    copyOrPaste = (
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
        Copy
      </Button>
    );
  } else {
    copyOrPaste = !!supportsClipboardRead && !!onPasteCleck && (
      <Button
        startIcon={<ContentPasteGoIcon />}
        onClick={async () => {
          const text = await navigator.clipboard.readText();
          if (text) {
            onPasteCleck?.(text);
          }
        }}
      >
        Paste
      </Button>
    );
  }

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
            Clear
          </Button>
        )}
        {copyOrPaste}
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
