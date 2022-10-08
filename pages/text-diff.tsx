import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Diff from 'diff';
import React, { useEffect, useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

export default function TextDiffPage() {
  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const [input1, setInput1] = useLocalState<string>({
    key: 'textInput',
    defaultValue: '',
  });
  const [input2, setInput2] = useLocalState<string>({
    key: 'textInput',
    defaultValue: '',
  });
  const [output, setOutput] = useLocalState<string | void>({
    key: 'textOutput',
    defaultValue: '',
  });

  function handleChange1(event: React.ChangeEvent<HTMLInputElement>) {
    setInput1(event.target.value);
  }
  function handleChange2(event: React.ChangeEvent<HTMLInputElement>) {
    setInput2(event.target.value);
  }

  const diff = Diff.diffChars(input1, input2);

  function compare() {
    let value = '';
    diff.forEach((part) => {
      // green for additions, red for deletions
      // grey for common parts

      let clr = 'grey';
      if (part.added) {
        clr = 'green';
      } else if (part.removed) {
        clr = 'red';
      } else {
        clr = 'grey';
      }

      value += `<span style="color:${clr}">${part.value}</span>`;
    });
    setOutput(value);
  }

  useEffect(() => {
    if (!input1 || !input2) {
      setOutput('');
    } else {
      compare();
    }
  }, [input1, input2, compare, setOutput]);

  return (
    <Layout title='Text Difference'>
      <Heading>Text Diff</Heading>
      <Typography
        paragraph
        textAlign='center'
      >
        Paste the texts to check the difference.
      </Typography>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        paddingBottom={2}
        width={1000}
        maxWidth='100%'
      >
        <Box
          display='flex'
          flexDirection='column'
          width={{ xs: '100%', sm: '45%' }}
        >
          <TextField
            multiline
            label='Text1'
            value={input1}
            name='first text'
            onChange={handleChange1}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            gap={2}
          >
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setInput1(text);
                  }
                }}
              >
                Paste
              </Button>
            )}
            <Button
              startIcon={<ClearIcon />}
              disabled={!input1}
              onClick={() => {
                setInput1('');
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          width={{ xs: '100%', sm: '45%' }}
        >
          <TextField
            multiline
            label='Text2'
            value={input2}
            name='second text'
            onChange={handleChange2}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            gap={2}
          >
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setInput2(text);
                  }
                }}
              >
                Paste
              </Button>
            )}
            <Button
              startIcon={<ClearIcon />}
              disabled={!input2}
              onClick={() => {
                setInput2('');
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='stretch'
        width={1000}
        maxWidth='100%'
        gap={2}
      >
        <Box
          padding='16.5px 14px'
          borderRadius='4px'
          border='1px solid #494949'
          sx={{
            '& .bad-line': {
              backgroundColor: '#ff330050',
            },
            '& .bad-letter': {
              backgroundColor: '#ff000080',
            },
            '& pre': {
              fontsize: '1rem',
              lineHeight: '1.4375em',
              letterSpacing: '0.00938em',
            },
            '& .placeholder': {
              opacity: 0.7,
            },
          }}
        >
          {/* eslint-disable react/no-danger */}
          <pre
            data-testid='text-difference-output'
            dangerouslySetInnerHTML={{
              __html:
                output || '<span class="placeholder">Difference</span>',
            }}
          />
          {/* eslint-enable react/no-danger */}
        </Box>
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ContentCopyIcon />}
            onClick={() => {
              navigator.clipboard.writeText(output || '').then(
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
