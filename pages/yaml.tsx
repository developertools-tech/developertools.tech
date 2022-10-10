import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import YAML from 'yaml';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

const errorRegex = /line ([0-9]+), column ([0-9]+)/;

export default function YamlPage() {
  const supportsClipboardRead = useSupportsClipboardRead();

  const [error, setError] = React.useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const [input, setInput] = useLocalState<string | void>({
    key: 'yamlInput',
    defaultValue: '',
  });
  const [output, setOutput] = useLocalState<string | void>({
    key: 'yamlOutput',
    defaultValue: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClickCopyButton = (text: string | void) => {
    navigator.clipboard.writeText(text || '').then(
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
  };

  const handleClickPasteButton = async () => {
    const text = await navigator.clipboard.readText();
    if (text) {
      setInput(text);
    }
  };

  const processYaml = useCallback(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const data = YAML.parse(input);
      setOutput(YAML.stringify(data));
      setError('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setOutput('');
      const result = errorRegex.exec(err.message);
      if (result) {
        const lineNumber = result[1];
        const columnNumber = result[2];
        const lines = input.split('\n');
        let outputText = '';
        for (const index in lines) {
          if ({}.hasOwnProperty.call(lines, index)) {
            const line = lines[index];
            if (+index + 1 === +lineNumber) {
              let markedLine = '';
              for (const letterIndex in line.split('')) {
                if ({}.hasOwnProperty.call(line, letterIndex)) {
                  const letter = line[letterIndex];
                  if (+letterIndex + 1 === +columnNumber) {
                    markedLine += `<span class="bad-letter">${letter}</span>`;
                  } else {
                    markedLine += letter;
                  }
                }
              }
              outputText += `<span class="bad-line">${markedLine}</span>\n`;
            } else {
              outputText += `${line}\n`;
            }
          }
        }
        setOutput(outputText);
      }
    }
  }, [input, setOutput]);

  useEffect(() => {
    processYaml();
  }, [input, processYaml]);

  return (
    <Layout title='YAML'>
      <Box textAlign='center'>
        <Heading>YAML</Heading>
        <Typography paragraph>
          Paste or type YAML to validate and format it.
        </Typography>
      </Box>
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
            label='Input'
            name='input'
            value={input}
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
              onClick={() => handleClickCopyButton(input)}
            >
              Copy
            </Button>
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handleClickPasteButton}
              >
                Paste
              </Button>
            )}
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
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
              data-testid='json-output'
              dangerouslySetInnerHTML={{
                __html:
                  output || '<span class="placeholder">Output</span>',
              }}
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
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
              disabled={!output}
              onClick={() => handleClickCopyButton(output)}
            >
              Copy
            </Button>
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handleClickPasteButton}
              >
                Paste
              </Button>
            )}
          </Box>
        </Box>
        <Typography
          color='#ff6246'
          paragraph
          data-testid='json-error'
        >
          {error}
        </Typography>
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
