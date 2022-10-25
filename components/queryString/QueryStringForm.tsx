import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import { ToastProps } from '../Toast';
import QueryParamsForm, {
  defaultParams,
  QueryParams,
} from './QueryParamsForm';

export interface QueryStringFormProps {
  queryString: string | void;
  queryParams: QueryParams;
  error: string;
  setQueryString: (_queryString: string | void) => void;
  setQueryParams: (_queryParams: QueryParams) => void;
  setError: (_error: string) => void;
  setToastMessage: (_toastMessage: string) => void;
  setToastOpen: (_toastOpen: boolean) => void;
  setToastSeverity: (_toastSeverity: ToastProps['severity']) => void;
}

export default function QueryStringForm({
  queryString,
  setQueryString,
  queryParams,
  setQueryParams,
  error,
  setError,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: QueryStringFormProps) {
  const supportsClipboardRead = useSupportsClipboardRead();
  const { t } = useTranslation(['queryString', 'common']);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setQueryString(value);
    const newParams: QueryParams = [];
    const params = new URLSearchParams(value.split('?')?.[1] || value);
    params.forEach((val, key) => {
      newParams.push({
        param: key,
        value: val,
        key: `${Math.random() * 100}`,
      });
    });
    newParams.push({ param: '', value: '', key: 'last' });
    setQueryParams(newParams);
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
          label='Query String'
          name='queryString'
          onChange={handleChange}
          value={queryString}
        />
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!queryString}
            onClick={() => {
              setQueryString('');
              setQueryParams(defaultParams);
            }}
          >
            {t('common:clear')}
          </Button>
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!queryString}
            name='Copy'
            onClick={() => {
              navigator.clipboard.writeText(queryString || '').then(
                () => {
                  setToastMessage('Copied to clipboard');
                  setToastSeverity('success');
                  setToastOpen(true);
                },
                () => {
                  setToastMessage('Failed to copy to clipboard');
                  setToastSeverity('error');
                  setError('Failed to copy to clipboard');
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
                  setQueryString(text);
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
              data-testid='querySring-error'
            >
              {error}
            </Typography>
          </pre>
        )}
      </Box>

      <QueryParamsForm
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        setQueryString={setQueryString}
      />
    </Box>
  );
}
