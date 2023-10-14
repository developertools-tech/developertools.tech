import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Secret, TOTP } from 'otpauth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';

import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import type { ToastProps } from '../Toast';

export interface TotpProps {
  secret: string;
  uri: string;
  error: string;
  setSecret: (_secret: string) => void;
  setUri: (_uri: string) => void;
  setError: (_error: string) => void;
  setToastMessage: (_toastMessage: string) => void;
  setToastOpen: (_toastOpen: boolean) => void;
  setToastSeverity: (_toastSeverity: ToastProps['severity']) => void;
}

export default function Totp({
  error,
  secret,
  uri,
  setSecret,
  setUri,
  setError,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: TotpProps) {
  const supportsClipboardRead = useSupportsClipboardRead();
  const { t } = useTranslation(['totp', 'common']);
  const [totp, setTotp] = useState<TOTP>();
  const [secretInput, setSecretInput] = useState(secret);
  const [token, setToken] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (totp) {
        const timestamp = new Date().getTime();
        setToken(totp.generate({ timestamp }));
      } else {
        setToken('');
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [setToken, secret, totp]);

  useEffect(() => {
    if (totp) {
      setUri(totp.toString());
    }
  }, [totp, setUri]);

  useEffect(() => {
    setSecret(secretInput);
    if (!secretInput) {
      setUri('');
      setTotp(undefined);
      setToken('');
    } else {
      try {
        const tokenGenerator = new TOTP({
          issuer: 'DevTools',
          label: 'TOTPTest',
          algorithm: 'SHA1',
          digits: 6,
          period: 30,
          secret: Secret.fromUTF8(secretInput),
        });
        setTotp(tokenGenerator);
        setToken(tokenGenerator.generate());
        setError('');
      } catch (e: unknown) {
        setError((e as { message: string })?.message ?? '');
        setUri('');
      }
    }
  }, [secretInput, setError, setSecret, setUri]);

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
          label={t('secretLabel')}
          name='secret'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSecretInput(e.target.value)
          }
          value={secretInput}
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!secret}
            onClick={() => {
              setSecret('');
              setSecretInput('');
              setToken('');
              setUri('');
            }}
          >
            {t('common:clear')}
          </Button>
          {!!supportsClipboardRead && (
            <Button
              startIcon={<ContentPasteGoIcon />}
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                if (text) {
                  setSecretInput(text);
                }
              }}
            >
              {t('common:paste')}
            </Button>
          )}
        </Box>
        {error && (
          <pre>
            <Typography
              paragraph
              color='#ff6246'
              data-testid='totp-error'
            >
              {error}
            </Typography>
          </pre>
        )}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <TextField
            multiline
            label={t('uriLabel')}
            name='uri'
            value={uri}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
            gap={2}
          >
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!uri}
              name='Copy'
              onClick={() => {
                navigator.clipboard.writeText(uri || '').then(
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
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <TextField
            multiline
            label={t('tokenLabel')}
            name='token'
            value={token}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
            gap={2}
          >
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!token}
              name='Copy'
              onClick={() => {
                navigator.clipboard.writeText(token || '').then(
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
          </Box>
        </Box>
        {uri && (
          <Box
            padding={4}
            bgcolor='white'
          >
            <QRCode
              size={256}
              style={{
                height: 'auto',
                maxWidth: '100%',
                width: '100%',
              }}
              value={uri}
              viewBox='0 0 256 256'
              data-testid='qr-code'
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
