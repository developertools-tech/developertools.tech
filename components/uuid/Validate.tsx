import ClearIcon from '@mui/icons-material/Clear';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validate, version } from 'uuid';

import useLocalState from '../../hooks/useLocalState';
import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';

export default function UuidValidate() {
  const { t } = useTranslation(['common', 'uuid']);
  const supportsClipboardRead = useSupportsClipboardRead();

  const [validateResult, setValidateResult] = useState<string>('');
  const [validateError, setValidateError] = useState<boolean>(false);
  const [validateUuid, setValidateUuid] = useLocalState<string>({
    key: 'uuidValidate',
    defaultValue: '',
  });

  function runUuidValidation(value: string) {
    if (!value) {
      setValidateResult('');
      setValidateError(false);
      return;
    }

    if (validate(value)) {
      setValidateResult(`${t('uuid:validUuid')} v${version(value)}`);
      setValidateError(false);
      return;
    }

    setValidateResult(t('uuid:invalidUuid'));
    setValidateError(true);
  }

  function handleValidateChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setValidateUuid(event.target.value);
    runUuidValidation(event.target.value);
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='flex-end'
      gap={2}
      width={350}
      maxWidth='calc(100% - 48px)'
    >
      <Typography
        textAlign='center'
        component='h2'
        alignSelf='center'
      >
        {t('uuid:checkUuidVersionAndValidity')}
      </Typography>
      <TextField
        label={t('uuid:uuidToValidate')}
        value={validateUuid}
        error={validateError}
        helperText={validateResult}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9-]*',
        }}
        fullWidth
        onChange={handleValidateChange}
      />
      <Box
        display='flex'
        justifyContent='space-between'
        width='100%'
      >
        {supportsClipboardRead ? (
          <Button
            startIcon={<ContentPasteGoIcon />}
            onClick={async () => {
              const text = await navigator.clipboard.readText();
              if (text) {
                setValidateUuid(text);
                runUuidValidation(text);
              }
            }}
          >
            {t('common:paste')}
          </Button>
        ) : null}
        <Button
          data-testid='validate-uuid-clear-btn'
          startIcon={<ClearIcon />}
          sx={{ mr: 0, ml: 'auto' }}
          disabled={!validateUuid}
          onClick={() => {
            setValidateUuid('');
            setValidateResult('');
            setValidateError(false);
          }}
        >
          {t('common:clear')}
        </Button>
      </Box>
    </Box>
  );
}
