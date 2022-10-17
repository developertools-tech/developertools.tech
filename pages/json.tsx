import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useCallback, useEffect, useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import nextI18NextConfig from '../next-i18next.config.js';

const errorRegexFirefox = /line ([0-9]+) column ([0-9]+)/;
const errorRegexChrome = /at position ([0-9]+)/;

export default function JsonPage() {
  const { t } = useTranslation(['common', 'jsonFormat']);
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
  const [output, setOutput] = useLocalState<string | void>({
    key: 'jsonOutput',
    defaultValue: '',
  });

  const processJson = useCallback(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const data = JSON.parse(input);
      setOutput(JSON.stringify(data, null, 2));
      setError('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
      setOutput('');
      const result = errorRegexFirefox.exec(e.message);
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
      } else {
        const chromeResult = errorRegexChrome.exec(e.message);
        if (chromeResult) {
          let positionCur = 0;
          let found = false;
          let outputText = '';
          const positionTarget = +chromeResult[1];
          const lines = input.split('\n');
          for (const line of lines) {
            positionCur += line.split('').length;
            if (!found && positionCur >= positionTarget) {
              found = true;
              outputText += `<span class="bad-line">${line}</span>\n`;
            } else {
              outputText += `${line}\n`;
            }
            positionCur += 1;
          }
          setOutput(outputText);
        }
      }
    }
  }, [input, setOutput]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  useEffect(() => {
    processJson();
  }, [input, processJson]);

  return (
    <Layout title='JSON'>
      <Heading>JSON</Heading>
      <Typography
        paragraph
        textAlign='center'
      >
        {t('jsonFormat:description')}
      </Typography>
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
            label={t('jsonFormat:input')}
            value={input}
            name='input'
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
              {t('common:clear')}
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
              {t('common:copy')}
            </Button>
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setInput(text);
                    processJson();
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
                  output ||
                  `<span class="placeholder">${t(
                    'jsonFormat:output',
                  )}</span>`,
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
              {t('common:clear')}
            </Button>
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!output}
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
              {t('common:copy')}
            </Button>
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setInput(text);
                    processJson();
                  }
                }}
              >
                {t('common:paste')}
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

const i18nextNameSpaces: Namespace[] = ['common', 'jsonFormat'];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale!,
    i18nextNameSpaces as string[],
    nextI18NextConfig,
    ['en', 'ja'],
  );
  return {
    props: { ...translation },
    revalidate: 3600,
  };
};