import Box from '@mui/material/Box';
import Button, { ButtonTypeMap } from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { useState } from 'react';
import Toast, { ToastProps } from './Toast';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

type Props = {
  isCopy: boolean;
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  onClearClick: () => void;
  onPasteCleck: (text: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextFieldWithCopyOrPaste(props: Props) {
  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  let copyOrPaste: false | JSX.Element;
  if (props.isCopy) {
    copyOrPaste = (
      <Button
        startIcon={<ContentCopyIcon />}
        disabled={!props.value}
        onClick={() => {
          navigator.clipboard.writeText(props.value || '').then(
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
    copyOrPaste = !!supportsClipboardRead && (
      <Button
        startIcon={<ContentPasteGoIcon />}
        onClick={async () => {
          const text = await navigator.clipboard.readText();
          if (text) {
            props.onPasteCleck(text);
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
        label={props.label}
        value={props.value}
        name={props.label}
        onChange={props.onChange}
      />
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='end'
        gap={2}
      >
        <Button
          startIcon={<ClearIcon />}
          disabled={!props.value}
          onClick={props.onClearClick}
        >
          Clear
        </Button>
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
