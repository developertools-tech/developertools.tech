import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import nextI18NextConfig from '../next-i18next.config.js';

export default function URLEncodeDecode() {
  const supportsClipboardRead = useSupportsClipboardRead();
  const [encoded, setEncoded] = useLocalState<string>({
    key: 'urlEncode',
    defaultValue: '',
  });
  const [decoded, setDecoded] = useLocalState<string>({
    key: 'urlDecode',
    defaultValue: '',
  });
  const [decodeError, setDecodeError] = useLocalState<boolean>({
    key: 'urlDecodeError',
    defaultValue: false,
  });

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  const handleClear = () => {
    setEncoded('');
    setDecoded('');
  };

  const handlePasteEncode = async () => {
    const textCopied = await navigator.clipboard.readText();
    setEncoded(textCopied);
    setDecoded(decodeURIComponent(textCopied));
  };

  const handlePasteDecode = async () => {
    const textCopied = await navigator.clipboard.readText();
    setDecoded(textCopied);
    setEncoded(encodeURIComponent(textCopied));
  };
  const { t } = useTranslation(['common', 'urlEncode']);

  return (
    <Layout title={t('urlEncode:title')}>
      <Typography paragraph>{t('urlEncode:description')}</Typography>

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
        >
          <TextField
            label={t('urlEncode:decoded')}
            value={decoded}
            onChange={(e) => {
              setDecoded(e.target.value);
              setEncoded(encodeURIComponent(e.target.value));
            }}
            multiline
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
          >
            <Button
              disabled={!decoded}
              startIcon={<ClearIcon />}
              onClick={handleClear}
            >
              {t('common:clear')}
            </Button>
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!decoded}
              onClick={() => {
                navigator.clipboard.writeText(decoded || '').then(
                  () => {
                    setToastMessage(t('common:copiedToClipboard'));
                    setToastSeverity('success');
                    setToastOpen(true);
                  },
                  () => {
                    setToastMessage(
                      t('common:failedToCopyToClipboard'),
                    );
                    setToastSeverity('error');
                    setToastOpen(true);
                  },
                );
              }}
            >
              {t('common:copy')}
            </Button>

            {supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handlePasteDecode}
              >
                {t('common:paste')}
              </Button>
            )}
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
        >
          <TextField
            label={t('urlEncode:encoded')}
            value={encoded}
            onChange={(e) => {
              setEncoded(e.target.value);

              try {
                setDecoded(decodeURIComponent(e.target.value));
                setDecodeError(false);
              } catch {
                setDecodeError(true);
              }
            }}
            multiline
          />
          <Box
            display='flex'
            alignItems='center'
            flexWrap='wrap'
            justifyContent='end'
          >
            <Button
              disabled={!encoded}
              startIcon={<ClearIcon />}
              onClick={handleClear}
            >
              {t('common:clear')}
            </Button>
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!encoded}
              onClick={() => {
                navigator.clipboard.writeText(encoded || '').then(
                  () => {
                    setToastMessage(t('common:copiedToClipboard'));
                    setToastSeverity('success');
                    setToastOpen(true);
                  },
                  () => {
                    setToastMessage(
                      t('common:failedToCopyToClipboard'),
                    );
                    setToastSeverity('error');
                    setToastOpen(true);
                  },
                );
              }}
            >
              {t('common:copy')}
            </Button>

            {supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handlePasteEncode}
              >
                {t('common:paste')}
              </Button>
            )}
          </Box>
          {decodeError && (
            <Typography
              textAlign='right'
              variant='caption'
              color={red[500]}
            >
              {t('urlEncode:errorMsg')}
            </Typography>
          )}
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

const i18nextNameSpaces: Namespace[] = ['common', 'urlEncode'];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale || 'en',
    i18nextNameSpaces as string[],
    nextI18NextConfig,
  );
  return {
    props: { ...translation },
  };
};
